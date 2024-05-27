from app import app
from app.controllers import initialize_resources

if __name__ == "__main__":
    initialize_resources(app)
    app.run(host='0.0.0.0', port='5001')
