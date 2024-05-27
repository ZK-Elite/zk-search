from flask_restful import Resource
from flask import request
from app.services.ddgs_service import DDGSearchService
from app.middleware.validation import validate_request_data

class DDGSKeywordSuggestion(Resource):
    @validate_request_data(['q'], 'Params')
    def get(self):
        query : str = request.args.get('q')
        search_result = DDGSearchService.get_keyword_suggestions(query)
        return search_result, 200
