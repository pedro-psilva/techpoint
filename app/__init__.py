import os
from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv


def create_app() -> Flask:
    load_dotenv()

    from pathlib import Path
    base_dir = Path(__file__).parent.parent
    
    app = Flask(__name__, template_folder=str(base_dir / 'templates'), static_folder=str(base_dir / 'static'))
    
    render_domain = os.getenv("YOUR_DOMAIN", "")
    if render_domain and render_domain.startswith("https://"):
        CORS(app, 
             supports_credentials=True,
             origins=[render_domain],
             allow_headers=["Content-Type", "Authorization"],
             methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    else:
        CORS(app, 
             supports_credentials=True,
             origins=["http://127.0.0.1:5000", "http://localhost:5000"],
             allow_headers=["Content-Type", "Authorization"],
             methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    app.secret_key = os.getenv("FLASK_SECRET_KEY")
    if not app.secret_key:
        import secrets
        app.secret_key = secrets.token_hex(32)
        print("⚠️  AVISO: FLASK_SECRET_KEY não configurada! Gerando chave temporária.")
        print("⚠️  Configure FLASK_SECRET_KEY nas variáveis de ambiente do Render!")
    
    app.config["STRIPE_SECRET_KEY"] = os.getenv("STRIPE_SECRET_KEY")
    app.config["YOUR_DOMAIN"] = os.getenv("YOUR_DOMAIN", "http://127.0.0.1:5000")
    
    is_production = os.getenv("RENDER") == "true" or os.getenv("FLASK_ENV") == "production"
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)
    app.config["SESSION_COOKIE_SECURE"] = is_production  # True em HTTPS (Render)
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # Compatível com navegadores modernos
    
    import stripe as stripe_lib
    if app.config["STRIPE_SECRET_KEY"]:
        stripe_lib.api_key = app.config["STRIPE_SECRET_KEY"]

    from .controllers.shop import shop_bp
    app.register_blueprint(shop_bp)

    return app


