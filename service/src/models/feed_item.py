from .base import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship


class FeedItem(Base):
    __tablename__ = 'feed_items'

    id = Column(Integer, primary_key=True)
    title_raw = Column(String, nullable=False)
    title = Column(String)
    link = Column(String, unique=True)
    description_raw = Column(String, nullable=False)
    description = Column(String)
    published = Column(DateTime, nullable=False)
    author = Column(String, nullable=False)
    scores = relationship("Scores", uselist=False, back_populates="feed_item")
