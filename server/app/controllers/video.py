from flask_restful import Resource
from flask import request
from app.services.ddgs_service import DDGSearchService
from app.middleware.validation import validate_request_data

class DDGSVideo(Resource):
    @validate_request_data(['keywords', 'max_results'], 'Json')
    def post(self):
        data : dict = request.get_json()
        search_result = DDGSearchService.search_videos_by_query(data)
        return search_result, 200
