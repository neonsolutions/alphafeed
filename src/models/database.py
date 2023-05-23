import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Get the absolute path to the parent directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Get the absolute path to the rss_feed directory (two levels above)
rss_feed_dir = os.path.abspath(os.path.join(current_dir, '..', '..'))

# Construct the absolute path to the database file
db_file = os.path.join(rss_feed_dir, 'rss_feed.db')

print(db_file)

# Create the SQLAlchemy engine and session
engine = create_engine(f'sqlite:///{db_file}')
Session = sessionmaker(bind=engine)
