from app import app
from app.controllers import initialize_resources

if __name__ == "__main__":
    initialize_resources(app)
    app.run()
