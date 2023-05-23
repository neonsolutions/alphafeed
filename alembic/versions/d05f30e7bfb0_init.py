"""init

Revision ID: d05f30e7bfb0
Revises: 
Create Date: 2023-05-23 17:06:24.109918

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd05f30e7bfb0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('feed_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('link', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('published', sa.String(), nullable=True),
    sa.Column('author', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('scores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('relevance', sa.Float(), nullable=True),
    sa.Column('impact', sa.Float(), nullable=True),
    sa.Column('novelty', sa.Float(), nullable=True),
    sa.Column('reliability', sa.Float(), nullable=True),
    sa.Column('feed_item_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['feed_item_id'], ['feed_items.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('scores')
    op.drop_table('feed_items')
    # ### end Alembic commands ###
