from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Intelligent Resume & Career Guidance AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # LLM Settings (can be configured via .env)
    GEMINI_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None
    GROQ_API_KEY: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
