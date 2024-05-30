import os
from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException, default_exceptions
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from app.controllers import initialize_resources

app = Flask(__name__)
CORS(app)
os.environ['FLASK_ENV'] = 'development'

# Initialize Flask-Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["50 per second"]
)

@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify(error=str(e)), code

for ex in default_exceptions:
    app.register_error_handler(ex, handle_error)

initialize_resources(app)