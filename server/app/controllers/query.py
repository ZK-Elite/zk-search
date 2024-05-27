from flask_restful import Resource
from flask import request
from app.services.ddgs_service import DDGSearchService

class DDGSByQuery(Resource):
    def post(self):
        data : dict = request.get_json()
        search_result = DDGSearchService.search_by_query(data)
        return search_result, 200
    
class DDGSVideo(Resource):
    def post(self):
        data: dict = request.get_json()
        search_result = DDGSearchService.search_video(data)
        return search_result, 200
    
class DDGSImage(Resource):
    def post(self):
        data: dict = request.get_json()
        search_result = DDGSearchService.search_image(data)
        return search_result, 200