from flask import request, jsonify

def validate_request_data(required_keys, type):
    def middleware(func):
        def wrapper(*args, **kwargs):
            if type is "Json":
                data = request.get_json()
            elif type is "Params":
                data = request.args
            else:
                data = None

            if not data:
                return {"message": f"Missing {type} in request"}, 400

            missing_keys = [key for key in required_keys if key not in data]
            if missing_keys:
                return {"message": f"Missing keys: {', '.join(missing_keys)}"}, 400

            return func(*args, **kwargs)
        return wrapper
    return middleware