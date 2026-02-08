from pydantic import BaseModel, EmailStr, Field


class SignUpRequest(BaseModel):
    """Request schema for email signup"""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=8, description="User password (min 8 characters)")
    name: str = Field(None, description="User name (optional)")


class LoginRequest(BaseModel):
    """Request schema for login"""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., description="User password")


class AuthResponse(BaseModel):
    """Response schema for authentication"""
    success: bool = Field(default=True, description="Success status")
    token: str = Field(..., description="JWT access token")
    user: dict = Field(..., description="User information")
