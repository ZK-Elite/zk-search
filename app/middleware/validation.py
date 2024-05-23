from flask import request, jsonify

def validate_request_data(required_keys):
    def middleware(func):
        def wrapper(*args, **kwargs):
            data = request.get_json()
            if not data:
                return jsonify({"message": "Missing JSON in request"}), 400

            missing_keys = [key for key in required_keys if key not in data]
            if missing_keys:
                return jsonify({"message": f"Missing keys: {', '.join(missing_keys)}"}), 400

            return func(*args, **kwargs)
        return wrapper
    return middleware