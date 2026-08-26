'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Sprout,
  Leaf,
  BookOpen,
  Users,
  Download,
  ArrowRight,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  FileText,
  Loader2,
  Play,
  Globe2,
} from 'lucide-react';

// ---------- Tracking helpers ----------
const trackEvent = async (eventName, metadata = {}) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, metadata);
    }
  } catch (e) {}
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, metadata);
    }
  } catch (e) {}
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, metadata }),
    });
  } catch (e) {}
};

// ---------- Reveal-on-scroll hook ----------
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

// ---------- Decorative leaf SVG ----------
const LeafShape = ({ className = '', opacity = 0.6 }) => (
  <svg
    viewBox="0 0 200 220"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g fill="currentColor" opacity={opacity}>
      <path d="M100,5 C115,40 145,50 165,80 C185,115 175,150 145,170 C125,182 105,180 100,178 C95,180 75,182 55,170 C25,150 15,115 35,80 C55,50 85,40 100,5 Z" />
    </g>
  </svg>
);

// ---------- Smooth scroll ----------
const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5511995400117?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20campanha%20Cultivar%20%26%20Guardar."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar pelo WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
  >
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" fill="currentColor">
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.09 0C5.55 0 .23 5.32.23 11.86c0 2.09.55 4.13 1.59 5.93L.13 24l6.36-1.67a11.85 11.85 0 0 0 5.6 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.44-8.41ZM12.1 21.7h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.83 9.83 0 0 1-1.51-5.19C2.21 6.43 6.64 2 12.09 2a9.8 9.8 0 0 1 6.98 2.9 9.84 9.84 0 0 1 2.89 7c0 5.41-4.45 9.8-9.86 9.8Zm5.39-7.35c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  </a>
);

// ---------- Constants ----------
// PARA ATIVAR O V\u00cdDEO: substitua null pelo ID do v\u00eddeo do YouTube
// Ex: const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';
// Voc\u00ea pega o ID na URL: https://www.youtube.com/watch?v=ESSE_AQUI
const YOUTUBE_VIDEO_ID = 'CyPEvgzoM24';

// Imagem poster (usada quando ainda n\u00e3o h\u00e1 v\u00eddeo)
const CLIMATE_POSTER_IMAGE =
  'https://images.unsplash.com/photo-1624324378932-68e20f332982?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxjbGltYXRlJTIwY2hhbmdlfGVufDB8fHx8MTc3ODA4OTM3MXww&ixlib=rb-4.1.0&q=85';

const PDF_LINKS = {
  pdf2: { url: '/pdfs/devocional_tempo_de_cuidar.pdf', title: 'Devocional tempo de cuidar', size: '1.1 MB', pages: '34 paginas' },
  pdf3: { url: '/pdfs/estudo_biblico_tempo_de_cuidar.pdf', title: 'Estudo biblico tempo de cuidar', size: '3.8 MB', pages: '29 paginas' },
  pdf4: { url: '/pdfs/cartilha_de_orientacao_tempo_de_cuidar.pdf', title: 'Cartilha de orientacao tempo de cuidar', size: '4.8 MB', pages: '20 paginas' },
   pdf1: { url: '/pdfs/manual_de_práticas_sustentáveis_para igrejas.pdf', title: 'Manual de práticas sustentáveis para igrejas', size: '58.2 MB', pages: '52 paginas' },
};

const MONDAY_FORM_URL =
  'https://forms.monday.com/forms/embed/9989f9e49933844e6d3ad906b33a62af?r=use1';

// =================================================================
// HERO
// =================================================================
const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen w-full overflow-hidden texture-olive flex items-center"
  >
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 gradient-radial" />
    </div>

    {/* Top bar */}
    <div className="absolute top-0 inset-x-0 z-20 px-6 md:px-12 pt-6 md:pt-8 flex justify-between items-center">
      <div className="flex items-center gap-4 md:gap-6">
        <img
          src="/logos/soma.png"
          alt="Soma+"
          className="logo-blend h-10 md:h-16 w-auto"
        />
      
      </div>
      <div className="hidden md:flex items-center gap-8 text-cream-100/80 text-xs uppercase tracking-[0.2em] font-pixel">
        <button onClick={() => smoothScrollTo('quem-somos')} className="hover:text-cream-100 transition">
          Quem somos
        </button>
        <button onClick={() => smoothScrollTo('formulario')} className="hover:text-cream-100 transition">
          Inscri&ccedil;&otilde;es
        </button>
      </div>
    </div>

    <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-cream-100/20 rounded-full text-cream-100/80 text-xs uppercase tracking-[0.25em] font-pixel animate-fade-in">
          <Sparkles className="w-3 h-3" />
          <span>Cultivar &amp; Guardar &middot; 2025</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-cream-100 mb-8 text-balance animate-fade-in-up">
          <span className="font-gothic block">Cultivar</span>
          <span className="italic font-light">&amp; Guardar</span>
          <br />
          <span className="text-cream-200/70 italic font-light text-3xl md:text-5xl lg:text-6xl">
            a cria&ccedil;&atilde;o.
          </span>
        </h1>

        <p
          className="font-serif text-lg md:text-2xl text-cream-100/80 max-w-2xl mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Em tempos de crise climática estamos nos reunindo como povo de Deus
          para nos lembrar que Cultivar e Guardar a Criação de Deus é um mandamento.
          Durante 31 dias vamos nos dedicar a refletir sobre o papel do crente em desenvolver a terra de modo que agrade a Deus. Assista o vídeo para conhecer mais a campanha!

        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
        
        
          <button
            onClick={() => {
              trackEvent('cta_form_clicked', { source: 'hero_primary' });
              smoothScrollTo('formulario');
            }}
            className="btn-premium bg-cream-100 text-olive-900 hover:bg-cream-50 hover:scale-[1.02] hover:shadow-2xl"
          >
            Inscreva-se
            <ArrowRight className="w-4 h-4" />
          </button>
				
          <button
            onClick={() => {
              trackEvent('cta_about_clicked', { source: 'hero_secondary' });
              smoothScrollTo('quem-somos');
            }}
            className="btn-premium-ghost"
          >
            Quem Somos
          </button>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl border-t border-cream-100/15 pt-8">
          
        </div>
      </div>
    </div>

    <button
      onClick={() => smoothScrollTo('quem-somos')}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-cream-100/50 hover:text-cream-100 transition animate-subtle-float"
      aria-label="Rolar para baixo"
    >
      <ChevronDown className="w-6 h-6" />
    </button>
  </section>
);

// =================================================================
// CLIMATE / VIDEO SECTION
// =================================================================
const ClimateSection = () => {
  const ref = useReveal();
  const [videoStarted, setVideoStarted] = useState(false);

  const hasVideo = !!YOUTUBE_VIDEO_ID;

  const handlePlay = () => {
    trackEvent('climate_video_play', { videoId: YOUTUBE_VIDEO_ID || 'placeholder' });
    if (hasVideo) {
      setVideoStarted(true);
    }
  };

  return (
    <section
      id="clima"
      className="relative texture-paper texture-botanic-accent py-24 md:py-36 overflow-hidden"
    >
      <div ref={ref} className="scroll-reveal container mx-auto px-6 md:px-12 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-6 text-olive-700 text-xs uppercase tracking-[0.25em] font-pixel">
            <Globe2 className="w-3 h-3" />
            <span>O cen&aacute;rio</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-olive-900 mb-6 text-balance">
            <span className="font-gothic">O clima</span>{' '}
            <span className="italic font-light">que herdamos.</span>
          </h2>
          <p className="font-serif text-lg md:text-xl text-olive-900/75 leading-relaxed">
            Ao falar de esperança, precisamos olhar para as Escrituras Sagradas. Assista ao
            v&iacute;deo e entenda o convite que a Soma traz para a igreja.
          </p>
        </div>

        {/* Video / Poster container */}
        <div className="relative max-w-5xl mx-auto group">
          <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl border border-olive-700/20 bg-olive-900">
            {hasVideo && videoStarted ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="O clima que herdamos"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                {/* Poster image */}
                <img
                  src={
                    hasVideo
                      ? `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`
                      : CLIMATE_POSTER_IMAGE
                  }
                  alt="O clima que herdamos"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-olive-900/90 via-olive-900/40 to-olive-900/30" />

                {/* Play button */}
                <button
                  onClick={handlePlay}
                  disabled={!hasVideo}
                  className={`absolute inset-0 flex items-center justify-center group/play ${
                    hasVideo ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  aria-label={hasVideo ? 'Reproduzir v\u00eddeo' : 'V\u00eddeo em breve'}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-cream-100/30 animate-slow-pulse blur-xl scale-150" />
                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-cream-100 text-olive-900 flex items-center justify-center transition-transform duration-300 group-hover/play:scale-110 shadow-2xl">
                      <Play className="w-8 h-8 md:w-12 md:h-12 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>

                {/* Bottom label */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                  <div className="font-pixel text-cream-100/70 text-xs uppercase tracking-[0.25em] mb-2">
                    {hasVideo ? 'Documento &middot; IRI Brasil' : 'V\u00eddeo em breve'}
                  </div>
                  <div className="font-gothic text-cream-100 text-2xl md:text-4xl leading-tight">
                    Cultivar &amp; Guardar a cria&ccedil;&atilde;o.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Decorative tag */}
          <div className="hidden md:block absolute -top-4 -right-4 bg-olive-900 text-cream-100 px-4 py-2 font-pixel text-xs uppercase tracking-[0.2em] rotate-3 shadow-lg">
            assista &middot; 02
          </div>
        </div>
      </div>
    </section>
  );
};

// =================================================================
// QUEM SOMOS
// =================================================================
const QuemSomos = () => {
  const ref = useReveal();

  const cards = [
    {
      icon: Sprout,
      title: 'DEVOCIONAL',
      text: 'Um devocional produzido pelo Ministérios Pão Diário que conta com 31 dias de devocionais para você refletir o papel do seguidor de Jesus em Cultivar e Guardar a criação de Deus..',
    },
    {
      icon: BookOpen,
      title: 'PEQUENO GRUPO',
      text: 'O material complementar conta com 3 estudos para você aplicar junto ao seu pequeno grupo, ao longo do mês.',
    },
    {
      icon: Users,
      title: 'TESTEMUNHAR',
      text: 'Durante a campanha queremos te convidar a plantar árvores como forma de testemunho público de que cuidar da criação é um compromisso da igreja de Cristo.',
    },
  ];

  return (
    <section
    id="quem-somos"
    className="relative texture-paper texture-botanic-accent py-24 md:py-36 overflow-hidden"
  >
    <div
      ref={ref}
      className="scroll-reveal container mx-auto px-6 md:px-12 relative"
    >

      {/* Título */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 text-olive-700 text-xs uppercase tracking-[0.25em] font-pixel">
          <Leaf className="w-3 h-3" />
          <span>Quem somos</span>
        </div>
      </div>
 				
       {/* Logos */}
<div className="flex justify-center mb-20 md:mb-24">
  <img
    src="/logos/todaslogos.png"
    alt="Organizações parceiras do Movimento Soma"
    className="w-full max-w-6xl h-auto object-contain mx-auto"
  />
</div>

<div className="max-w-3xl mx-auto mb-20 md:mb-24">
  <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-olive-900 mb-8 text-balance">
    <span className="font-gothic">Por que esse</span>
    <br />
    <span className="italic font-light">movimento importa?</span>
  </h2>

  <div className="space-y-5 font-serif text-lg md:text-xl text-olive-900/80 leading-relaxed">
    <p>
      A crise climática já marca a história de uma geração inteira que nasce e cresce em condições ambientais sem precedentes.
      Esse cenário tem gerado entre os jovens um sentimento coletivo de impotência diante do futuro.
    </p>

    <p>
      Por isso, é urgente que a igreja{' '}
      <span className="bg-olive-700 text-cream-100 px-2 py-0.5 italic">
        dialogue sobre o cuidado com a criação.
      </span>{' '}
      A missão de cuidar da natureza não é uma pauta externa ao cristianismo.
      Faz parte do nosso chamado bíblico.
    </p>
  </div>
</div>
        

        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="group relative p-8 md:p-10 bg-cream-50/60 backdrop-blur-sm border border-olive-700/15 rounded-sm hover:bg-olive-800 hover:border-olive-900 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4 font-pixel text-olive-700/40 group-hover:text-cream-100/30 text-sm transition">
                  0{i + 1}
                </div>
                <Icon className="w-9 h-9 text-olive-700 group-hover:text-cream-100 transition mb-6" />
                <h3 className="font-gothic text-3xl md:text-4xl text-olive-900 group-hover:text-cream-100 transition mb-4">
                  {c.title}
                </h3>
                <p className="font-serif text-base md:text-lg text-olive-900/75 group-hover:text-cream-100/85 transition leading-relaxed">
                  {c.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// =================================================================
// FORM SECTION
// =================================================================
const FormSection = ({ onCompleted }) => {
  const ref = useReveal();
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (typeof e.origin !== 'string') return;
      if (!e.origin.includes('monday.com')) return;

      const data = e.data;
      const dataStr = typeof data === 'string' ? data : JSON.stringify(data || {});

      if (
        dataStr.includes('submitted') ||
        dataStr.includes('form-submission') ||
        dataStr.includes('formSubmitted') ||
        dataStr.includes('SUBMIT') ||
        (data && (data.type === 'submitted' || data.event === 'submitted'))
      ) {
        trackEvent('form_completed', { method: 'monday_postmessage' });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onCompleted]);

  return (
    <section id="formulario" className="relative texture-dark py-24 md:py-36 overflow-hidden">
      <div ref={ref} className="scroll-reveal container mx-auto px-6 md:px-12 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-6 text-cream-200/70 text-xs uppercase tracking-[0.25em] font-pixel">
            <FileText className="w-3 h-3" />
            <span>Acesso aos materiais</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-cream-100 mb-6 text-balance">
            <span className="font-gothic">Preencha</span>{' '}
            <span className="italic font-light">e libere</span>
            <br />
            seu acesso.
          </h2>
          <p className="font-serif text-lg md:text-xl text-cream-100/70 leading-relaxed">
            Em menos de 1 minuto voc&ecirc; libera o download dos materiais para que você desenvolva a campanha na sua igreja
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-cream-100 rounded-sm overflow-hidden shadow-2xl border border-olive-300/40">
            {!formLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-cream-100 z-10">
                <Loader2 className="w-8 h-8 text-olive-700 animate-spin" />
              </div>
            )}
            <iframe
              src={MONDAY_FORM_URL}
              title="Formul\u00e1rio IRI Brasil"
              onLoad={() => setFormLoaded(true)}
              className="w-full block"
              style={{ height: '720px', border: 0 }}
              allow="clipboard-write"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-cream-100/50 text-sm font-serif italic mb-3">
              Preencha e envie o formul&aacute;rio para liberar os materiais.
            </p>
            <button
              type="button"
              onClick={() => {
                trackEvent('materials_reveal_clicked');
                onCompleted();
              }}
              className="btn-premium-ghost"
            >
              <CheckCircle2 className="w-4 h-4" />
              J&aacute; preenchi &mdash; liberar materiais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =================================================================
// DOWNLOADS SECTION
// =================================================================
const DownloadsSection = ({ visible }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (visible && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [visible]);

  if (!visible) return null;

  const handleDownload = (key, item) => {
    trackEvent(`pdf_${key}_download`, { title: item.title });
  };

  return (
    <section
      id="downloads"
      ref={ref}
      className="relative texture-paper texture-botanic-accent py-24 md:py-36 overflow-hidden animate-fade-in"
    >
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-olive-700 text-cream-100 text-xs uppercase tracking-[0.25em] font-pixel rounded-full animate-fade-in-up">
            <CheckCircle2 className="w-3 h-3" />
            <span>Acesso liberado</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-olive-900 mb-6 text-balance animate-fade-in-up">
            <span className="font-gothic">Seu material</span>{' '}
            <span className="italic font-light">est&aacute; dispon&iacute;vel</span>
          </h2>
          <p
            className="font-serif text-lg md:text-xl text-olive-900/75 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            Vamos juntos nessa jornada de fé e, meio ambiente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
          {Object.entries(PDF_LINKS).map(([key, item], i) => (
            <a
              key={key}
              href={item.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownload(i + 1, item)}
              className="group text-left relative p-7 md:p-8 bg-olive-900 hover:bg-olive-800 text-cream-100 rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="absolute top-3 right-3 font-pixel text-cream-100/30 text-xs">
                pdf.0{i + 1}
              </div>

              <div className="w-12 h-14 mb-6 bg-cream-100 text-olive-900 flex items-center justify-center rounded-sm group-hover:rotate-[-4deg] transition-transform">
                <FileText className="w-6 h-6" />
              </div>

              <h3 className="font-gothic text-2xl md:text-3xl mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="font-pixel text-cream-200/60 text-xs uppercase tracking-wider mb-6">
                {item.pages} &middot; {item.size}
              </p>

              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium border-t border-cream-100/15 pt-5 group-hover:border-cream-100/30">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition" />
                <span>Baixar PDF 0{i + 1}</span>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center mt-12 text-olive-900/60 font-serif italic text-sm">
          Os arquivos s&atilde;o gratuitos e podem ser compartilhados livremente em sua igreja
          ou comunidade.
        </p>
      </div>
    </section>
  );
};

// =================================================================
// FOOTER
// =================================================================
const Footer = () => (
  <footer className="texture-olive py-12 md:py-16 border-t border-olive-700/40">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logos/soma.png"
            alt="Soma+"
            className="logo-blend h-16 md:h-20 w-auto"
          />
        </div>

        {/* Texto */}
        <div className="text-center md:text-right">
          <p className="font-pixel text-cream-100/55 text-xs uppercase tracking-[0.2em] leading-relaxed max-w-md">
            Juntos somamos esforços para inspirar uma fé que cuida da criação.
          </p>
        </div>

      </div>
    </div>
  </footer>
);

// =================================================================
// MAIN APP
// =================================================================
const App = () => {
  const [downloadsVisible, setDownloadsVisible] = useState(false);

  const handleFormCompleted = () => {
    setDownloadsVisible(true);
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <ClimateSection />
      <QuemSomos />
      <FormSection onCompleted={handleFormCompleted} />
      <DownloadsSection visible={downloadsVisible} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default App;