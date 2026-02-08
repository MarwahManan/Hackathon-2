from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class ErrorDetail(BaseModel):
    """Error detail for validation errors"""
    field: str
    message: str


class ErrorResponse(BaseModel):
    """Standard error response format"""
    error: str
    code: str
    details: Optional[List[ErrorDetail]] = None
