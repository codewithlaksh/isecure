from project import db
from datetime import datetime
from werkzeug.security import generate_password_hash


class Users(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(12), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    createdAt = db.Column(db.DateTime(), default=datetime.now())

    def __repr__(self):
        return f'{self.username} - {self.createdAt}'

    def __init__(self, username, name, email, password):
        self.username = username
        self.name = name
        self.email = email
        self.password = generate_password_hash(password, salt_length=10)

