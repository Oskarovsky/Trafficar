from flask import Flask, jsonify, request

from flask_cors import CORS
from .entities.entity import Session, engine, Base
from .entities.box import Box, BoxSchema
from .auth import AuthError, requires_auth, requires_role


# creating the Flask application
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = '1234567890'

# generate database schema (if needed)
db = Base.metadata.create_all(engine)




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
@requires_auth
def add_box():
    # mount exam object
    posted_box = BoxSchema(only=('name', 'description', 'weight', 'width', 'height', 'length', 'target_place'))\
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


@app.route('/boxes/<boxId>', methods=['DELETE'])
@requires_role('admin')
def delete_exam(boxId):
    session = Session()
    box = session.query(Box).filter_by(id=boxId).first()
    session.delete(box)
    session.commit()
    session.close()
    return '', 201


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
