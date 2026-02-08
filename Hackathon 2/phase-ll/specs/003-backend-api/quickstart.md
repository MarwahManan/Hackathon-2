# Quickstart Guide: Backend & API

**Feature**: Backend & API for Todo Application
**Date**: 2026-02-08
**Prerequisites**: Python 3.11+, PostgreSQL (Neon), Git

## Overview

This guide provides step-by-step instructions to set up, develop, and test the FastAPI backend for the Todo application.

---

## 1. Initial Setup

### 1.1 Create Backend Directory

```bash
# From project root
mkdir -p backend/app/models backend/app/schemas backend/app/middleware backend/app/routers backend/app/utils backend/tests
cd backend
```

### 1.2 Initialize Python Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### 1.3 Create requirements.txt

```bash
cat > requirements.txt << 'EOF'
# Web Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0

# Database
sqlmodel==0.0.14
psycopg2-binary==2.9.9

# Authentication
PyJWT==2.8.0
python-multipart==0.0.6

# Validation
pydantic==2.5.0
pydantic-settings==2.1.0

# Environment
python-dotenv==1.0.0

# CORS
fastapi-cors==0.0.6

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
EOF
```

### 1.4 Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 2. Environment Configuration

### 2.1 Create .env File

```bash
cat > .env << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Authentication
JWT_SECRET=your-jwt-secret-here-must-match-better-auth
JWT_ALGORITHM=HS256

# Application
ENVIRONMENT=development
LOG_LEVEL=INFO

# CORS
FRONTEND_URL=http://localhost:3000

# Server
HOST=0.0.0.0
PORT=8000
EOF
```

### 2.2 Create .env.example (for version control)

```bash
cat > .env.example << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Authentication
JWT_SECRET=your-jwt-secret-here
JWT_ALGORITHM=HS256

# Application
ENVIRONMENT=development
LOG_LEVEL=INFO

# CORS
FRONTEND_URL=http://localhost:3000

# Server
HOST=0.0.0.0
PORT=8000
EOF
```

### 2.3 Get Neon Database URL

1. Go to [Neon Console](https://console.neon.tech)
2. Create new project or select existing project
3. Copy connection string from "Connection Details"
4. Paste into `.env` as `DATABASE_URL`

**Important**: Never commit `.env` to version control. Add to `.gitignore`:

```bash
echo ".env" >> .gitignore
echo "venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore
```

---

## 3. Database Setup

### 3.1 Create Database Models

Create `app/models/user.py`:

```python
from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

Create `app/models/task.py`:

```python
from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional

class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id", index=True)
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    is_completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 3.2 Create Database Connection

Create `app/database.py`:

```python
from sqlmodel import create_engine, Session, SQLModel
from app.config import settings

# Create engine with connection pooling
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10
)

def create_db_and_tables():
    """Create all database tables"""
    SQLModel.metadata.create_all(engine)

def get_db():
    """Dependency for database sessions"""
    with Session(engine) as session:
        yield session
```

### 3.3 Create Configuration

Create `app/config.py`:

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    FRONTEND_URL: str = "http://localhost:3000"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 4. Authentication Middleware

### 4.1 Create JWT Utilities

Create `app/utils/jwt.py`:

```python
import jwt
from datetime import datetime
from uuid import UUID
from fastapi import HTTPException, status
from app.config import settings

def verify_token(token: str) -> UUID:
    """Verify JWT token and return user ID"""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Check expiration
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={"error": "Authentication token has expired", "code": "TOKEN_EXPIRED"}
            )

        # Extract user ID from 'sub' claim
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={"error": "Invalid token payload", "code": "INVALID_TOKEN"}
            )

        return UUID(user_id)

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": "Authentication token is invalid", "code": "INVALID_TOKEN"}
        )
```

### 4.2 Create Authentication Dependency

Create `app/middleware/auth.py`:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID
from app.utils.jwt import verify_token

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> UUID:
    """Dependency to get current authenticated user ID"""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": "Invalid or missing authentication token", "code": "UNAUTHORIZED"}
        )

    token = credentials.credentials
    user_id = verify_token(token)
    return user_id
```

---

## 5. API Endpoints

### 5.1 Create Pydantic Schemas

Create `app/schemas/task.py`:

```python
from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from uuid import UUID
from typing import Optional

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: str) -> str:
        if not v or v.strip() == "":
            raise ValueError("Title cannot be empty")
        return v.strip()

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    is_completed: Optional[bool] = None

class TaskResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
```

### 5.2 Create Task Router

Create `app/routers/tasks.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from uuid import UUID
from typing import List
from app.database import get_db
from app.middleware.auth import get_current_user
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all tasks for authenticated user"""
    statement = select(Task).where(Task.user_id == current_user)
    tasks = db.exec(statement).all()
    return tasks

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create new task for authenticated user"""
    task = Task(
        user_id=current_user,
        title=task_data.title,
        description=task_data.description
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

# Add other endpoints (GET /{id}, PUT /{id}, DELETE /{id})...
```

---

## 6. Main Application

### 6.1 Create FastAPI App

Create `app/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import create_db_and_tables
from app.routers import tasks

app = FastAPI(
    title="Todo API",
    description="RESTful API for Todo application",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Include routers
app.include_router(tasks.router)

@app.on_event("startup")
def on_startup():
    """Create database tables on startup"""
    create_db_and_tables()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
```

---

## 7. Running the Application

### 7.1 Development Server

```bash
# From backend directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Output**:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 7.2 Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

---

## 8. Testing

### 8.1 Create Test Configuration

Create `tests/conftest.py`:

```python
import pytest
from fastapi.testclient import TestClient
from sqlmodel import create_engine, Session, SQLModel
from app.main import app
from app.database import get_db

# Test database (in-memory SQLite)
TEST_DATABASE_URL = "sqlite:///:memory:"
test_engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})

@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        yield session
    SQLModel.metadata.drop_all(test_engine)

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_db] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
```

### 8.2 Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_tasks.py -v
```

---

## 9. Common Commands

```bash
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload

# Run tests
pytest

# Format code
black app/ tests/

# Lint code
flake8 app/ tests/

# Type checking
mypy app/
```

---

## 10. Troubleshooting

### Issue: Database connection fails

**Solution**: Verify DATABASE_URL in `.env` is correct and Neon database is accessible

```bash
# Test connection
python -c "from app.database import engine; engine.connect()"
```

### Issue: JWT verification fails

**Solution**: Ensure JWT_SECRET matches the secret used by Better Auth

### Issue: CORS errors

**Solution**: Verify FRONTEND_URL in `.env` matches frontend origin

### Issue: Import errors

**Solution**: Ensure virtual environment is activated and dependencies installed

```bash
pip install -r requirements.txt
```

---

## 11. Next Steps

1. ✅ Backend setup complete
2. ⏭️ Run `/sp.tasks` to generate implementation tasks
3. ⏭️ Run `/sp.implement` to execute tasks via specialized agents
4. ⏭️ Integrate with Better Auth for user authentication
5. ⏭️ Connect frontend to backend API endpoints

---

## Summary

- **Setup**: Python 3.11+, virtual environment, dependencies
- **Configuration**: .env file with DATABASE_URL, JWT_SECRET, FRONTEND_URL
- **Database**: Neon PostgreSQL with SQLModel ORM
- **Authentication**: JWT verification via FastAPI dependencies
- **API**: RESTful endpoints with automatic OpenAPI documentation
- **Testing**: pytest with test fixtures and in-memory database
- **Development**: uvicorn with hot reload for rapid iteration
