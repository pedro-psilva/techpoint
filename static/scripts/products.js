// products.js - catálogo e carregamento dinâmico por parâmetro ?product=
(function(){
  const samsungMediaLibrary = 'https://news.samsung.com/medialibrary/global';

  const products = {
    'galaxy-s25-ultra': {
      title: 'Galaxy S25 Ultra',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho',
      // Mídias locais detectadas na pasta assets
      videoPoster: './assets/images/galaxy-s25-ultra.jpg',
      images: [
        './assets/images/galaxy-s25-ultra.jpg',
        './assets/images/galaxy-s25-ultra-1.jpg'
      ],
      videos: [
        './assets/videos/galaxy-s25-ultra-features-highlights-galaxy-ai.webm',
        './assets/videos/galaxy-s25-ultra-features-ai-overview.webm'
      ]
    },
    'galaxy-s25': {
      title: 'Galaxy S25',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-z-flip7': {
      title: 'Galaxy Z Flip7',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-z-fold7': {
      title: 'Galaxy Z Fold7',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-tab-s11': {
      title: 'Galaxy Tab S11',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-tab-s11-ultra': {
      title: 'Galaxy Tab S11 Ultra',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-tab-s10-fe': {
      title: 'Galaxy Tab S10 FE',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-tab-a9-plus-5g': {
      title: 'Galaxy Tab A9+ 5G',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-book4-pro': {
      title: 'Galaxy Book4 Pro',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-book4-ultra': {
      title: 'Galaxy Book4 Ultra',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-book3-360': {
      title: 'Galaxy Book3 360',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-book4-360': {
      title: 'Galaxy Book4 360',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-buds-core': {
      title: 'Galaxy Buds Core',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'galaxy-watch8-classic': {
      title: 'Galaxy Watch8 Classic',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'carregador-sem-fio-duo-15w': {
      title: 'Carregador Sem Fio Duo 15W',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    },
    'capa-smart-book-cover-tab-s11': {
      title: 'Capa Smart Book Cover Tab S11',
      heroLink: samsungMediaLibrary,
      buyUrl: '#comprar',
      addToCartUrl: '#carrinho'
    }
  };

  function getProductSlug(){
    const params = new URLSearchParams(window.location.search);
    return params.get('product') || 'galaxy-s25-ultra';
  }

  function applyProduct(){
    const slug = getProductSlug();
    const p = products[slug];
    if(!p){ return; }
    // Título/heading principal (exemplo: substituir o headline atual no template)
    const titleEl = document.querySelector('title');
    if(titleEl){ titleEl.textContent = p.title + ' | TechPoint'; }

    // Cabeçalho simples com logo central (sempre visível)
    let header = document.getElementById('product-header');
    if(!header){
      header = document.createElement('header');
      header.id = 'product-header';
      header.style.cssText = 'width:100%;background:#fff;position:fixed;top:0;left:0;z-index:1000;border-bottom:1px solid #eee;';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'max-width:1200px;margin:0 auto;padding:12px 16px;display:flex;align-items:center;justify-content:center;gap:12px;';
      const menuBtn = document.createElement('button');
      menuBtn.type = 'button';
      menuBtn.textContent = 'Menu';
      menuBtn.style.cssText = 'position:absolute;left:12px;background:#111;color:#fff;border:0;border-radius:4px;padding:6px 10px;cursor:pointer;';
      const link = document.createElement('a');
      link.href = '#';
      const logo = document.createElement('img');
      logo.src = './assets/brand/techpoint-preto.svg';
      logo.alt = 'TechPoint';
      logo.style.cssText = 'height:28px;display:block;';
      wrap.appendChild(menuBtn);
      link.appendChild(logo);
      wrap.appendChild(link);
      header.appendChild(wrap);
      document.body.prepend(header);
      // compensar header fixo e garantir fundo (sem espaçador)
      document.body.style.margin = '0';
      document.body.style.background = '#fff';

      // Sidebar provisória
      let sidebar = document.getElementById('product-sidebar');
      if(!sidebar){
        sidebar = document.createElement('aside');
        sidebar.id = 'product-sidebar';
        sidebar.style.cssText = 'position:fixed;top:' + header.getBoundingClientRect().height + 'px;left:0;width:240px;height:calc(100% - ' + header.getBoundingClientRect().height + 'px);background:#f7f7f8;border-right:1px solid #eee;box-shadow:0 0 12px rgba(0,0,0,.04);padding:12px;overflow:auto;display:none;z-index:900;';
        sidebar.innerHTML = '<strong style="display:block;margin:4px 0 8px">Categorias</strong>\
<ul style="list-style:none;margin:0;padding:0;display:grid;gap:6px">\
  <li><a href="?product=galaxy-s25-ultra">Smartphones</a></li>\
  <li><a href="?product=galaxy-tab-s11">Tablets</a></li>\
  <li><a href="?product=galaxy-book4-pro">Notebooks</a></li>\
  <li><a href="?product=galaxy-buds-core">Acessórios</a></li>\
</ul>';
        document.body.appendChild(sidebar);
      }
      menuBtn.addEventListener('click', () => {
        const sb = document.getElementById('product-sidebar');
        if(!sb) return;
        const visible = sb.style.display !== 'none';
        sb.style.display = visible ? 'none' : 'block';
      });
    }

    // Ajuste de botões: comprar e adicionar ao carrinho
    document.querySelectorAll('[type="changeModel"], [type="buyNow"]').forEach(btn => {
      btn.setAttribute('type','buyNow');
      btn.setAttribute('href', p.buyUrl);
      btn.setAttribute('variant','primary');
      btn.textContent = 'Comprar agora';
    });
    document.querySelectorAll('[type="finder"], [type="addToCart"]').forEach(btn => {
      btn.setAttribute('type','addToCart');
      btn.setAttribute('href', p.addToCartUrl);
      btn.setAttribute('variant','secondary');
      btn.textContent = 'Adicionar ao Carrinho';
    });

    // Remoção de "Configurar"
    document.querySelectorAll('[type="configure"]').forEach(el => el.remove());

    // Hero local (se disponível): insere um banner simples com vídeo ou imagem
    const mainEl = document.querySelector('main#main') || document.body;
    if(mainEl){
      // desloca o conteúdo para não ficar sob o header fixo, sem criar um bloco vazio separado
      const headerEl = document.getElementById('product-header');
      if(headerEl){
        const h = headerEl.getBoundingClientRect().height;
        mainEl.style.marginTop = h + 'px';
      }
      let hero = document.getElementById('product-hero');
      if(!hero){
        hero = document.createElement('section');
        hero.id = 'product-hero';
        hero.style.cssText = 'position:relative;overflow:hidden;background:transparent;margin:0;padding:0;';
        mainEl.prepend(hero);
      } else {
        hero.innerHTML = '';
      }
      if (Array.isArray(p.videos) && p.videos.length){
        const v = document.createElement('video');
        v.setAttribute('playsinline','');
        v.setAttribute('muted','');
        v.setAttribute('autoplay','');
        v.setAttribute('loop','');
        if(p.videoPoster){ v.setAttribute('poster', p.videoPoster); }
        v.style.cssText = 'width:100%;height:auto;display:block;';
        p.videos.forEach(url => {
          const s = document.createElement('source');
          s.src = url;
          s.type = url.endsWith('.webm') ? 'video/webm' : 'video/mp4';
          v.appendChild(s);
        });
        v.onerror = () => { v.remove(); renderFallbackImage(); };
        hero.appendChild(v);
      } else if (Array.isArray(p.images) && p.images.length){
        const img = document.createElement('img');
        img.src = p.images[0];
        img.alt = p.title;
        img.style.cssText = 'width:100%;height:auto;display:block;';
        hero.appendChild(img);
      }
      // (Removido) CTA overlay sobre o herói a pedido do cliente
    }

    // Remover blocos da página original que geram espaços vazios
    document.querySelectorAll('pcom-module-wrapper, phn-header, pnav-footer').forEach(el => el.remove());
    // Remover referências da Porsche (links/scripts/metas externas)
    document.querySelectorAll('link[href*="cdn.ui.porsche.com"], script[src*="cdn.ui.porsche.com"], link[href*="assets-v2.porsche.com"], script[src*="assets-v2.porsche.com"], link[href*="nav.porsche.com"], script[src*="nav.porsche.com"]').forEach(el => el.remove());
    document.querySelectorAll('meta[property^="og:"], meta[property^="twitter:"], link[rel="canonical"]').forEach(el => el.remove());

    // Reconstruir corpo mínimo (header fixo + main) para eliminar qualquer espaço/imagem residual
    (function normalizeBody(){
      const headerEl = document.getElementById('product-header');
      const body = document.body;
      if(!body) return;
      // Cria novo main
      const newMain = document.createElement('main');
      newMain.id = 'main';
      newMain.style.margin = '0';
      newMain.style.padding = '0';
      // Limpa body preservando apenas header
      body.innerHTML = '';
      if(headerEl){ body.appendChild(headerEl); }
      body.appendChild(newMain);
      // Ajusta deslocamento do main para o header fixo
      if(headerEl){
        const h = headerEl.getBoundingClientRect().height;
        newMain.style.marginTop = h + 'px';
      }
    })();
    // Garantir que a área principal não tenha padding/margem extras
    const mainTag = document.querySelector('main#main');
    if(mainTag){
      mainTag.style.margin = '0';
      mainTag.style.padding = '0';
    }

    // Link para acervo Samsung (mantém como referência em links de mosaico)
    const heroLinks = document.querySelectorAll('mosaic-editorial a');
    heroLinks.forEach(a => { a.setAttribute('href', p.heroLink); a.setAttribute('target','_blank'); });

    // Logos e favicons locais
    const head = document.querySelector('head');
    if(head){
      // Favicons
      function setOrReplace(selector, rel, href, attrs){
        let el = head.querySelector(selector);
        if(!el){ el = document.createElement('link'); head.appendChild(el); }
        el.setAttribute('rel', rel);
        el.setAttribute('href', href);
        if(attrs){ Object.entries(attrs).forEach(([k,v])=> el.setAttribute(k,v)); }
      }
      setOrReplace('link[rel="icon"][sizes="any"]','icon','./assets/favicons/favicon.ico');
      setOrReplace('link[rel="icon"][type="image/png"][sizes="32x32"]','icon','./assets/favicons/favicon-32x32.png',{type:'image/png',sizes:'32x32'});
      setOrReplace('link[rel="apple-touch-icon"]','apple-touch-icon','./assets/favicons/apple-touch-icon.png');
      setOrReplace('link[rel="manifest"]','manifest','./assets/favicons/site.webmanifest');
      const msTile = head.querySelector('meta[name="msapplication-TileImage"]');
      if(msTile){ msTile.setAttribute('content','./assets/favicons/mstile-270x270.png'); }
    }

    // Logo (exemplo no footer/header caso haja img[src*="porsche"])
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if(src.includes('porsche') || src.includes('model-signature')){
        img.setAttribute('src','./assets/brand/techpoint-branco.svg');
        img.setAttribute('alt','TechPoint');
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyProduct);
  } else {
    applyProduct();
  }
})();
