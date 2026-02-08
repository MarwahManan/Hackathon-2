from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID
from app.utils.jwt import verify_token

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> UUID:
    """
    Dependency to get current authenticated user ID

    Args:
        credentials: HTTP Bearer credentials from Authorization header

    Returns:
        UUID: Authenticated user's ID

    Raises:
        HTTPException: If authentication fails
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": "Invalid or missing authentication token",
                "code": "UNAUTHORIZED"
            }
        )

    token = credentials.credentials
    user_id = verify_token(token)
    return user_id
