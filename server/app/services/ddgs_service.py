from duckduckgo_search import DDGS
from typing import Dict, List, Optional
import functools

def catch_exceptions(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            # Handle the exception here
            print(f"{e}")
            return None
    return wrapper

class DDGSearchService:
    ddgs = DDGS()
    @classmethod
    @catch_exceptions
    def search_by_query(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.text(data["query"])
        return results
    @classmethod
    def search_video(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.videos(data["query"])
        return results
    @classmethod
    def search_image(self, data) -> List[Dict[str, str]]:
        results = self.ddgs.images(data["query"])
        return results