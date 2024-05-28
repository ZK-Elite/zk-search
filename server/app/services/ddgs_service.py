from duckduckgo_search import DDGS
from typing import Dict, List
import functools

def catch_exceptions(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            # Handle the exception here
            return None
    return wrapper

class DDGSearchService:
    ddgs = DDGS()

    @classmethod
    @catch_exceptions
    def search_by_query(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.text(**data)
        return results

    @classmethod
    @catch_exceptions
    def get_keyword_suggestions(self, query) -> List[Dict[str, str]]:
        results = self.ddgs.suggestions(query)
        return results
    
    @classmethod
    @catch_exceptions
    def search_images_by_query(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.images(**data)
        return results

    @classmethod
    @catch_exceptions
    def search_videos_by_query(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.videos(**data)
        return results
    
    @classmethod
    @catch_exceptions
    def search_news_by_query(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.news(**data)
        return results
    
    @classmethod
    @catch_exceptions
    def search_summary_by_query(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.chat(**data)
        return results
    