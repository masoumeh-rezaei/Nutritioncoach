from flask import Blueprint, request, jsonify
from backend.models import db, Consultation
from flask_cors import CORS
import traceback

consultation_bp = Blueprint('consultation', __name__)
CORS(consultation_bp)

@consultation_bp.route('/submit', methods=['POST'])
def submit_consultation():
    data = request.get_json()
    print("Received data:", data)


    if not data or not data.get('userId'): # اینجا 'userId' رو چک کن
        print("Debug: Data is missing or 'userId' is not found.")
        return jsonify({"message": "userId is required"}), 400


    try:
        consultation = Consultation(

            user_id=data['userId'],
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

        traceback.print_exc()
        print("-------------------------------------------\n")
        return jsonify({"message": "Error submitting consultation", "error": str(e)}), 500