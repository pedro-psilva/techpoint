import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv


def create_app() -> Flask:
    load_dotenv()

    # Define o caminho base do projeto (onde está run.py)
    from pathlib import Path
    base_dir = Path(__file__).parent.parent  # Sobe de app/ para raiz do projeto
    
    app = Flask(__name__, template_folder=str(base_dir / 'templates'), static_folder=str(base_dir / 'static'))
    CORS(app, supports_credentials=True)

    # Secrets and config
    app.secret_key = os.getenv("FLASK_SECRET_KEY")
    app.config["STRIPE_SECRET_KEY"] = os.getenv("STRIPE_SECRET_KEY")
    app.config["YOUR_DOMAIN"] = os.getenv("YOUR_DOMAIN", "http://127.0.0.1:5000")
    
    # Configurar Stripe API key globalmente
    import stripe as stripe_lib
    if app.config["STRIPE_SECRET_KEY"]:
        stripe_lib.api_key = app.config["STRIPE_SECRET_KEY"]

    # Blueprints
    from .controllers.shop import shop_bp
    app.register_blueprint(shop_bp)

    return app


