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
