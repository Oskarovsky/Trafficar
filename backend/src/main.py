from flask import Flask, jsonify, request

from flask_cors import CORS

from .entities.entity import Session, engine, Base
from .entities.box import Box, BoxSchema


# creating the Flask application
app = Flask(__name__)
CORS(app)


# generate database schema (if needed)
Base.metadata.create_all(engine)


@app.route('/boxes')
def get_boxes():
    # fetching from the database
    session = Session()
    box_objects = session.query(Box).all()

    # transforming into JSON-serializable objects
    schema = BoxSchema(many=True)
    boxes = schema.dump(box_objects)

    # serializing as JSON
    session.close()
    return jsonify(boxes)


@app.route('/boxes', methods=['POST'])
def add_box():
    # mount exam object
    posted_box = BoxSchema(only=('name', 'description', 'weight', 'width', 'height', 'length'))\
        .load(request.get_json())

    box = Box(**posted_box, created_by='HTTP post request')

    # persist box
    session = Session()
    session.add(box)
    session.commit()

    # return created box
    new_box = BoxSchema().dump(box)
    session.close()
    return jsonify(new_box), 201



# # check for existing data (it queries all instances of Box)
# boxes = session.query(Box).all()
#
# if len(boxes) == 0:
#     # create and persist dummy box
#     bike_box = Box("Bike", "Sport bike for professional cyclist", 1210, 430, 222, 120, 'Oskar Slyk')
#     session.add(bike_box)
#     session.commit()
#     session.close()
#
#     # reload boxes
#     boxes = session.query(Box).all()
#
# # show existing boxes
# print('### Boxes:')
# for box in boxes:
#     print(f'({box.id} {box.name} - {box.description} // PARAMETERS: {box.weight}, {box.width}, {box.height}, {box.length}')
