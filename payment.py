"""
DEPRECATED: Este arquivo foi substituído pela arquitetura MVC.
Use run.py para iniciar a aplicação.

Mantido apenas para compatibilidade com scripts antigos ou Docker que ainda referenciam payment:app
"""

# Importa a app factory do novo sistema MVC
from run import app

# Para compatibilidade com gunicorn: payment:app
__all__ = ['app']
