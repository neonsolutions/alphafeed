from .base import Base
from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship


class Scores(Base):
    __tablename__ = 'scores'

    id = Column(Integer, primary_key=True)
    relevance = Column(Float)
    impact = Column(Float)
    novelty = Column(Float)
    reliability = Column(Float)
    feed_item_id = Column(Integer, ForeignKey('feed_items.id'))
    feed_item = relationship("FeedItem", back_populates="scores")

    @property
    def average(self):
        return (self.relevance + self.impact + self.novelty + self.reliability) / 4.0
