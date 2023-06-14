import jwt
import os


def get_user(token):
    try:
        user = jwt.decode(jwt=token, key=os.getenv('SECRET_KEY'))
        return user
    except jwt.InvalidTokenError:
        return 'Invalid auth token!'
