# backend/auth.py
from flask import Blueprint, request, jsonify
from backend.models import db, User

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
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
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

    # بررسی اینکه آیا کاربر با این ایمیل از قبل وجود دارد
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User with this email already exists"}), 409 # Conflict

    # ایجاد کاربر جدید
    new_user = User(name=name, email=email)
    new_user.set_password(password) # هش کردن و تنظیم رمز عبور با استفاده از متد مدل

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully", "user_id": new_user.id}), 201 # Created
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred during registration", "error": str(e)}), 500