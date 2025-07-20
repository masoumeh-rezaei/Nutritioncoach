from app import create_app, db, bcrypt
from app.models.user import User

app = create_app()

with app.app_context():
    password_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
    user = User(email="test@example.com", password=password_hash)
    db.session.add(user)
    db.session.commit()
    print("✅ Test user created")
