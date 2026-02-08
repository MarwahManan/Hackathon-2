from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from uuid import UUID
from typing import List
from datetime import datetime
from app.database import get_db
from app.middleware.auth import get_current_user
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.utils.logging import log_request, log_error

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all tasks for authenticated user

    Returns only tasks where user_id matches authenticated user
    """
    try:
        statement = select(Task).where(Task.user_id == current_user).order_by(Task.created_at.desc())
        tasks = db.exec(statement).all()
        log_request("GET", "/api/tasks", str(current_user), 200)
        return tasks
    except Exception as e:
        log_error(e, "get_tasks")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "An internal server error occurred", "code": "INTERNAL_ERROR"}
        )


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: UUID,
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get single task by ID

    Returns 404 if task doesn't exist or belongs to different user
    """
    try:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user)
        task = db.exec(statement).first()

        if not task:
            log_request("GET", f"/api/tasks/{task_id}", str(current_user), 404)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": "Task not found", "code": "NOT_FOUND"}
            )

        log_request("GET", f"/api/tasks/{task_id}", str(current_user), 200)
        return task
    except HTTPException:
        raise
    except Exception as e:
        log_error(e, "get_task")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "An internal server error occurred", "code": "INTERNAL_ERROR"}
        )


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create new task for authenticated user

    user_id is automatically set from JWT token
    """
    try:
        task = Task(
            user_id=current_user,
            title=task_data.title,
            description=task_data.description
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        log_request("POST", "/api/tasks", str(current_user), 201)
        return task
    except Exception as e:
        db.rollback()
        log_error(e, "create_task")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "An internal server error occurred", "code": "INTERNAL_ERROR"}
        )


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: UUID,
    task_data: TaskUpdate,
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update existing task

    Only updates fields provided in request body
    Returns 404 if task doesn't exist or belongs to different user
    """
    try:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user)
        task = db.exec(statement).first()

        if not task:
            log_request("PUT", f"/api/tasks/{task_id}", str(current_user), 404)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": "Task not found", "code": "NOT_FOUND"}
            )

        # Update only provided fields
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        if task_data.is_completed is not None:
            task.is_completed = task_data.is_completed

        # Update timestamp
        task.updated_at = datetime.utcnow()

        db.add(task)
        db.commit()
        db.refresh(task)
        log_request("PUT", f"/api/tasks/{task_id}", str(current_user), 200)
        return task
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        log_error(e, "update_task")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "An internal server error occurred", "code": "INTERNAL_ERROR"}
        )


@router.delete("/{task_id}")
async def delete_task(
    task_id: UUID,
    current_user: UUID = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete task permanently

    Returns 404 if task doesn't exist or belongs to different user
    """
    try:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user)
        task = db.exec(statement).first()

        if not task:
            log_request("DELETE", f"/api/tasks/{task_id}", str(current_user), 404)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": "Task not found", "code": "NOT_FOUND"}
            )

        db.delete(task)
        db.commit()
        log_request("DELETE", f"/api/tasks/{task_id}", str(current_user), 200)

        return {"message": "Task deleted successfully", "id": str(task_id)}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        log_error(e, "delete_task")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "An internal server error occurred", "code": "INTERNAL_ERROR"}
        )
