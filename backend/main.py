# backend/app.py
from flask import Flask
from flask_cors import CORS
from backend.models import db, bcrypt
from backend.auth import auth_bp
from flask_migrate import Migrate




def create_app():
    app = Flask(__name__) # 👈 اول app رو ایجاد می‌کنیم
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_super_secret_key_change_this!'

    CORS(app, origins=["http://localhost:3000"]) # به جای CORS(app)

    db.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    app.register_blueprint(auth_bp, url_prefix='/api/auth') # 👈 و بعد Blueprintها رو ثبت می‌کنیم

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

# migrate = Migrate(app, db)