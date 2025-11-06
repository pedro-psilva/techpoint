import os
import stripe
from flask import Flask, redirect, request, session, jsonify, render_template
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

# Configura o app para usar a pasta 'frontend' para HTML (templates) e CSS/JS (static)
app = Flask(__name__, template_folder='frontend', static_folder='frontend')
CORS(app, supports_credentials=True)

app.secret_key = os.getenv('FLASK_SECRET_KEY')
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
YOUR_DOMAIN = 'http://127.0.0.1:5000'

def format_price_to_cents(price_str):
    cleaned_price = price_str.replace("R$", "").replace(".", "").replace(",", "")
    return int(cleaned_price)

def format_image_path(image_str):
    # O Flask agora usa 'frontend' como pasta estática.
    # O caminho no HTML/API deve ser relativo a ela, começando em '/images/'
    filename = image_str.split('/')[-1]
    return f"/images/{filename}"

PRODUCTS = {
    "1": {"name": "Galaxy S25 Ultra", "color": "Titânio Cinza", "description": "512 GB", "price": format_price_to_cents("R$11.999,00"), "image": format_image_path("frontend/images/GalaxyS25Ultra3.png")},
    "2": {"name": "Galaxy S25", "color": "Verde", "description": "256 GB", "price": format_price_to_cents("R$6.999,00"), "image": format_image_path("frontend/images/GalaxyS252.png")},
    "3": {"name": "Galaxy Z Flip7", "color": "Azul", "description": "512 GB", "price": format_price_to_cents("R$9.199,00"), "image": format_image_path("frontend/images/GalaxyZFlip72.png")},
    "4": {"name": "Galaxy Z Fold7", "color": "Jetblack", "description": "1 TB", "price": format_price_to_cents("R$16.599,00"), "image": format_image_path("frontend/images/GalaxyZFold72.png")},
    "5": {"name": "Galaxy Tab S10 FE", "color": "Azul", "description": "128 GB", "price": format_price_to_cents("R$4.199,00"), "image": format_image_path("frontend/images/10FE.webp")},
    "6": {"name": "Galaxy Tab A9+ 5G", "color": "Grafite", "description": "64 GB", "price": format_price_to_cents("R$1.999,00"), "image": format_image_path("frontend/images/A9+5g.jpeg")},
    "7": {"name": "Galaxy Tab S11", "color": "Branco", "description": "256 GB", "price": format_price_to_cents("R$6.999,00"), "image": format_image_path("frontend/images/s11.png")},
    "8": {"name": "Galaxy Tab S11 Ultra", "color": "Cinza", "description": "512 GB", "price": format_price_to_cents("R$11.999,00"), "image": format_image_path("frontend/images/s11ultra1.png")},
    "9": {"name": "Galaxy Book4 Pro", "color": "Grafite", "description": "512 GB SSD", "price": format_price_to_cents("R$11.999,00"), "image": format_image_path("frontend/images/4-pro.webp")},
    "10": {"name": "Galaxy Book4 Ultra", "color": "Grafite", "description": "1 TB SSD", "price": format_price_to_cents("R$18.999,00"), "image": format_image_path("frontend/images/GalaxyBook4Ultra2.png")},
    "11": {"name": "Galaxy Book3 360", "color": "Grafite", "description": "256 GB SSD", "price": format_price_to_cents("R$6.099,00"), "image": format_image_path("frontend/images/3-360.webp")},
    "12": {"name": "Galaxy Book4 360", "color": "Grafite", "description": "1 TB SSD", "price": format_price_to_cents("R$8.999,00"), "image": format_image_path("frontend/images/4-360.webp")},
    "13": {"name": "Galaxy Buds Core", "color": "Preto", "description": "Sem Fio", "price": format_price_to_cents("R$349,00"), "image": format_image_path("frontend/images/budscore.webp")},
    "14": {"name": "Galaxy Watch8 Classic", "color": "Preto", "description": "Galaxy AI", "price": format_price_to_cents("R$4.499,00"), "image": format_image_path("frontend/images/Watch8classic.webp")},
    "15": {"name": "Carregador Sem Fio Duo", "color": "Preto", "description": "Rápido 15W", "price": format_price_to_cents("R$299,00"), "image": format_image_path("frontend/images/carregadorduo.webp")},
    "16": {"name": "Capa Smart Book Cover Galaxy Tab S11", "color": "Preto", "description": "Tab Cover", "price": format_price_to_cents("R$499,00"), "image": format_image_path("frontend/images/s11capa.webp")},
}

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS)

@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = int(data.get('quantity', 1))

    if product_id not in PRODUCTS:
        return jsonify({"error": "Produto não encontrado"}), 404
    
    cart = session.get('cart', {})
    cart[product_id] = cart.get(product_id, 0) + quantity
    
    session['cart'] = cart
    session.modified = True 
    
    return jsonify({"message": "Produto adicionado ao carrinho", "cart": cart})

@app.route('/cart/remove', methods=['POST'])
def remove_from_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    cart = session.get('cart', {})

    if product_id in cart:
        del cart[product_id]
        session['cart'] = cart
        session.modified = True
        return jsonify({"message": "Produto removido", "cart": cart})
    
    return jsonify({"error": "Produto não encontrado no carrinho"}), 404

@app.route('/cart/update', methods=['POST'])
def update_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = int(data.get('quantity', 1))
    cart = session.get('cart', {})

    if product_id not in PRODUCTS:
        return jsonify({"error": "Produto não encontrado"}), 404

    if quantity <= 0:
        if product_id in cart:
            del cart[product_id]
    else:
        cart[product_id] = quantity
    
    session['cart'] = cart
    session.modified = True
    return jsonify({"message": "Quantidade atualizada", "cart": cart})

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
                "color": product['color'],
                "description": product['description'],
                "image": product['image'],
                "price_brl": f"{(product['price'] / 100):.2f}",
                "quantity": quantity,
                "total_price_brl": f"{(item_total_cents / 100):.2f}"
            })
            
    return jsonify({
        "items": cart_items,
        "total_price_brl": f"{(total_price_cents / 100):.2f}"
    })
    
@app.route('/cart/clear', methods=['POST'])
def clear_cart():
    session.pop('cart', None)
    return jsonify({"message": "Carrinho esvaziado com sucesso"})

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
                        'description': f"{product['description']} - {product['color']}",
                        'images': [YOUR_DOMAIN + product['image']]
                    },
                    'unit_amount': product['price'],
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
        session.pop('cart', None)
        return redirect(checkout_session.url, code=303)
    except Exception as e:
        return str(e)

@app.route('/carrinho')
def show_cart_page():
    return render_template('carrinho.html')

@app.route('/success')
def success():
    return render_template('success.html') 

@app.route('/cancel')
def cancel():
    return render_template('cancel.html') 

@app.route('/')
def index():
    return redirect('/carrinho')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)