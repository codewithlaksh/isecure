from project import app, db
from project.blueprints import api
from flask import jsonify, request
from project.models import Users
from werkzeug.security import check_password_hash
import jwt
import os

@api.route("/handlesignup", methods=["POST"])
def handlesignup():
    name = request.form.get('name')
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    success = False
    message = ''

    if Users.query.filter_by(username=username).first():
        return jsonify({
            'success': success,
            'message': 'This user already exists!'
        })
    else:
        user = Users(username, name, email, password)
        db.session.add(user)
        db.session.commit()
        success = True
        return jsonify({
            'success': success,
            'message': 'Your account has been successfully created!'
        })

@api.route("/handlelogin", methods=["POST"])
def handlelogin():
    username = request.form.get('username')
    password = request.form.get('password')
    success = False

    user = Users.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        success = True
        data = {
            'username': username
        }
        token = jwt.encode(payload=data, key=os.getenv('SECRET_KEY'))
        return jsonify({
            'success': success,
            'token': token,
            'user': username,
            'message': 'You have been logged in successfully!'
        })
    else:
        return jsonify({
            'success': success,
            'message': 'Invalid credentials! Please try again.'
        })
