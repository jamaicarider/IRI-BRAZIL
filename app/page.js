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

// ---------- Constants ----------
// PARA ATIVAR O V\u00cdDEO: substitua null pelo ID do v\u00eddeo do YouTube
// Ex: const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';
// Voc\u00ea pega o ID na URL: https://www.youtube.com/watch?v=ESSE_AQUI
const YOUTUBE_VIDEO_ID = null;

// Imagem poster (usada quando ainda n\u00e3o h\u00e1 v\u00eddeo)
const CLIMATE_POSTER_IMAGE =
  'https://images.unsplash.com/photo-1624324378932-68e20f332982?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxjbGltYXRlJTIwY2hhbmdlfGVufDB8fHx8MTc3ODA4OTM3MXww&ixlib=rb-4.1.0&q=85';

const PDF_LINKS = {
  pdf1: { url: '#pdf-01', title: 'Manual de práticas sustentáveis para igrejas', size: '2.4 MB', pages: '32 p\u00e1ginas' },
  pdf2: { url: '#pdf-02', title: 'Devocional tempo de cuidar', size: '3.1 MB', pages: '48 p\u00e1ginas' },
  pdf3: { url: '#pdf-03', title: 'Estudo biblico tempo de cuidar', size: '1.8 MB', pages: '24 p\u00e1ginas' },
  pdf4: { url: '#pdf-04', title: 'Cartilha de orientacao tempo de cuidar', size: '2.0 MB', pages: '28 p\u00e1ginas' },
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
      <div className="font-gothic text-2xl md:text-3xl text-cream-100 leading-none">
        IRI<span className="text-olive-300">.</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-cream-100/80 text-xs uppercase tracking-[0.2em] font-pixel">
        <button onClick={() => smoothScrollTo('quem-somos')} className="hover:text-cream-100 transition">
          Quem somos
        </button>
        <button onClick={() => smoothScrollTo('formulario')} className="hover:text-cream-100 transition">
          Materiais
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
          Durante 30 dias vamos nos dedicar a refletir sobre o papel do crente em desenvolver a terra de modo que agrade a Deus. Assista o vídeo para conhecer mais a campanha!

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
            Preencher Formul&aacute;rio
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
            Antes de falar de esperan&ccedil;a, precisamos olhar para as Escrituras Sagradas. Assista ao
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
                allow="accelerated-the-encrypted-media; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
      text: 'Um devocional produzido pelo Ministérios Pão Diário que conta com 30 dias de devocionais para você refletir o papel do seguidor de Jesus em Cultivar e Guardar a criação de Deus..',
    },
    {
      icon: BookOpen,
      title: 'PEQUENO GRUPO',
      text: 'O material complementar conta com 3 estudos para você aplicar junto ao seu pequeno grupo, ao longo do mês.',
    },
    {
      icon: Users,
      title: 'TESTEMUNHAR',
      text: 'Ao final dos 30 dias queremos te convidar a plantar árvores como forma de testemunho público de que cuidar da criação é um compromisso da igreja de Cristo.',
    },
  ];

  return (
    <section id="quem-somos" className="relative texture-paper texture-botanic-accent py-24 md:py-36 overflow-hidden">
      <div ref={ref} className="scroll-reveal container mx-auto px-6 md:px-12 relative">
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6 text-olive-700 text-xs uppercase tracking-[0.25em] font-pixel">
            <Leaf className="w-3 h-3" />
            <span>Quem somos</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-olive-900 mb-8 text-balance">
            <span className="font-gothic">Por que; esse</span>
            <br />
            <span className="italic font-light">movimento importa?</span>
          </h2>

          <div className="space-y-5 font-serif text-lg md:text-xl text-olive-900/80 leading-relaxed">
            <p>
              A crise clim&aacute;tica j&aacute; marca a hist&oacute;ria de uma gera&ccedil;&atilde;o
              inteira que nasce e cresce em condi&ccedil;&otilde;es ambientais sem precedentes.
              Esse cen&aacute;rio tem gerado entre os jovens um sentimento coletivo de
              imp&ocirc;tencia diante do futuro.
            </p>
            <p>
              Por isso, &eacute; urgente que a igreja{' '}
              <span className="bg-olive-700 text-cream-100 px-2 py-0.5 italic">
                dialogue sobre o cuidado com a criação.
              </span>{' '}
              A miss&atilde;o de cuidar da terra
              n&atilde;o &eacute; uma pauta externa ao cristianismo: faz parte do nosso chamado
              b&iacute;blico.
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
        onCompleted();
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
              J&aacute; preencheu o formul&aacute;rio? Clique abaixo para liberar os downloads.
            </p>
            <button
              onClick={() => {
                trackEvent('form_completed', { method: 'manual_button' });
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
    if (item.url && !item.url.startsWith('#')) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        `Download "${item.title}" registrado!\n\nSubstitua o link no arquivo /app/app/page.js (constante PDF_LINKS) pelo URL real do PDF hospedado.`
      );
    }
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
            <button
              key={key}
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
            </button>
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="font-gothic text-3xl text-cream-100 mb-2">
            IRI<span className="text-olive-300">.</span>Brasil
          </div>
          <p className="font-pixel text-cream-100/50 text-xs uppercase tracking-[0.2em]">
            Uma campanha em parceria com  &middot;  Movimento Pão Diario.
          </p>
        </div>
        <div className="text-cream-100/40 text-xs font-pixel uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} IRI Brasil
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = sessionStorage.getItem('iri_form_completed');
      if (completed === '1') setDownloadsVisible(true);
    }
  }, []);

  const handleFormCompleted = () => {
    setDownloadsVisible(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('iri_form_completed', '1');
    }
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <ClimateSection />
      <QuemSomos />
      <FormSection onCompleted={handleFormCompleted} />
      <DownloadsSection visible={downloadsVisible} />
      <Footer />
    </main>
  );
};

export default App;
