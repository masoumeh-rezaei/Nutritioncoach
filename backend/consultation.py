from flask import Blueprint, request, jsonify
from backend.models import db, Consultation

consultation_bp = Blueprint('consultation', __name__)

@consultation_bp.route('/submit', methods=['POST'])
def submit_consultation():
    data = request.get_json()

    if not data or not data.get('user_id'):
        return jsonify({"message": "user_id is required"}), 400

    try:
        consultation = Consultation(
            user_id=data['user_id'],
            goal=data.get('goal'),
            age=data.get('age'),
            weight=data.get('weight'),
            height=data.get('height'),
            activity_level=data.get('activity_level'),
            notes=data.get('notes')
        )
        db.session.add(consultation)
        db.session.commit()
        return jsonify({"message": "Consultation submitted successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error submitting consultation", "error": str(e)}), 500

# فایل: backend/models.py (ادامه)
from datetime import datetime

class Consultation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    goal = db.Column(db.String(128))
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    height = db.Column(db.Float)
    activity_level = db.Column(db.String(64))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('consultations', lazy=True))