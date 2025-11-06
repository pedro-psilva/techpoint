# 1. IMAGEM BASE
# Pega uma "caixa" limpa com Python 3.10
FROM python:3.10-slim

# 2. DIRETÓRIO DE TRABALHO
# Define a pasta de trabalho principal dentro do contêiner
WORKDIR /app

# 3. INSTALAÇÃO DE DEPENDÊNCIAS
# Copia SÓ a lista de bibliotecas primeiro
COPY requirements.txt .
# Instala as bibliotecas (isso fica salvo em cache)
RUN pip install --no-cache-dir -r requirements.txt

# 4. CÓDIGO DA APLICAÇÃO
# Agora copia todo o resto do seu projeto (payment.py, carrinho.html, etc.)
COPY . .

# 5. PORTA
# Informa ao Docker que sua aplicação usa a porta 5000
EXPOSE 5000

# 6. COMANDO DE INICIALIZAÇÃO
# Usa a app factory em run.py
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]