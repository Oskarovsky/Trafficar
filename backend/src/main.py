from .entities.entity import Session, engine, Base
from .entities.box import Box

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
boxes = session.query(Box).all()

if len(boxes) == 0:
    # create and persist dummy box
    python_box = Box("Bike", "Sport bike for professional cyclist", )