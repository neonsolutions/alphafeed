import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Create the SQLAlchemy engine and session
engine = create_engine(os.environ["DATABASE_URI"])
Session = sessionmaker(bind=engine)
