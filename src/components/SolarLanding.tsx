import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Sun, Phone, MapPin, Clock, Shield, Zap,
  Menu, X, MessageCircle, ChevronRight,
  CheckCircle, ChevronLeft,
} from 'lucide-react'
import milenioLogo from '@/assets/milenio-logo-transparent.png.asset.json'

const PHONE     = '+52 33 1125 9093'
const PHONE_RAW = '523311259093'
const WA_URL    = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent('Hola, quisiera una cotización gratuita de paneles solares.')}`

const HERO_SLIDES = [
  'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1600',
]

const NAV = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Beneficios',href: '#beneficios' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Contacto',  href: '#contacto' },
]

const PRODUCTS = [
  {
    tag: 'Más popular',
    name: 'Paneles Solares Residenciales',
    desc: 'Genera tu propia electricidad desde el techo. Sistemas de 2 kW a 15 kW adaptados al consumo real de tu hogar.',
    features: [
      'Paneles monocristalinos (21 %+ eficiencia)',
      'Inversor incluido',
      'Monitoreo en tiempo real',
      'Instalación en 1–2 días',
      'Gestión con CFE para interconexión',
    ],
    img: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: true,
  },
  {
    tag: 'Ahorro inmediato',
    name: 'Calentadores Solares de Agua',
    desc: 'Agua caliente todo el año sin gastar gas. Funciona con luz solar directa e indirecta. Ideal para casas y negocios.',
    features: [
      'Tubos de vacío de borosilicato',
      'Tanque acero inoxidable',
      'Respaldo eléctrico integrado',
      'Ahorra hasta 80 % en gas LP',
      '5 años de garantía',
    ],
    img: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: false,
  },
  {
    tag: 'Sin apagones',
    name: 'Sistema con Batería de Respaldo',
    desc: 'Almacena la energía de tus paneles y úsala de noche o en cortes de luz. Autonomía personalizable desde 5 kWh.',
    features: [
      'Baterías LiFePO4 (+3 000 ciclos)',
      'Compatible con instalaciones existentes',
      'Gestión inteligente de carga',
      'Para interiores o exteriores',
      'Monitoreo remoto incluido',
    ],
    img: 'https://images.pexels.com/photos/8853494/pexels-photo-8853494.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: false,
  },
  {
    tag: 'Para negocios',
    name: 'Sistemas Comerciales e Industriales',
    desc: 'Reduce costos operativos de tu empresa. Diseño a medida para locales, bodegas, hoteles y clínicas.',
    features: [
      'Diseño personalizado por demanda',
      'Paneles en techo, parking o suelo',
      'ROI en 3–5 años',
      'Incentivos fiscales y financiamiento',
      'Mantenimiento preventivo incluido',
    ],
    img: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: false,
  },
]

const BENEFITS = [
  { icon: Shield, num: '01', title: '5 años de garantía', desc: 'En equipo e instalación. Si algo falla, lo resolvemos sin costos.' },
  { icon: Zap,    num: '02', title: 'Ahorra desde el día 1', desc: 'La mayoría recupera su inversión en menos de 4 años.' },
  { icon: Sun,    num: '03', title: 'Precio de fábrica', desc: 'Sin distribuidores. El ahorro va directo a tu bolsillo.' },
  { icon: Phone,  num: '04', title: 'Servicio local en GDL', desc: 'Equipo local, respuesta rápida y seguimiento real posventa.' },
]

const HOURS = [
  { day: 'Lunes – Viernes', range: '9:00 AM – 7:00 PM', open: true },
  { day: 'Sábado',          range: '9:00 AM – 3:00 PM', open: true },
  { day: 'Domingo',         range: 'Cerrado',            open: false },
]

const ZONES = [
  { name: 'Guadalajara',  desc: 'Centro, Chapalita, Providencia, Oblatos…' },
  { name: 'Zapopan',      desc: 'Andares, Jardines, Santa Anita, Colomos…' },
  { name: 'Tlaquepaque',  desc: 'San Pedro, El Álamo, Las Pintas…' },
  { name: 'Tonalá',       desc: 'Tonalá Centro, San Antonio, Los Jazmines…' },
]

/* ══════════════════════ RESPONSIVE STYLES ══════════════════════ */
const CSS = `
  :root { --pad: 16px; --section: 64px; }
  @media (min-width: 640px)  { :root { --pad: 24px; } }
  @media (min-width: 1024px) { :root { --pad: 32px; --section: 112px; } }

  .desktop-nav  { display: none !important; }
  .mobile-toggle { display: flex !important; }
  .hero-stats   { grid-template-columns: 1fr 1fr; gap: 20px 32px; }
  .bflex        { flex-direction: column; }
  .bflex > *    { position: static !important; }
  .cov-grid     { grid-template-columns: 1fr; }
  .hours-card   { padding: 14px 18px; }
  .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
  .cta-btns     { flex-direction: column; }
  .cta-btns a   { justify-content: center; }

  @media (min-width: 860px) {
    .desktop-nav   { display: flex !important; }
    .mobile-toggle { display: none !important; }
    .hero-stats    { grid-template-columns: repeat(4, auto); }
    .bflex         { flex-direction: row; }
    .cov-grid      { grid-template-columns: 1fr 1fr; }
    .footer-inner  { flex-direction: row; align-items: center; }
    .cta-btns      { flex-direction: row; }
    .cta-btns a    { justify-content: flex-start; }
  }
`

/* ══════════════════════ NAVBAR ══════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const textColor = scrolled ? 'var(--ink-3)' : 'rgba(255,255,255,0.82)'
  const textHover  = scrolled ? 'var(--ink)'   : '#fff'

  return (
    <header style={{
      position: 'fixed', inset: '0 0 auto 0', zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.28s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 var(--pad)',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#inicio" style={{
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>
          <img
            src={milenioLogo.url}
            alt="Nuevo Milenio Calentadores Solares"
            style={{
              height: 52, width: 'auto', display: 'block',
              filter: scrolled ? 'none' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
              transition: 'filter 0.28s',
            }}
          />
        </a>

        {/* Desktop */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: textColor, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = textHover}
              onMouseLeave={e => e.currentTarget.style.color = textColor}
            >{l.label}</a>
          ))}
        </nav>
        <a href={WA_URL} target="_blank" rel="noreferrer" className="desktop-nav"
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'var(--amber)', color: '#fff', fontSize: 13, fontWeight: 600,
            padding: '9px 18px', borderRadius: 6, transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
        >
          <MessageCircle size={14} /> Cotización gratis
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)} className="mobile-toggle"
          style={{ color: scrolled ? 'var(--ink)' : '#fff', padding: 4, display: 'flex', alignItems: 'center' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid var(--line)', padding: '16px var(--pad) 24px' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '13px 0',
              fontSize: 16, fontWeight: 500, color: 'var(--ink-2)',
              borderBottom: '1px solid var(--line)',
            }}>{l.label}</a>
          ))}
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 18,
            background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 15,
            padding: '14px', borderRadius: 8,
          }}>
            <MessageCircle size={17} /> Cotización gratis por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

/* ══════════════════════ HERO ══════════════════════ */
function Hero() {
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setSlide(s => (s + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <section id="inicio" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {HERO_SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Paneles solares"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 35%',
            opacity: slide === i ? 1 : 0,
            transform: slide === i ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 1.4s ease, transform 6s ease-out',
          }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,8,0.60)' }} />

      <div style={{
        position: 'relative', zIndex: 1, width: '100%',
        maxWidth: 1200, margin: '0 auto', padding: 'calc(64px + var(--pad)) var(--pad) 72px',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: 18, animation: 'fadeUp 0.45s ease both',
        }}>
          Guadalajara · Zapopan · Tlaquepaque · Tonalá
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(36px, 8vw, 76px)', color: '#fff',
          lineHeight: 1.06, letterSpacing: '-1.5px', maxWidth: 640,
          marginBottom: 20, animation: 'fadeUp 0.5s 0.06s ease both',
        }}>
          Energía solar.<br />Ahorro real.
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 19px)', color: 'rgba(255,255,255,0.70)',
          maxWidth: 460, lineHeight: 1.7, marginBottom: 36,
          animation: 'fadeUp 0.5s 0.12s ease both',
        }}>
          Instalamos paneles solares y calentadores de agua con 5 años de garantía. Precio de fábrica y financiamiento a 12 meses.
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          animation: 'fadeUp 0.5s 0.18s ease both',
        }}>
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 9,
            background: '#25D366', color: '#fff', fontWeight: 600,
            fontSize: 15, padding: '13px 24px', borderRadius: 7,
            transition: 'filter 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.88)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}
          >
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a href={`tel:${PHONE_RAW}`} style={{
            display: 'flex', alignItems: 'center', gap: 9,
            background: 'rgba(255,255,255,0.10)', color: '#fff', fontWeight: 600,
            fontSize: 15, padding: '13px 24px', borderRadius: 7,
            border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(6px)',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
          >
            <Phone size={17} /> {PHONE}
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero-stats" style={{
          display: 'grid', marginTop: 52, paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.14)',
          animation: 'fadeIn 0.7s 0.3s ease both',
        }}>
          {[
            ['Hasta 80 %', 'ahorro en electricidad'],
            ['5 años',     'de garantía incluida'],
            ['Fin. 12m',   '3, 6 y 12 meses'],
            ['Precio',     'directo de fábrica'],
          ].map(([val, label]) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(17px,3vw,22px)', color: '#fff', letterSpacing: '-0.3px' }}>{val}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', marginTop: 3 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ PRODUCTS CAROUSEL ══════════════════════ */
function Products() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
    setActive(idx)
  }, [])

  const prev = () => scrollTo(Math.max(0, active - 1))
  const next = () => scrollTo(Math.min(PRODUCTS.length - 1, active + 1))

  // Sync dots on native scroll (touch)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const cards = Array.from(track.children) as HTMLElement[]
        let closest = 0, minDist = Infinity
        cards.forEach((c, i) => {
          const dist = Math.abs(c.offsetLeft - track.scrollLeft - 16)
          if (dist < minDist) { minDist = dist; closest = i }
        })
        setActive(closest)
      }, 80)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => { track.removeEventListener('scroll', onScroll); clearTimeout(timer) }
  }, [])

  return (
    <section id="productos" style={{ padding: 'var(--section) 0', background: '#fff', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--pad)', marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 10 }}>
              Catálogo
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(26px,5vw,42px)', color: 'var(--ink)',
              lineHeight: 1.1, letterSpacing: '-0.6px',
            }}>Lo que instalamos</h2>
          </div>
          {/* Arrow controls — visible on ≥860 */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 8 }}>
            <ArrowBtn dir="prev" onClick={prev} disabled={active === 0} />
            <ArrowBtn dir="next" onClick={next} disabled={active === PRODUCTS.length - 1} />
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="no-scrollbar"
        style={{
          display: 'flex', gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          padding: '0 var(--pad) 4px',
          cursor: 'grab',
        }}
        onMouseDown={e => { e.currentTarget.style.cursor = 'grabbing' }}
        onMouseUp={e => { e.currentTarget.style.cursor = 'grab' }}
        onMouseLeave={e => { e.currentTarget.style.cursor = 'grab' }}
      >
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.name} product={p} index={i} total={PRODUCTS.length} />
        ))}
        {/* Trailing spacer so last card doesn't cut off */}
        <div style={{ minWidth: 4, flexShrink: 0 }} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24, padding: '0 var(--pad)' }}>
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: active === i ? 20 : 7, height: 7, borderRadius: 4,
              background: active === i ? 'var(--amber)' : 'var(--bg-3)',
              transition: 'width 0.25s, background 0.25s',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}

function ArrowBtn({ dir, onClick, disabled }: { dir: 'prev' | 'next', onClick: () => void, disabled: boolean }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 8,
      border: '1px solid var(--line)', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: disabled ? 'var(--ink-4)' : 'var(--ink)',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'background 0.15s, border-color 0.15s',
    }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--ink-4)' } }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--line)' }}
    >
      {dir === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  )
}

function ProductCard({ product: p, index, total }: { product: typeof PRODUCTS[0], index: number, total: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        scrollSnapAlign: 'start',
        flexShrink: 0,
        // 85 vw on mobile, fixed 300px on larger screens
        width: 'min(85vw, 300px)',
        background: '#fff',
        border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'box-shadow 0.22s, transform 0.22s',
      }}
    >
      {/* Image */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img src={p.img} alt={p.name} loading={index < 2 ? 'eager' : 'lazy'}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: p.highlight ? 'var(--amber)' : 'rgba(12,12,10,0.65)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.8px', textTransform: 'uppercase',
          padding: '4px 9px', borderRadius: 4,
        }}>{p.tag}</span>
        <span style={{
          position: 'absolute', bottom: 10, right: 12,
          fontSize: 10, color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
        }}>{index + 1} / {total}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
          color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3,
        }}>{p.name}</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>

        <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20, flex: 1 }}>
          {p.features.map(f => (
            <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <CheckCircle size={13} color="var(--amber)" style={{ flexShrink: 0, marginTop: 3 }} />
              <span style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{f}</span>
            </li>
          ))}
        </ul>

        <a href={WA_URL} target="_blank" rel="noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 14px', borderRadius: 8,
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          fontSize: 13, fontWeight: 600, color: 'var(--ink)',
          transition: 'background 0.15s, border-color 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber-light)'; e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--amber-dark)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink)' }}
        >
          Cotizar <ChevronRight size={14} />
        </a>
      </div>
    </div>
  )
}

/* ══════════════════════ BENEFITS ══════════════════════ */
function Benefits() {
  return (
    <section id="beneficios" style={{ padding: 'var(--section) var(--pad)', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="bflex" style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>

          {/* Left */}
          <div style={{ flex: '0 0 auto', maxWidth: 380 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 12 }}>
              Por qué nosotros
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(26px,4vw,40px)', color: 'var(--ink)',
              lineHeight: 1.1, letterSpacing: '-0.6px', marginBottom: 16,
            }}>
              Sin letra chica.<br />Sin sorpresas.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: 28 }}>
              Empresa local con experiencia en la zona metropolitana de Guadalajara. Vendemos, instalamos y damos soporte.
            </p>
            <a href={WA_URL} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--amber)', color: '#fff',
              fontWeight: 600, fontSize: 14, padding: '12px 22px', borderRadius: 7,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
            >
              <MessageCircle size={16} /> Escríbenos ahora
            </a>
          </div>

          {/* Right */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {BENEFITS.map((item, i) => (
              <div key={item.num} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '26px 0',
                borderBottom: i < BENEFITS.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12,
                  color: 'var(--ink-4)', letterSpacing: '1px', minWidth: 24, paddingTop: 2,
                }}>{item.num}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--ink)', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ COVERAGE ══════════════════════ */
function Coverage() {
  return (
    <section id="cobertura" style={{ padding: 'var(--section) var(--pad)', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="cov-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>

          {/* Left */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 12 }}>
              Cobertura
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(26px,4vw,40px)', color: 'var(--ink)',
              lineHeight: 1.1, letterSpacing: '-0.6px', marginBottom: 14,
            }}>
              Zona Metropolitana<br />de Guadalajara
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: 32 }}>
              Visita técnica gratuita para evaluar tu instalación, sin compromiso.
            </p>

            <div>
              {ZONES.map((z, i) => (
                <div key={z.name} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '16px 0',
                  borderBottom: i < ZONES.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'var(--amber-light)', border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <MapPin size={15} color="var(--amber)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 2 }}>{z.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-4)' }}>{z.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-md)',
            height: 400,
          }}>
            <iframe
              title="Zona Metropolitana de Guadalajara"
              src="https://maps.google.com/maps?q=Guadalajara+Jalisco+Mexico&output=embed&z=11&hl=es"
              width="100%" height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ HOURS ══════════════════════ */
function Hours() {
  return (
    <section style={{ padding: 'calc(var(--section) * 0.7) var(--pad)', background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, background: 'var(--amber-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        }}>
          <Clock size={20} color="var(--amber)" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--ink)', marginBottom: 6 }}>Horario de atención</h2>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 28 }}>Estamos listos para atenderte</p>

        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--line)', overflow: 'hidden' }}>
          {HOURS.map((h, i) => (
            <div key={h.day} className="hours-card" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 24px',
              borderBottom: i < HOURS.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--ink-2)' }}>{h.day}</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: h.open ? 'var(--ink)' : 'var(--ink-4)' }}>{h.range}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ CONTACT ══════════════════════ */
function Contact() {
  return (
    <section id="contacto" style={{ padding: 'var(--section) var(--pad)', background: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 14 }}>Contacto</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(26px,5vw,48px)', color: 'var(--ink)',
          lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 16,
        }}>
          Tu cotización es gratis.<br />Sin compromiso.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-3)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 40px' }}>
          Cuéntanos tu caso y en minutos te enviamos una propuesta con el ahorro estimado y costo de instalación.
        </p>

        <div className="cta-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 16,
            padding: '15px 28px', borderRadius: 8, flex: '1 1 auto',
            transition: 'filter 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}
          >
            <MessageCircle size={19} /> Escribir por WhatsApp
          </a>
          <a href={`tel:${PHONE_RAW}`} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--bg-2)', color: 'var(--ink)', fontWeight: 700, fontSize: 16,
            padding: '15px 28px', borderRadius: 8, flex: '1 1 auto',
            border: '1px solid var(--line)', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
          >
            <Phone size={19} /> {PHONE}
          </a>
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink-4)' }}>
          Lun–Vie 9:00–19:00 &nbsp;·&nbsp; Sáb 9:00–15:00
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════ FOOTER ══════════════════════ */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.42)', padding: '32px var(--pad)' }}>
      <div className="footer-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, background: 'var(--amber)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sun size={16} color="#fff" strokeWidth={2.2} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#fff' }}>
            Solar<span style={{ color: 'var(--amber)' }}>GDL</span>
          </span>
        </div>
        <p style={{ fontSize: 12 }}>Paneles y Calentadores Solares · Guadalajara, Jalisco</p>
        <a href={`tel:${PHONE_RAW}`} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
        >
          <Phone size={13} /> {PHONE}
        </a>
      </div>
    </footer>
  )
}

/* ══════════════════════ WhatsApp FAB ══════════════════════ */
function WhatsAppFAB() {
  return (
    <a href={WA_URL} target="_blank" rel="noreferrer"
      title="WhatsApp"
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 999,
        width: 52, height: 52, borderRadius: '50%',
        background: '#25D366', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <MessageCircle size={24} />
    </a>
  )
}

/* ══════════════════════ APP ══════════════════════ */
export default function SolarLanding() {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Benefits />
        <Coverage />
        <Hours />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
