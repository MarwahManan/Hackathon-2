from pydantic import BaseModel, Field, field_validator, ConfigDict, model_validator
from datetime import datetime
from uuid import UUID
from typing import Optional, Literal


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
    due_date: Optional[datetime]
    recurrence_pattern: Optional[str]
    recurrence_end_date: Optional[datetime]
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

    due_date: Optional[datetime] = Field(
        default=None,
        description="Task due date (optional)"
    )

    recurrence_pattern: Optional[Literal["DAILY", "WEEKLY", "MONTHLY"]] = Field(
        default=None,
        description="Recurrence pattern: DAILY, WEEKLY, or MONTHLY (optional)"
    )

    recurrence_end_date: Optional[datetime] = Field(
        default=None,
        description="End date for recurring tasks (optional)"
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

    @model_validator(mode='after')
    def validate_recurrence(self):
        """Validate recurrence logic: if no pattern, no end date allowed"""
        if self.recurrence_pattern is None and self.recurrence_end_date is not None:
            raise ValueError("recurrence_end_date cannot be set without recurrence_pattern")
        return self


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

    due_date: Optional[datetime] = Field(
        default=None,
        description="Task due date (optional)"
    )

    recurrence_pattern: Optional[Literal["DAILY", "WEEKLY", "MONTHLY"]] = Field(
        default=None,
        description="Recurrence pattern: DAILY, WEEKLY, or MONTHLY (optional)"
    )

    recurrence_end_date: Optional[datetime] = Field(
        default=None,
        description="End date for recurring tasks (optional)"
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

    @model_validator(mode='after')
    def validate_recurrence(self):
        """Validate recurrence logic: if no pattern, no end date allowed"""
        if self.recurrence_pattern is None and self.recurrence_end_date is not None:
            raise ValueError("recurrence_end_date cannot be set without recurrence_pattern")
        return self
