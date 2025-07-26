# backend/auth.py
from flask import Blueprint, request, jsonify
from backend.models import db, User
from flask_jwt_extended import create_access_token, create_refresh_token,jwt_required, get_jwt_identity


auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify({"message": "Login successful",
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        "user_id": user.id ,
                        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()


    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Name, email, and password are required"}), 400

    name = data['name']
    email = data['email']
    password = data['password']


    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User with this email already exists"}), 409 # Conflict


    new_user = User(name=name, email=email)
    new_user.set_password(password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully", "user_id": new_user.id}), 201 # Created
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred during registration", "error": str(e)}), 500


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token), 200