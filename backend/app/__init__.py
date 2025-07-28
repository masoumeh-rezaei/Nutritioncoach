# backend/app/__init__.py

from flask import Flask
from app.utils.extensions import db, bcrypt
from flask_sqlalchemy import SQLAlchemy
#from flask_bcrypt import Bcrypt
from flask_cors import CORS

# db = SQLAlchemy()
# bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key'
    app.config.from_object('app.config.Config')

    db.init_app(app)
    bcrypt.init_app(app)
    CORS(app)

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api")

    with app.app_context():
        db.create_all()

    return app
