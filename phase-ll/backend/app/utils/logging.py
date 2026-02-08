import logging
import sys
from app.config import settings

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper()),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger("backend-api")


def log_request(method: str, path: str, user_id: str = None, status_code: int = None):
    """Log API request"""
    logger.info(
        f"Request: {method} {path} | User: {user_id} | Status: {status_code}"
    )


def log_error(error: Exception, context: str = ""):
    """Log error with stack trace"""
    logger.error(f"Error in {context}: {str(error)}", exc_info=True)
