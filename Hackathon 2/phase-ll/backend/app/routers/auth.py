from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_db
from app.models.user import User
from app.schemas.auth import SignUpRequest, LoginRequest, AuthResponse
from app.utils.password import get_password_hash, verify_password
from app.utils.jwt import create_access_token
from app.utils.logging import log_request, log_error

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def sign_up_email(
    request: SignUpRequest,
    db: Session = Depends(get_db)
):
    """
    Sign up a new user with email and password

    Creates a new user account and returns JWT access token
    """
    try:
        # Check if user already exists
        statement = select(User).where(User.email == request.email)
        existing_user = db.exec(statement).first()

        if existing_user:
            log_request("POST", "/api/auth/signup", request.email, 400)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "error": "User with this email already exists",
                    "code": "EMAIL_EXISTS"
                }
            )

        # Hash password
        password_hash = get_password_hash(request.password)

        # Create new user
        new_user = User(
            email=request.email,
            password_hash=password_hash
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Generate JWT token
        token = create_access_token(new_user.id)

        log_request("POST", "/api/auth/signup", request.email, 201)

        return AuthResponse(
            token=token,
            user={
                "id": str(new_user.id),
                "email": new_user.email,
                "createdAt": new_user.created_at.isoformat()
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"SIGNUP ERROR: {type(e).__name__}: {str(e)}", flush=True)
        import traceback
        traceback.print_exc()
        log_error(e, "sign_up_email")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": "An internal server error occurred",
                "code": "INTERNAL_ERROR"
            }
        )


@router.post("/login", response_model=AuthResponse)
async def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Login with email and password

    Validates credentials and returns JWT access token
    """
    try:
        # Find user by email
        statement = select(User).where(User.email == request.email)
        user = db.exec(statement).first()

        if not user:
            log_request("POST", "/api/auth/login", request.email, 401)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "error": "Invalid email or password",
                    "code": "INVALID_CREDENTIALS"
                }
            )

        # Verify password
        if not verify_password(request.password, user.password_hash):
            log_request("POST", "/api/auth/login", request.email, 401)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "error": "Invalid email or password",
                    "code": "INVALID_CREDENTIALS"
                }
            )

        # Generate JWT token
        token = create_access_token(user.id)

        log_request("POST", "/api/auth/login", request.email, 200)

        return AuthResponse(
            token=token,
            user={
                "id": str(user.id),
                "email": user.email,
                "createdAt": user.created_at.isoformat()
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        log_error(e, "login")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": "An internal server error occurred",
                "code": "INTERNAL_ERROR"
            }
        )
