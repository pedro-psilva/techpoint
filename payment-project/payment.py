# imports
import os
import stripe
from flask import Flask, redirect, request, session, jsonify
from dotenv import load_dotenv

# carregando o .env
load_dotenv()

app = Flask(__name__)

# configuração das chaves secretas
app.secret_key = os.getenv('FLASK_SECRET_KEY')

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
YOUR_DOMAIN = 'http://127.0.0.1:5000'

# catalogo de produtos
PRODUCTS = {
    # Celulares
    "s25u": {"name": "Galaxy S25 Ultra", "price": 899999},
    "s25": {"name": "Galaxy S25", "price": 649999},
    "zflip7": {"name": "Galaxy Z Flip7", "price": 799999},
    "zfold7": {"name": "Galaxy Z Fold7", "price": 1299999},
    
    # Tablets
    "tabs11": {"name": "Galaxy Tab S11", "price": 499999},
    "tabs11u": {"name": "Galaxy Tab S11 Ultra", "price": 799999},
    
    # Notebooks
    "book4p": {"name": "Galaxy Book4 Pro", "price": 989999},
    "book4u": {"name": "Galaxy Book4 Ultra", "price": 1450000},
    
    # Acessórios
    "buds2p": {"name": "Galaxy Buds2 Pro", "price": 129900},
    "watch8c": {"name": "Galaxy Watch8 Classic", "price": 349900},
}

#  ENDPOINTS DA API - usar no front 

# endpoint para listar todos os produtos
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS)

# endpoint para adicionar um item ao carrinho
@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = int(data.get('quantity', 1))

    if product_id not in PRODUCTS:
        return jsonify({"error": "Produto não encontrado"}), 404
    
    # cria o carrinho na sessão se ele não existir
    cart = session.get('cart', {})
    
    # add ou atualiza a quantidade do produto
    cart[product_id] = cart.get(product_id, 0) + quantity
    
    # salva o carrinho 
    session['cart'] = cart
    session.modified = True 
    
    return jsonify({"message": "Produto adicionado ao carrinho", "cart": cart})

# endpoint para ver o carrinho
@app.route('/cart', methods=['GET'])
def view_cart():
    cart = session.get('cart', {})
    if not cart:
        return jsonify({"items": [], "total_price_brl": "0.00"})

    cart_items = []
    total_price_cents = 0

    for product_id, quantity in cart.items():
        product = PRODUCTS.get(product_id)
        if product:
            item_total_cents = product['price'] * quantity
            total_price_cents += item_total_cents
            cart_items.append({
                "product_id": product_id,
                "name": product['name'],
                "price_brl": f"{(product['price'] / 100):.2f}",
                "quantity": quantity,
                "total_price_brl": f"{(item_total_cents / 100):.2f}"
            })
            
    return jsonify({
        "items": cart_items,
        "total_price_brl": f"{(total_price_cents / 100):.2f}"
    })
    
# endpoint para limpar o carrinho
@app.route('/cart/clear', methods=['POST'])
def clear_cart():
    session.pop('cart', None)
    return jsonify({"message": "Carrinho esvaziado com sucesso"})

# endpoint de Pagamento 
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    cart = session.get('cart', {})
    if not cart:
        return jsonify({"error": "Seu carrinho está vazio"}), 400

    line_items = []
    for product_id, quantity in cart.items():
        product = PRODUCTS.get(product_id)
        if product:
            line_items.append({
                'price_data': {
                    'currency': 'brl',
                    'product_data': {
                        'name': product['name'],
                    },
                    'unit_amount': product['price'], # Preço já está em centavos
                },
                'quantity': quantity,
            })

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card', 'boleto', 'pix'],
            line_items=line_items,
            mode='payment',
            success_url=YOUR_DOMAIN + '/success',
            cancel_url=YOUR_DOMAIN + '/cancel',
        )
        # limpa o carrinho após gerar o link de pagamento
        session.pop('cart', None)
        return redirect(checkout_session.url, code=303)
    except Exception as e:
        return str(e)

# rotas de Retorno e Página Inicial (teste) 
@app.route('/success')
def success():
    return "<h1>Pagamento concluído com sucesso!</h1>"

@app.route('/cancel')
def cancel():
    return "<h1>Pagamento cancelado.</h1>"

@app.route('/')
def index():
    # exemplo simples
    return "<h1>Techpoint!</h1><p>Use os endpoints para interagir.</p>"

if __name__ == '__main__':
    app.run(port=5000, debug=True)