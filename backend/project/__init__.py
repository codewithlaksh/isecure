from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/isecure'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('CORS_SECRET')
db = SQLAlchemy(app)
cors = CORS(app)

from project.models import Users
from project.routes import api
from project.blueprints import api

app.app_context().push()
app.register_blueprint(api, url_prefix='/api/')
