from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import create_db_and_tables
from app.routers import tasks, auth

app = FastAPI(
    title="Todo API",
    description="RESTful API for Todo application with JWT authentication",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# Include routers
app.include_router(auth.router)
app.include_router(tasks.router)


@app.on_event("startup")
def on_startup():
    """Create database tables on startup"""
    create_db_and_tables()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
