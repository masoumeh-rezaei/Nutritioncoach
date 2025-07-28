# backend/auth.py
from flask import Blueprint, request, jsonify,make_response
from backend.models import db, User
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity, set_access_cookies, unset_jwt_cookies, set_refresh_cookies)


auth_bp = Blueprint('auth', __name__)



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


@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    return jsonify(message=f"Hello user {user_id}! You have access."), 200


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password required"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid credentials"}), 401


    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)



    response = jsonify({"message": "Login successful"})

    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    print('refresh',access_token)
    print('access',refresh_token)
    return response, 200



@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True, locations=["cookies"])
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    response = jsonify({"message": "Token refreshed"})
    set_access_cookies(response, new_token)
    return response, 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200