from pydantic import BaseModel, Field, field_validator, ConfigDict
from datetime import datetime
from uuid import UUID
from typing import Optional


def to_camel(string: str) -> str:
    """Convert snake_case to camelCase"""
    components = string.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


class TaskResponse(BaseModel):
    """Schema for task responses"""

    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel
    )


class TaskCreate(BaseModel):
    """Schema for creating a new task"""

    title: str = Field(
        min_length=1,
        max_length=200,
        description="Task title (required, 1-200 characters)"
    )

    description: Optional[str] = Field(
        default=None,
        max_length=2000,
        description="Task description (optional, max 2000 characters)"
    )

    model_config = ConfigDict(
        populate_by_name=True,
        alias_generator=to_camel
    )

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: str) -> str:
        if not v or v.strip() == "":
            raise ValueError("Title cannot be empty")
        return v.strip()

    @field_validator('description')
    @classmethod
    def description_strip(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            return v.strip() if v.strip() else None
        return None


class TaskUpdate(BaseModel):
    """Schema for updating an existing task"""

    title: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=200,
        description="Task title (optional, 1-200 characters)"
    )

    description: Optional[str] = Field(
        default=None,
        max_length=2000,
        description="Task description (optional, max 2000 characters)"
    )

    is_completed: Optional[bool] = Field(
        default=None,
        description="Task completion status (optional)"
    )

    model_config = ConfigDict(
        populate_by_name=True,
        alias_generator=to_camel
    )

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and (not v or v.strip() == ""):
            raise ValueError("Title cannot be empty")
        return v.strip() if v else None
