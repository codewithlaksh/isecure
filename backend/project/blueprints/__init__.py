from project import app
from flask import Blueprint

api = Blueprint('api', __name__, template_folder='templates/')
