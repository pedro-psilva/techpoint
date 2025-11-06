def format_price_to_cents(price_str: str) -> int:
    cleaned_price = price_str.replace("R$", "").replace(".", "").replace(",", "")
    return int(cleaned_price)


def format_image_path(image_str: str) -> str:
    filename = image_str.split('/')[-1]
    return f"/static/images/{filename}"


def format_video_path(video_str: str) -> str:
    filename = video_str.split('/')[-1]
    return f"/static/videos/{filename}"


PRODUCTS = {
    "1": {
        "name": "Galaxy S25 Ultra", 
        "category": "smartphones", 
        "color": "Titânio Cinza", 
        "description": "512 GB", 
        "price": format_price_to_cents("R$11.999,00"), 
        "image": format_image_path("static/images/GalaxyS25Ultra3.png"),
        "full_description": "O Galaxy S25 Ultra redefine o que é possível em um smartphone premium. Com tela Dynamic AMOLED 2X de 6.8 polegadas, processador Snapdragon 8 Gen 4 e sistema de câmeras profissionais de 200MP, oferece performance incomparável e fotografia de nível profissional.",
        "specs": {
            "tela": "6.8\" Dynamic AMOLED 2X 120Hz",
            "processador": "Snapdragon 8 Gen 4",
            "memoria": "12GB RAM + 512GB",
            "camera": "200MP Principal + 50MP Ultra Wide + 10MP Telefoto",
            "bateria": "5000mAh com carregamento rápido 45W",
            "sistema": "Android 15 com One UI 7.0"
        },
        "gallery": [
            format_image_path("static/images/GalaxyS25Ultra3.png"),
            format_image_path("static/images/galaxy-s25-ultra-1.jpg"),
            format_image_path("static/images/galaxy-s25-ultra.jpg"),
            format_image_path("static/images/Galaxy S25 Ultra.jpg")
        ],
        "videos": [
            format_video_path("static/videos/galaxy-s25-ultra-features-ai-overview.webm"),
            format_video_path("static/videos/galaxy-s25-ultra-features-form-factor.webm"),
            format_video_path("static/videos/galaxy-s25-ultra-features-gemini-live.webm"),
            format_video_path("static/videos/galaxy-s25-ultra-features-highlights-galaxy-ai.webm"),
            format_video_path("static/videos/galaxy-s25-ultra-features-now-brief-1.webm"),
            format_video_path("static/videos/galaxy-s25-ultra-features-seamless-actions-across-apps_v3.webm")
        ],
        "features": [
            "Tela Dynamic AMOLED 2X com 120Hz",
            "Sistema de câmeras profissionais 200MP",
            "Processador Snapdragon 8 Gen 4",
            "Resistente à água IP68",
            "Carregamento sem fio e reverso",
            "S Pen incluído"
        ]
    },
    "2": {
        "name": "Galaxy S25", 
        "category": "smartphones", 
        "color": "Verde", 
        "description": "256 GB", 
        "price": format_price_to_cents("R$6.999,00"), 
        "image": format_image_path("static/images/GalaxyS252.png"),
        "full_description": "O Galaxy S25 combina design elegante com tecnologia de ponta. Tela Dynamic AMOLED de 6.2 polegadas, processador Snapdragon 8 Gen 4 e sistema de câmeras de 50MP para capturar momentos únicos com qualidade excepcional.",
        "specs": {
            "tela": "6.2\" Dynamic AMOLED 120Hz",
            "processador": "Snapdragon 8 Gen 4",
            "memoria": "8GB RAM + 256GB",
            "camera": "50MP Principal + 12MP Ultra Wide + 8MP Telefoto",
            "bateria": "4000mAh com carregamento rápido 25W",
            "sistema": "Android 15 com One UI 7.0"
        },
        "gallery": [
            format_image_path("static/images/GalaxyS252.png"),
            format_image_path("static/images/Galaxy S25 com fundo.jpg"),
            format_image_path("static/images/capa s25 final.png")
        ],
        "videos": [
            format_video_path("static/videos/Galaxy S25 series.webm")
        ],
        "features": [
            "Tela Dynamic AMOLED com 120Hz",
            "Sistema de câmeras de 50MP",
            "Processador Snapdragon 8 Gen 4",
            "Resistente à água IP68",
            "Carregamento sem fio",
            "Design premium em alumínio"
        ]
    },
    "3": {
        "name": "Galaxy Z Flip7", 
        "category": "smartphones", 
        "color": "Azul", 
        "description": "512 GB", 
        "price": format_price_to_cents("R$9.199,00"), 
        "image": format_image_path("static/images/GalaxyZFlip72.png"),
        "full_description": "O Galaxy Z Flip7 revoluciona a experiência smartphone com design dobrável inovador. Tela principal de 6.7 polegadas que se dobra ao meio, tela externa de 3.4 polegadas e sistema de câmeras duplas de 12MP para fotos e selfies incríveis.",
        "specs": {
            "tela_principal": "6.7\" Dynamic AMOLED 2X 120Hz",
            "tela_externa": "3.4\" Super AMOLED",
            "processador": "Snapdragon 8 Gen 3",
            "memoria": "8GB RAM + 512GB",
            "camera": "12MP Principal + 12MP Ultra Wide",
            "bateria": "3700mAh com carregamento rápido 25W",
            "sistema": "Android 15 com One UI 7.0"
        },
        "gallery": [
            format_image_path("static/images/GalaxyZFlip72.png"),
            format_image_path("static/images/zflip 7 com fundo.webp"),
            format_image_path("static/images/Galaxy Z Flip 7.jpg")
        ],
        "features": [
            "Design dobrável inovador",
            "Tela principal 6.7\" Dynamic AMOLED",
            "Tela externa 3.4\" para notificações",
            "Sistema de câmeras duplas 12MP",
            "Resistente à água IPX8",
            "Carregamento sem fio"
        ]
    },
    "4": {
        "name": "Galaxy Z Fold7", 
        "category": "smartphones", 
        "color": "Jetblack", 
        "description": "1 TB", 
        "price": format_price_to_cents("R$16.599,00"), 
        "image": format_image_path("static/images/GalaxyZFold72.png"),
        "full_description": "O Galaxy Z Fold7 é o futuro dos smartphones dobráveis. Tela interna de 7.6 polegadas que se transforma em tablet, tela externa de 6.2 polegadas e sistema de câmeras profissionais de 50MP. A produtividade nunca foi tão portátil.",
        "specs": {
            "tela_interna": "7.6\" Dynamic AMOLED 2X 120Hz",
            "tela_externa": "6.2\" Dynamic AMOLED 120Hz",
            "processador": "Snapdragon 8 Gen 3",
            "memoria": "12GB RAM + 1TB",
            "camera": "50MP Principal + 12MP Ultra Wide + 10MP Telefoto",
            "bateria": "4400mAh com carregamento rápido 25W",
            "sistema": "Android 15 com One UI 7.0"
        },
        "gallery": [
            format_image_path("static/images/GalaxyZFold72.png"),
            format_image_path("static/images/Samsung-Mobile-Galaxy-Z-Fold7.jpg"),
            format_image_path("static/images/zfold 7 com fundo.webp"),
            format_image_path("static/images/Galaxy Zfold 7.jpg")
        ],
        "videos": [
            format_video_path("static/videos/Video Zfold.mp4")
        ],
        "features": [
            "Tela interna 7.6\" transformável em tablet",
            "Tela externa 6.2\" para uso convencional",
            "Sistema de câmeras profissionais 50MP",
            "S Pen compatível",
            "Resistente à água IPX8",
            "Produtividade máxima em qualquer lugar"
        ]
    },
    "5": {
        "name": "Galaxy Tab S10 FE", 
        "category": "tablets", 
        "color": "Azul", 
        "description": "128 GB", 
        "price": format_price_to_cents("R$4.199,00"), 
        "image": format_image_path("static/images/10FE.webp"),
        "full_description": "O Galaxy Tab S10 FE oferece o equilíbrio perfeito entre performance e acessibilidade. Com tela LCD de 10.9 polegadas, processador Snapdragon 778G e S Pen incluído, é ideal para produtividade, estudos e entretenimento.",
        "specs": {
            "tela": "10.9\" LCD 90Hz",
            "processador": "Snapdragon 778G",
            "memoria": "6GB RAM + 128GB",
            "camera": "8MP Principal + 5MP Frontal",
            "bateria": "8000mAh com carregamento rápido 15W",
            "sistema": "Android 14 com One UI 6.0",
            "s_pen": "S Pen incluído"
        },
        "gallery": [
            format_image_path("static/images/10FE.webp")
        ],
        "features": [
            "Tela LCD de 10.9 polegadas",
            "S Pen incluído para produtividade",
            "Processador Snapdragon 778G",
            "Bateria de longa duração 8000mAh",
            "Design elegante e leve",
            "Ideal para estudos e trabalho"
        ]
    },
    "6": {
        "name": "Galaxy Tab A9+ 5G", 
        "category": "tablets", 
        "color": "Grafite", 
        "description": "64 GB", 
        "price": format_price_to_cents("R$1.999,00"), 
        "image": format_image_path("static/images/A9+5G.jpeg"),
        "full_description": "O Galaxy Tab A9+ 5G é o tablet mais acessível com conectividade 5G. Tela de 11 polegadas, processador Snapdragon 695 e conectividade 5G para navegação ultrarrápida e streaming sem interrupções.",
        "specs": {
            "tela": "11\" LCD 60Hz",
            "processador": "Snapdragon 695",
            "memoria": "4GB RAM + 64GB",
            "camera": "8MP Principal + 5MP Frontal",
            "bateria": "7040mAh com carregamento rápido 15W",
            "sistema": "Android 14 com One UI 6.0",
            "conectividade": "5G + Wi-Fi 6"
        },
        "gallery": [
            format_image_path("static/images/A9+5G.jpeg")
        ],
        "features": [
            "Conectividade 5G ultrarrápida",
            "Tela de 11 polegadas",
            "Processador Snapdragon 695",
            "Bateria de longa duração",
            "Design moderno e compacto",
            "Perfeito para streaming e navegação"
        ]
    },
    "7": {
        "name": "Galaxy Tab S11", 
        "category": "tablets", 
        "color": "Branco", 
        "description": "256 GB", 
        "price": format_price_to_cents("R$6.999,00"), 
        "image": format_image_path("static/images/s11.png"),
        "full_description": "O Galaxy Tab S11 redefine a produtividade móvel com tela Dynamic AMOLED de 11 polegadas, processador Snapdragon 8 Gen 3 e S Pen Pro. A combinação perfeita de performance e portabilidade para profissionais criativos.",
        "specs": {
            "tela": "11\" Dynamic AMOLED 120Hz",
            "processador": "Snapdragon 8 Gen 3",
            "memoria": "8GB RAM + 256GB",
            "camera": "13MP Principal + 8MP Ultra Wide + 12MP Frontal",
            "bateria": "10090mAh com carregamento rápido 45W",
            "sistema": "Android 15 com One UI 7.0",
            "s_pen": "S Pen Pro compatível"
        },
        "gallery": [
            format_image_path("static/images/s11.png"),
            format_image_path("static/images/tab 11 capa.jpg"),
            format_image_path("static/images/capa tab11.jpg")
        ],
        "videos": [
            format_video_path("static/videos/TAB11.mp4")
        ],
        "features": [
            "Tela Dynamic AMOLED 11\" com 120Hz",
            "Processador Snapdragon 8 Gen 3",
            "S Pen Pro para criatividade",
            "Câmeras profissionais",
            "Bateria de longa duração",
            "Design premium em alumínio"
        ]
    },
    "8": {
        "name": "Galaxy Tab S11 Ultra", 
        "category": "tablets", 
        "color": "Cinza", 
        "description": "512 GB", 
        "price": format_price_to_cents("R$11.999,00"), 
        "image": format_image_path("static/images/s11ultra1.png"),
        "full_description": "O Galaxy Tab S11 Ultra é o tablet mais poderoso da Samsung. Tela Dynamic AMOLED de 14.6 polegadas, processador Snapdragon 8 Gen 3, S Pen Pro e teclado Book Cover incluído. A estação de trabalho móvel definitiva.",
        "specs": {
            "tela": "14.6\" Dynamic AMOLED 120Hz",
            "processador": "Snapdragon 8 Gen 3",
            "memoria": "12GB RAM + 512GB",
            "camera": "13MP Principal + 8MP Ultra Wide + 12MP Frontal",
            "bateria": "11200mAh com carregamento rápido 45W",
            "sistema": "Android 15 com One UI 7.0",
            "acessorios": "S Pen Pro + Book Cover incluídos"
        },
        "gallery": [
            format_image_path("static/images/s11ultra1.png"),
            format_image_path("static/images/Tab 11 Ultra")
        ],
        "features": [
            "Tela Dynamic AMOLED 14.6\" gigante",
            "Processador Snapdragon 8 Gen 3",
            "S Pen Pro + Book Cover incluídos",
            "12GB RAM para multitarefa",
            "Bateria de longa duração",
            "Estação de trabalho móvel completa"
        ]
    },
    "9": {
        "name": "Galaxy Book4 Pro", 
        "category": "notebooks", 
        "color": "Grafite", 
        "description": "512 GB SSD", 
        "price": format_price_to_cents("R$11.999,00"), 
        "image": format_image_path("static/images/4-pro.webp"),
        "full_description": "O Galaxy Book4 Pro combina performance excepcional com design elegante. Processador Intel Core i7 de 13ª geração, tela AMOLED de 14 polegadas e integração perfeita com o ecossistema Samsung Galaxy.",
        "specs": {
            "tela": "14\" AMOLED 2880x1800 90Hz",
            "processador": "Intel Core i7-1360P",
            "memoria": "16GB LPDDR5 + 512GB SSD",
            "graficos": "Intel Iris Xe",
            "bateria": "76Wh com carregamento rápido 65W",
            "sistema": "Windows 11 Home",
            "conectividade": "Wi-Fi 6E + Bluetooth 5.3"
        },
        "gallery": [
            format_image_path("static/images/4-pro.webp"),
            format_image_path("static/images/Galaxy book 4pro.jpg"),
            format_image_path("static/images/Galaxy Tab 4 pro.jpg"),
            format_image_path("static/images/capa gbook4.jpg"),
            format_image_path("static/images/galaxypro imagem descubra.jpg")
        ],
        "videos": [
            format_video_path("static/videos/Galaxy Book 4 Pro.webm")
        ],
        "features": [
            "Tela AMOLED 14\" com 90Hz",
            "Processador Intel Core i7",
            "16GB RAM para performance",
            "SSD NVMe ultrarrápido",
            "Integração com Galaxy ecosystem",
            "Design premium e portátil"
        ]
    },
    "10": {
        "name": "Galaxy Book4 Ultra", 
        "category": "notebooks", 
        "color": "Grafite", 
        "description": "1 TB SSD", 
        "price": format_price_to_cents("R$18.999,00"), 
        "image": format_image_path("static/images/GalaxyBook4Ultra2.png"),
        "full_description": "O Galaxy Book4 Ultra é a máquina definitiva para profissionais e criadores. Processador Intel Core i9, placa gráfica RTX 4070, tela AMOLED de 16 polegadas e 32GB de RAM. Performance de desktop em formato portátil.",
        "specs": {
            "tela": "16\" AMOLED 2880x1800 120Hz",
            "processador": "Intel Core i9-13900H",
            "memoria": "32GB LPDDR5 + 1TB SSD",
            "graficos": "NVIDIA RTX 4070 8GB",
            "bateria": "100Wh com carregamento rápido 100W",
            "sistema": "Windows 11 Pro",
            "conectividade": "Wi-Fi 6E + Bluetooth 5.3 + Thunderbolt 4"
        },
        "gallery": [
            format_image_path("static/images/GalaxyBook4Ultra2.png"),
            format_image_path("static/images/imagem lado cep.jpg"),
            format_image_path("static/images/imagem ao lado cep  sem fundo.webp")
        ],
        "features": [
            "Tela AMOLED 16\" com 120Hz",
            "Processador Intel Core i9",
            "NVIDIA RTX 4070 para gaming/criação",
            "32GB RAM para multitarefa extrema",
            "1TB SSD NVMe ultrarrápido",
            "Performance de desktop portátil"
        ]
    },
    "11": {
        "name": "Galaxy Book3 360", 
        "category": "notebooks", 
        "color": "Grafite", 
        "description": "256 GB SSD", 
        "price": format_price_to_cents("R$6.099,00"), 
        "image": format_image_path("static/images/3-360.webp"),
        "full_description": "O Galaxy Book3 360 é o notebook 2-em-1 perfeito para produtividade e criatividade. Tela touch de 13.3 polegadas que gira 360°, processador Intel Core i5 e S Pen incluído para máxima versatilidade.",
        "specs": {
            "tela": "13.3\" FHD Touch 360°",
            "processador": "Intel Core i5-1335U",
            "memoria": "8GB LPDDR4 + 256GB SSD",
            "graficos": "Intel Iris Xe",
            "bateria": "68Wh com carregamento rápido 45W",
            "sistema": "Windows 11 Home",
            "acessorios": "S Pen incluído"
        },
        "gallery": [
            format_image_path("static/images/3-360.webp")
        ],
        "features": [
            "Design 2-em-1 com tela 360°",
            "Tela touch de 13.3 polegadas",
            "S Pen incluído para criatividade",
            "Processador Intel Core i5",
            "Leve e portátil",
            "Versatilidade máxima"
        ]
    },
    "12": {
        "name": "Galaxy Book4 360", 
        "category": "notebooks", 
        "color": "Grafite", 
        "description": "1 TB SSD", 
        "price": format_price_to_cents("R$8.999,00"), 
        "image": format_image_path("static/images/4-360.webp"),
        "full_description": "O Galaxy Book4 360 é a evolução do notebook 2-em-1. Tela AMOLED de 13.3 polegadas com 360°, processador Intel Core i7, S Pen Pro e integração completa com o ecossistema Samsung Galaxy.",
        "specs": {
            "tela": "13.3\" AMOLED FHD Touch 360°",
            "processador": "Intel Core i7-1360P",
            "memoria": "16GB LPDDR5 + 1TB SSD",
            "graficos": "Intel Iris Xe",
            "bateria": "76Wh com carregamento rápido 65W",
            "sistema": "Windows 11 Home",
            "acessorios": "S Pen Pro incluído"
        },
        "gallery": [
            format_image_path("static/images/4-360.webp")
        ],
        "features": [
            "Tela AMOLED 13.3\" com 360°",
            "Processador Intel Core i7",
            "S Pen Pro para produtividade",
            "16GB RAM + 1TB SSD",
            "Integração Galaxy ecosystem",
            "Design premium 2-em-1"
        ]
    },
    "13": {
        "name": "Galaxy Buds Core", 
        "category": "acessorios", 
        "color": "Preto", 
        "description": "Sem Fio", 
        "price": format_price_to_cents("R$349,00"), 
        "image": format_image_path("static/images/budscore.webp"),
        "full_description": "Os Galaxy Buds Core oferecem som de qualidade premium a um preço acessível. Drivers de 12mm, cancelamento de ruído ativo, bateria de longa duração e design ergonômico para conforto durante todo o dia.",
        "specs": {
            "drivers": "12mm Dynamic",
            "conectividade": "Bluetooth 5.0",
            "bateria": "6h + 15h case (total 21h)",
            "cancelamento_ruido": "ANC ativo",
            "resistencia": "IPX2",
            "carregamento": "USB-C + Wireless",
            "microfone": "3 microfones por earbud"
        },
        "gallery": [
            format_image_path("static/images/budscore.webp")
        ],
        "features": [
            "Som premium com drivers 12mm",
            "Cancelamento de ruído ativo",
            "Bateria de longa duração",
            "Design ergonômico confortável",
            "Carregamento sem fio",
            "Qualidade de áudio excepcional"
        ]
    },
    "14": {
        "name": "Galaxy Watch8 Classic", 
        "category": "acessorios", 
        "color": "Preto", 
        "description": "Galaxy AI", 
        "price": format_price_to_cents("R$4.499,00"), 
        "image": format_image_path("static/images/Watch8classic.webp"),
        "full_description": "O Galaxy Watch8 Classic é o smartwatch mais avançado da Samsung. Tela AMOLED de 1.5 polegadas, processador Exynos W1000, Galaxy AI integrado e monitoramento de saúde completo. O companheiro perfeito para sua jornada fitness.",
        "specs": {
            "tela": "1.5\" AMOLED 480x480",
            "processador": "Exynos W1000",
            "memoria": "2GB RAM + 32GB",
            "bateria": "425mAh com carregamento rápido",
            "sistema": "Wear OS 5 + One UI Watch",
            "resistencia": "IP68 + 5ATM",
            "conectividade": "Wi-Fi + Bluetooth 5.3 + LTE"
        },
        "gallery": [
            format_image_path("static/images/Watch8classic.webp"),
            format_image_path("static/images/galaxy watch 05 capa.jpg")
        ],
        "videos": [
            format_video_path("static/videos/Galaxy Watch 5 Pro.mp4")
        ],
        "features": [
            "Galaxy AI integrado",
            "Monitoramento de saúde completo",
            "Tela AMOLED 1.5\"",
            "Resistente à água IP68",
            "Bateria de longa duração",
            "Design clássico elegante"
        ]
    },
    "15": {
        "name": "Carregador Sem Fio Duo", 
        "category": "acessorios", 
        "color": "Preto", 
        "description": "Rápido 15W", 
        "price": format_price_to_cents("R$299,00"), 
        "image": format_image_path("static/images/carregadorduo.webp"),
        "full_description": "O Carregador Sem Fio Duo permite carregar dois dispositivos simultaneamente. Carregamento rápido de 15W para smartphones e 5W para fones de ouvido. Design elegante e compacto para sua mesa de trabalho ou cabeceira.",
        "specs": {
            "potencia": "15W + 5W simultâneos",
            "compatibilidade": "Qi + Samsung Wireless",
            "entrada": "USB-C 25W",
            "dimensoes": "120x80x15mm",
            "peso": "200g",
            "led": "Indicador LED de status",
            "seguranca": "Proteção contra sobrecarga"
        },
        "gallery": [
            format_image_path("static/images/carregadorduo.webp")
        ],
        "features": [
            "Carregamento duplo simultâneo",
            "15W rápido para smartphones",
            "5W para fones de ouvido",
            "Design compacto e elegante",
            "Indicador LED de status",
            "Proteção contra sobrecarga"
        ]
    },
    "16": {
        "name": "Capa Smart Book Cover Galaxy Tab S11", 
        "category": "acessorios", 
        "color": "Preto", 
        "description": "Tab Cover", 
        "price": format_price_to_cents("R$499,00"), 
        "image": format_image_path("static/images/s11capa.webp"),
        "full_description": "A Capa Smart Book Cover para Galaxy Tab S11 oferece proteção premium e funcionalidade inteligente. Teclado integrado, trackpad, múltiplos ângulos de visualização e proteção completa para seu tablet.",
        "specs": {
            "compatibilidade": "Galaxy Tab S11",
            "teclado": "Teclado QWERTY completo",
            "trackpad": "Trackpad de precisão",
            "angulos": "Múltiplos ângulos ajustáveis",
            "material": "Poliuretano premium",
            "peso": "450g",
            "conectividade": "Bluetooth 5.0"
        },
        "gallery": [
            format_image_path("static/images/s11capa.webp")
        ],
        "features": [
            "Teclado QWERTY completo",
            "Trackpad de precisão",
            "Múltiplos ângulos de visualização",
            "Proteção premium completa",
            "Design elegante e funcional",
            "Transforma tablet em laptop"
        ]
    }
}


