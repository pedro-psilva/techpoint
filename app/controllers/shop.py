import stripe
from flask import Blueprint, current_app, jsonify, redirect, render_template, request, session, url_for

from app.models.catalog import PRODUCTS


shop_bp = Blueprint("shop", __name__)


@shop_bp.before_request
def configure_stripe() -> None:
    """Configura Stripe API key antes de cada requisição"""
    if not stripe.api_key:
        stripe.api_key = current_app.config.get("STRIPE_SECRET_KEY")


@shop_bp.get("/products")
def get_products():
    return jsonify(PRODUCTS)


@shop_bp.post("/cart/add")
def add_to_cart():
    try:
        data = request.get_json(silent=True) or {}
        product_id = data.get("product_id")
        quantity = int(data.get("quantity", 1))

        if not product_id:
            return jsonify({"error": "product_id é obrigatório"}), 400

        if product_id not in PRODUCTS:
            return jsonify({"error": f"Produto não encontrado: {product_id}"}), 404

        # Garantir que a sessão está funcionando
        if not hasattr(session, 'get'):
            return jsonify({"error": "Sessão não disponível"}), 500

        cart = session.get("cart", {})
        cart[product_id] = cart.get(product_id, 0) + quantity

        session["cart"] = cart
        session.modified = True

        return jsonify({
            "message": "Produto adicionado ao carrinho", 
            "cart": cart,
            "product_id": product_id
        })
    except Exception as e:
        import traceback
        print(f"Erro em add_to_cart: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500


@shop_bp.post("/cart/remove")
def remove_from_cart():
    data = request.get_json(silent=True) or {}
    product_id = data.get("product_id")
    cart = session.get("cart", {})

    if product_id in cart:
        del cart[product_id]
        session["cart"] = cart
        session.modified = True
        return jsonify({"message": "Produto removido", "cart": cart})

    return jsonify({"error": "Produto não encontrado no carrinho"}), 404


@shop_bp.post("/cart/update")
def update_cart():
    data = request.get_json(silent=True) or {}
    product_id = data.get("product_id")
    quantity = int(data.get("quantity", 1))
    cart = session.get("cart", {})

    if product_id not in PRODUCTS:
        return jsonify({"error": "Produto não encontrado"}), 404

    if quantity <= 0:
        if product_id in cart:
            del cart[product_id]
    else:
        cart[product_id] = quantity

    session["cart"] = cart
    session.modified = True
    return jsonify({"message": "Quantidade atualizada", "cart": cart})


@shop_bp.get("/cart")
def view_cart():
    cart = session.get("cart", {})
    if not cart:
        return jsonify({"items": [], "total_price_brl": "0.00"})

    cart_items = []
    total_price_cents = 0

    for product_id, quantity in cart.items():
        product = PRODUCTS.get(product_id)
        if product:
            item_total_cents = product["price"] * quantity
            total_price_cents += item_total_cents
            cart_items.append({
                "product_id": product_id,
                "name": product["name"],
                "color": product["color"],
                "description": product["description"],
                "image": product["image"],
                "price_brl": f"{(product['price'] / 100):.2f}",
                "quantity": quantity,
                "total_price_brl": f"{(item_total_cents / 100):.2f}"
            })

    return jsonify({
        "items": cart_items,
        "total_price_brl": f"{(total_price_cents / 100):.2f}"
    })


@shop_bp.post("/cart/clear")
def clear_cart():
    session.pop("cart", None)
    return jsonify({"message": "Carrinho esvaziado com sucesso"})


@shop_bp.post("/create-checkout-session")
def create_checkout_session():
    try:
        cart = session.get("cart", {})
        if not cart:
            return jsonify({"error": "Seu carrinho está vazio"}), 400

        your_domain = current_app.config.get("YOUR_DOMAIN", request.host_url.rstrip("/"))

        line_items = []
        for product_id, quantity in cart.items():
            product = PRODUCTS.get(product_id)
            if product:
                line_items.append({
                    'price_data': {
                        'currency': 'brl',
                        'product_data': {
                            'name': product['name'],
                            'description': f"{product.get('description','')} - {product.get('color','')}",
                            'images': [your_domain + product['image']]
                        },
                        'unit_amount': product['price'],
                    },
                    'quantity': quantity,
                })

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card', 'boleto'],
            line_items=line_items,
            mode='payment',
            success_url=your_domain + '/success',
            cancel_url=your_domain + '/cancel',
        )
        # NÃO limpar o carrinho aqui - só limpar após pagamento bem-sucedido
        return redirect(checkout_session.url, code=303)
    except Exception as e:
        import traceback
        print(f"Erro em create_checkout_session: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


@shop_bp.get("/")
def show_home_page():
    return render_template("index.html")


@shop_bp.get("/produtos")
def show_products_page():
    return render_template("productListing.html")


@shop_bp.get("/carrinho")
def show_cart_page():
    return render_template("cart.html")


@shop_bp.get("/produto/<product_id>")
def show_product_page(product_id):
    product = PRODUCTS.get(product_id)
    if not product:
        return "Produto não encontrado", 404
    return render_template("productpage.html", product=product)


@shop_bp.get("/success")
def success():
    # Limpar o carrinho apenas após pagamento bem-sucedido
    session.pop('cart', None)
    return "<h1>Pagamento Aprovado!</h1>"


@shop_bp.get("/cancel")
def cancel():
    # Redirecionar para o carrinho quando o pagamento for cancelado
    return redirect(url_for('shop.show_cart_page'))


