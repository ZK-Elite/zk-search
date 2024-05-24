from flask_restful import Api
from app.controllers.query import DDGSByQuery
from app.controllers.suggestion import DDGSKeywordSuggestion

def initialize_resources(app):
    api = Api(app)
    api.add_resource(DDGSByQuery, '/api/search/query')
    api.add_resource(DDGSKeywordSuggestion, '/api/search/suggestion')