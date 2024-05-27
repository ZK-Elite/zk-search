from flask_restful import Api
from app.controllers.query import DDGSByQuery
from app.controllers.suggestion import DDGSKeywordSuggestion
from app.controllers.summary import DDGSKeywordSummary
from app.controllers.image import DDGSImage
from app.controllers.video import DDGSVideo
from app.controllers.news import DDGSNews
from app.controllers.chat import DDGSChat

def initialize_resources(app):
    api = Api(app)
    api.add_resource(DDGSByQuery, '/api/search/query')
    api.add_resource(DDGSKeywordSuggestion, '/api/search/suggestion')
    api.add_resource(DDGSKeywordSummary, '/api/search/summary')
    api.add_resource(DDGSImage, '/api/search/image')
    api.add_resource(DDGSVideo, '/api/search/video')
    api.add_resource(DDGSNews, '/api/search/news')
    api.add_resource(DDGSChat, '/api/search/chat')