from .base import Base
from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship


class Scores(Base):
    __tablename__ = 'scores'

    id = Column(Integer, primary_key=True)
    relevance = Column(Float, nullable=False)
    impact = Column(Float, nullable=False)
    novelty = Column(Float, nullable=False)
    reliability = Column(Float, nullable=False)
    feed_item_id = Column(Integer, ForeignKey('feed_items.id'), nullable=False)
    feed_item = relationship("FeedItem", back_populates="scores")

    @property
    def significance(self):
        return (self.relevance + self.impact + self.novelty + self.reliability) / 4.0
