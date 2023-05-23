from .base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class FeedItem(Base):
    __tablename__ = 'feed_items'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    link = Column(String, unique=True)
    description = Column(String)
    published = Column(String)
    author = Column(String)
    scores = relationship("Scores", uselist=False, back_populates="feed_item")
