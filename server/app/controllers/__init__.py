from flask_restful import Api
from app.controllers.query import DDGSByQuery, DDGSVideo, DDGSImage

def initialize_resources(app):
    api = Api(app)
    api.add_resource(DDGSByQuery, '/api/search/query')
    api.add_resource(DDGSVideo, '/api/search/video')
    api.add_resource(DDGSImage, '/api/search/image')
    