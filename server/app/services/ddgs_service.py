from duckduckgo_search import DDGS
from typing import Dict, List, Optional
import functools
import requests
from datetime import datetime

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

    # @classmethod
    # @catch_exceptions
    # def chat_by_query(self, query) -> str:
    #     results = self.ddgs.chat(query)
    #     return results
    
    @classmethod
    @catch_exceptions
    def chat_by_query(self, query) -> str:
        try:
            if not query:
                return None

            # Call Venice API directly within the POST handler
            date = datetime.now()
            formatted_date = date.strftime('%Y%m%d')
            
            venice_payload = {
                "prompt": [
                    {
                        "content": query,
                        "role": "user"
                    }
                ],
                "systemPrompt": "",
                "conversationType": "text",
                "seed": formatted_date,
                "modelId": "hermes-2-theta"
            }

            venice_response = requests.post(
                "https://venice.ai/api/inference/chat",
                json=venice_payload,
                headers={
                    'accept': "application/json",
                    'content-type': "application/json",
                }
            )

            if venice_response.status_code != 200:
                return None
            venice_data = venice_response.text
            return venice_data
        except Exception as e:
            return None
