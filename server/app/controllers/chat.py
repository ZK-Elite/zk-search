from flask_restful import Resource
from flask import request
from app.services.ddgs_service import DDGSearchService
from app.middleware.validation import validate_request_data

class DDGSChat(Resource):
    @validate_request_data(['q'], 'Params')
    def get(self):
        query : str = request.args.get('q')
        search_result = DDGSearchService.chat_by_query(query)
        return search_result, 200
