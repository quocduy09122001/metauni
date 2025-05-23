from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, select, DateTime, func

DATABASE_URL = "postgresql+asyncpg://postgres:23101986az@localhost/metauni"

engine = create_async_engine(DATABASE_URL)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

class Product(Base):
    __tablename__ = "san_pham"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)  # URL hình ảnh
    content = Column(String)    # Nội dung
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    category = Column(String)