"""Todo entity domain model."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Todo:
    """
    Immutable todo item entity.

    Attributes:
        id: Unique identifier (positive integer)
        description: Task description (1-500 characters)
        completed: Completion status (default: False)
    """

    id: int
    description: str
    completed: bool = False

    def __post_init__(self) -> None:
        """Validate entity invariants."""
        if self.id <= 0:
            raise ValueError("Todo ID must be positive")
        if not self.description or len(self.description.strip()) == 0:
            raise ValueError("Todo description cannot be empty")
        if len(self.description) > 500:
            raise ValueError("Todo description cannot exceed 500 characters")
