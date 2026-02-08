import jwt
from datetime import datetime, timedelta
from uuid import UUID
from fastapi import HTTPException, status
from app.config import settings


def create_access_token(user_id: UUID, expires_delta: timedelta = None) -> str:
    """
    Create JWT access token

    Args:
        user_id: User ID to encode in token
        expires_delta: Optional expiration time delta (default: 7 days)

    Returns:
        str: Encoded JWT token
    """
    if expires_delta is None:
        expires_delta = timedelta(days=7)

    expire = datetime.utcnow() + expires_delta

    payload = {
        "sub": str(user_id),
        "exp": expire,
        "iat": datetime.utcnow()
    }

    token = jwt.encode(
        payload,
        settings.BETTER_AUTH_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

    return token


def verify_token(token: str) -> UUID:
    """
    Verify JWT token and return user ID

    Args:
        token: JWT token string

    Returns:
        UUID: User ID from token

    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        # Decode and verify token (using BETTER_AUTH_SECRET for Better Auth tokens)
        payload = jwt.decode(
            token,
            settings.BETTER_AUTH_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Check expiration
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "error": "Authentication token has expired",
                    "code": "TOKEN_EXPIRED"
                }
            )

        # Extract user ID from 'sub' claim
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "error": "Invalid token payload",
                    "code": "INVALID_TOKEN"
                }
            )

        return UUID(user_id)

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": "Authentication token is invalid",
                "code": "INVALID_TOKEN"
            }
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": "Invalid user ID format in token",
                "code": "INVALID_TOKEN"
            }
        )
