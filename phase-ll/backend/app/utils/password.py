from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bcrypt has a 72-byte limit
MAX_PASSWORD_BYTES = 72


def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt

    Bcrypt has a 72-byte limit, so we truncate if necessary.
    This is safe because we're still hashing a sufficiently long password.

    Args:
        password: Plain text password

    Returns:
        str: Hashed password
    """
    # Ensure password is a string
    if not isinstance(password, str):
        password = str(password)

    # Encode to bytes and truncate if necessary
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > MAX_PASSWORD_BYTES:
        password_bytes = password_bytes[:MAX_PASSWORD_BYTES]
        password = password_bytes.decode('utf-8', errors='ignore')

    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against its hash

    Args:
        plain_password: Plain text password to verify
        hashed_password: Hashed password to compare against

    Returns:
        bool: True if password matches, False otherwise
    """
    # Ensure password is a string
    if not isinstance(plain_password, str):
        plain_password = str(plain_password)

    # Apply same truncation as during hashing
    password_bytes = plain_password.encode('utf-8')
    if len(password_bytes) > MAX_PASSWORD_BYTES:
        password_bytes = password_bytes[:MAX_PASSWORD_BYTES]
        plain_password = password_bytes.decode('utf-8', errors='ignore')

    return pwd_context.verify(plain_password, hashed_password)
