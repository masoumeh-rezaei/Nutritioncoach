# backend/feedback.py
from flask import Blueprint, request, jsonify
from backend.models import db, Feedback

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/submit', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    # ذخیره در دیتابیس و return پاسخ مناسب
