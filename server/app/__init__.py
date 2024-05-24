import os
from flask import Flask, jsonify
from app.controllers import initialize_resources
from werkzeug.exceptions import HTTPException, default_exceptions

app = Flask(__name__)
os.environ['FLASK_ENV'] = 'development'

@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify(error=str(e)), code

for ex in default_exceptions:
    app.register_error_handler(ex, handle_error)
