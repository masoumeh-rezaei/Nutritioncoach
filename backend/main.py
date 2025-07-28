
# backend/main.py


# backend/app.py
from flask import Flask
from flask_cors import CORS
from backend.models import db, bcrypt
from backend.auth import auth_bp
from flask_migrate import Migrate
from backend.consultation import consultation_bp
from flask_jwt_extended import JWTManager
from datetime  import timedelta
from backend.profile import profile_bp


def create_app():

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_super_secret_key_change_this!'

    # JWT config for cookies
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key_here'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=7)
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
    app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token'

    # چون لوکال HTTP هستیم، secure باید False باشه
    app.config['JWT_COOKIE_SECURE'] = False

    # برای سادگی و جلوگیری از مشکلات سایدسایت، Lax خوبه
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'

    # اگر می‌خوای از CSRF محافظت نکنی (ولی توصیه‌ش نمیشه برای امنیت)
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False

# CORS(app, origins=["http://localhost:3000"])
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    db.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(consultation_bp, url_prefix='/api/consultation')
    app.register_blueprint(profile_bp, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

# migrate = Migrate(app, db)