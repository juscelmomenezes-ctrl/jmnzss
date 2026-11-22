import { useMemo, useState } from 'react';
import { Search, ShoppingBag, Menu, X, Plus, Minus, Trash2, ArrowRight, Heart, PawPrint, ShieldCheck, Truck, Headphones, Instagram, Facebook, MessageCircle, ChevronDown, Star } from 'lucide-react';

const products = [
  { id: 1, name: 'Ração Premium Adulto', category: 'Cães', detail: 'Nutrição completa · 3 kg', price: 12500, oldPrice: 15000, tag: 'Mais vendido', emoji: '🥣', tone: 'sand' },
  { id: 2, name: 'Cama Cozy Cloud', category: 'Cães', detail: 'Conforto extra · Tamanho M', price: 18900, emoji: '🛏️', tone: 'pink' },
  { id: 3, name: 'Arranhador Natural', category: 'Gatos', detail: 'Sisal resistente · 45 cm', price: 22000, emoji: '🐈', tag: 'Favorito', tone: 'sage' },
  { id: 4, name: 'Brinquedo Mordedor', category: 'Cães', detail: 'Borracha resistente · 1 un.', price: 4500, emoji: '🦴', tone: 'yellow' },
  { id: 5, name: 'Areia Higiénica', category: 'Gatos', detail: 'Controlo de odores · 5 kg', price: 7800, emoji: '🐾', tone: 'blue' },
  { id: 6, name: 'Kit Passeio', category: 'Acessórios', detail: 'Trela + coleira ajustável', price: 14500, oldPrice: 17000, tag: 'Poupe 15%', emoji: '🦮', tone: 'lavender' },
  { id: 7, name: 'Snack Natural', category: 'Cães', detail: 'Ingredientes selecionados · 100 g', price: 3900, emoji: '🦴', tone: 'peach' },
  { id: 8, name: 'Transportadora Air', category: 'Acessórios', detail: 'Ventilada · Tamanho M', price: 28500, emoji: '🧳', tone: 'mint' },
];

const categories = ['Todos', 'Cães', 'Gatos', 'Acessórios'];
const money = value => new Intl.NumberFormat('pt-AO', { maximumFractionDigits: 0 }).format(value) + ' Kz';

export default function App() {
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');

  const visibleProducts = useMemo(() => products.filter(p =>
    (category === 'Todos' || p.category === category) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.detail.toLowerCase().includes(query.toLowerCase()))
  ), [category, query]);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }];
    });
    setNotice(product.name + ' adicionado ao carrinho');
    window.setTimeout(() => setNotice(''), 2200);
  }
  function changeQty(id, amount) {
    setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0));
  }
  function checkout() {
    const phone = ''; // Coloca aqui o WhatsApp da loja, com indicativo do país e sem o sinal +.
    if (!phone) {
      setNotice('Configura o número de WhatsApp da loja em src/App.jsx para receber encomendas.');
      return;
    }
    const lines = cart.map(item => item.qty + 'x ' + item.name + ' — ' + money(item.price * item.qty));
    const message = 'Olá! Quero fazer esta encomenda:\n' + lines.join('\n') + '\nTotal: ' + money(total);
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="site-shell">
      <div className="announcement"><span>🐾</span> O melhor para eles, com carinho em cada detalhe <span className="announcement-link">Descobre a loja <ArrowRight size={13}/></span></div>
      <header className="header">
        <button className="mobile-menu icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu">{mobileMenu ? <X/> : <Menu/>}</button>
        <a className="brand" href="#inicio"><span className="brand-mark"><PawPrint size={23}/></span><span>casa<span className="brand-accent">pet</span><small>O MUNDO DELES</small></span></a>
        <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
          <a href="#inicio" onClick={() => setMobileMenu(false)}>Início</a>
          <a href="#loja" onClick={() => setMobileMenu(false)}>Loja</a>
          <a href="#sobre" onClick={() => setMobileMenu(false)}>A nossa essência</a>
          <a href="#contacto" onClick={() => setMobileMenu(false)}>Contactos</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={17}/><input value={query} onChange={e => {setQuery(e.target.value); document.getElementById('loja')?.scrollIntoView({behavior:'smooth'});}} placeholder="O que procuras?"/></label>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho"><ShoppingBag size={19}/><span>O teu saco</span><b>{count}</b></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> MAIS AMOR. MAIS CUIDADO.</div>
            <h1>Pequenos detalhes.<br/><em>Grandes momentos.</em></h1>
            <p>Tudo o que o teu melhor amigo precisa para viver uma vida feliz, saudável e cheia de brincadeira.</p>
            <div className="hero-actions"><a className="primary-button" href="#loja">Explorar produtos <ArrowRight size={17}/></a><a className="text-link" href="#sobre">Conhece a CasaPet</a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>🐶</span><span>🐱</span><span>🐰</span></div><div><div className="stars">★★★★★</div><small>Feito a pensar neles, sempre.</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image"><img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1100&q=85" alt="Cão feliz a olhar para a câmara"/></div>
            <div className="floating-note"><span className="note-icon">♡</span><div><strong>Amor em cada escolha</strong><small>Porque eles merecem o melhor</small></div></div>
            <div className="hero-sticker">PET<br/>LOVERS<br/><span>EST. 2026</span></div>
          </div>
          <div className="hero-bottom-label">01 — CUIDAR É AMAR</div>
        </section>

        <section className="benefits">
          <div><span className="benefit-icon"><Truck/></span><p><strong>Entrega conveniente</strong><small>Recebe onde estiveres</small></p></div>
          <div><span className="benefit-icon"><ShieldCheck/></span><p><strong>Escolhas de confiança</strong><small>Qualidade em primeiro lugar</small></p></div>
          <div><span className="benefit-icon"><Heart/></span><p><strong>Feito com carinho</strong><small>Para todos os patudos</small></p></div>
          <div><span className="benefit-icon"><Headphones/></span><p><strong>Estamos aqui</strong><small>Ajuda sempre que precisares</small></p></div>
        </section>

        <section className="shop-section" id="loja">
          <div className="section-heading"><div><div className="eyebrow"><span></span> A NOSSA SELEÇÃO</div><h2>Os favoritos <em>deles.</em></h2><p>Produtos escolhidos para cuidar, mimar e surpreender.</p></div><a className="view-all" href="#loja">Ver coleção <ArrowRight size={16}/></a></div>
          <div className="category-row">{categories.map(item => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="product-grid">
            {visibleProducts.map(product => <article className="product-card" key={product.id}>
              <div className={'product-art ' + product.tone}><span className="product-emoji">{product.emoji}</span>{product.tag && <span className="product-tag">{product.tag}</span>}<button className="favorite" aria-label="Adicionar aos favoritos" onClick={() => setNotice('Funcionalidade de favoritos em preparação.')}><Heart size={17}/></button></div>
              <div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.detail}</p><div className="product-bottom"><div><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><button className="add-button" onClick={() => addToCart(product)} aria-label={'Adicionar ' + product.name}><Plus size={19}/></button></div></div>
            </article>)}
          </div>
          {visibleProducts.length === 0 && <div className="empty-search">Não encontrámos produtos. Experimenta outra pesquisa.</div>}
        </section>

        <section className="story" id="sobre"><div className="story-photo"><img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85" alt="Pessoa a acariciar o seu cão"/></div><div className="story-copy"><div className="eyebrow"><span></span> MAIS DO QUE UMA LOJA</div><h2>Eles não são<br/>só animais. São <em>família.</em></h2><p>Acreditamos que cada patudo merece cuidado, conforto e momentos felizes. Por isso, reunimos produtos que ajudam a tornar cada dia ainda melhor.</p><a className="primary-button" href="#loja">Encontra os favoritos <ArrowRight size={17}/></a><div className="story-signature">Com carinho, <strong>equipa CasaPet ♡</strong></div></div></section>

        <section className="newsletter"><div><span className="newsletter-icon">✳</span><h2>Um mimo para o teu patudo?</h2><p>Segue a CasaPet para novidades, dicas e produtos especiais.</p></div><a className="newsletter-button" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={18}/> Segue-nos no Instagram <ArrowRight size={16}/></a></section>
      </main>

      <footer id="contacto"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#inicio"><span className="brand-mark"><PawPrint size={23}/></span><span>casa<span className="brand-accent">pet</span><small>O MUNDO DELES</small></span></a><p>Mais carinho, cuidado e felicidade<br/>em cada patinha.</p></div><div><h4>Explorar</h4><a href="#loja">Todos os produtos</a><a href="#loja">Cães</a><a href="#loja">Gatos</a><a href="#loja">Acessórios</a></div><div><h4>Ajuda</h4><a href="#contacto">Entregas e encomendas</a><a href="#contacto">Perguntas frequentes</a><a href="#contacto">Fala connosco</a></div><div><h4>Fica por perto</h4><p className="footer-muted">Acompanha as novidades da CasaPet.</p><div className="socials"><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram/></a><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook/></a><a href="https://wa.me/" aria-label="WhatsApp"><MessageCircle/></a></div></div></div><div className="footer-bottom"><span>© 2026 CasaPet. Todos os direitos reservados.</span><span>Feito com <Heart size={13}/> para quem tem patinhas.</span></div></footer>

      {notice && <div className="toast"><PawPrint size={17}/>{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">A TUA SELEÇÃO</span><h2>O teu saco <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div>
        {cart.length === 0 ? <div className="cart-empty"><span>🐾</span><h3>O saco está à espera.</h3><p>Adiciona os favoritos do teu patudo e eles aparecem aqui.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Continuar a explorar</button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><div className={'cart-item-art ' + item.tone}>{item.emoji}</div><div className="cart-item-info"><strong>{item.name}</strong><small>{money(item.price)}</small><div className="qty-control"><button onClick={() => changeQty(item.id, -1)} aria-label="Diminuir"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)} aria-label="Aumentar"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(current => current.filter(p => p.id !== item.id))} aria-label="Remover"><Trash2 size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(total)}</strong></div><small>O custo de entrega será confirmado no contacto.</small><button className="primary-button checkout-button" onClick={checkout}>Encomendar pelo WhatsApp <ArrowRight size={17}/></button></div></>}
      </aside></div>}
      <a className="whatsapp-float" href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={23}/></a>
    </div>
  );
}