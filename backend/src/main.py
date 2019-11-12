from .entities.entity import Session, engine, Base
from .entities.box import Box

# generate database schema (if needed)
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data (it queries all instances of Box)
boxes = session.query(Box).all()

if len(boxes) == 0:
    # create and persist dummy box
    bike_box = Box("Bike", "Sport bike for professional cyclist", 1210, 430, 222, 120, 'Oskar Slyk')
    session.add(bike_box)
    session.commit()
    session.close()

    # reload boxes
    boxes = session.query(Box).all()

# show existing boxes
print('### Boxes:')
for box in boxes:
    print(f'({box.id} {box.name} - {box.description} // PARAMETERS: {box.weight}, {box.width}, {box.height}, {box.length}')
