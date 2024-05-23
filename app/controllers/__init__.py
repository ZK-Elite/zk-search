from flask_restful import Api
from app.controllers.query import DDGSByQuery

def initialize_resources(app):
    api = Api(app)
    api.add_resource(DDGSByQuery, '/api/search/query')