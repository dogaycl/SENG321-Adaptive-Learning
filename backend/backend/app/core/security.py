from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# This one is for auth_service.py
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# This is an alias so main.py code also works
def get_password_hash(password: str) -> str:
    return hash_password(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
