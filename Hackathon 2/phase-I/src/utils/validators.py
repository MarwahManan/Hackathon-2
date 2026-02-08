"""Input validation functions for todo operations."""


def validate_description(description: str) -> tuple[bool, str]:
    """
    Validate todo description.

    Args:
        description: The description to validate

    Returns:
        Tuple of (is_valid, error_message)
        If valid, error_message is empty string
    """
    if not description or len(description.strip()) == 0:
        return False, "Task description cannot be empty"

    if len(description) > 500:
        return False, "Task description cannot exceed 500 characters"

    return True, ""


def validate_task_id(task_id: int) -> tuple[bool, str]:
    """
    Validate task ID.

    Args:
        task_id: The ID to validate

    Returns:
        Tuple of (is_valid, error_message)
        If valid, error_message is empty string
    """
    if task_id <= 0:
        return False, "Task ID must be a positive integer"

    return True, ""
