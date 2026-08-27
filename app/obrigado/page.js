'use client';

import { CheckCircle2, Download, FileText } from 'lucide-react';

const PDF_LINKS = {
  pdf2: { url: '/pdfs/devocional_tempo_de_cuidar.pdf', title: 'Devocional tempo de cuidar', size: '1.1 MB', pages: '34 paginas' },
  pdf3: { url: '/pdfs/estudo_biblico_tempo_de_cuidar.pdf', title: 'Estudo biblico tempo de cuidar', size: '3.8 MB', pages: '29 paginas' },
  pdf4: { url: '/pdfs/cartilha_de_orientacao_tempo_de_cuidar.pdf', title: 'Cartilha de orientacao tempo de cuidar', size: '4.8 MB', pages: '20 paginas' },
  pdf1: { url: '/pdfs/manual_de_práticas_sustentáveis_para igrejas.pdf', title: 'Manual de práticas sustentáveis para igrejas', size: '58.2 MB', pages: '52 paginas' },
};

const Footer = () => (
  <footer className="texture-olive py-12 md:py-16 border-t border-olive-700/40">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center">
          <img src="/logos/soma.png" alt="Soma+" className="logo-blend h-16 md:h-20 w-auto" />
        </div>
        <div className="text-center md:text-right">
          <p className="font-pixel text-cream-100/55 text-xs uppercase tracking-[0.2em] leading-relaxed max-w-md">
            Juntos somamos esforços para inspirar uma fé que cuida da criação.
          </p>
          <a
            href="https://wa.me/5511995400117?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20campanha%20Cultivar%20%26%20Guardar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 font-pixel text-cream-100/75 text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:text-cream-100 transition"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen">
      <section id="downloads" className="relative texture-paper texture-botanic-accent py-24 md:py-36 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-olive-700 text-cream-100 text-xs uppercase tracking-[0.25em] font-pixel rounded-full animate-fade-in-up">
              <CheckCircle2 className="w-3 h-3" />
              <span>Acesso liberado</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-olive-900 mb-6 text-balance animate-fade-in-up">
              <span className="font-gothic">Seu material</span>{' '}
              <span className="italic font-light">está disponível</span>
            </h1>
            <p className="font-serif text-lg md:text-xl text-olive-900/75 leading-relaxed animate-fade-in-up">
              Vamos juntos nessa jornada de fé e cuidado com a criação.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
            {Object.entries(PDF_LINKS).map(([key, item], index) => (
              <a
                key={key}
                href={item.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group text-left relative p-7 md:p-8 bg-olive-900 hover:bg-olive-800 text-cream-100 rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up overflow-hidden"
              >
                <div className="absolute top-3 right-3 font-pixel text-cream-100/30 text-xs">pdf.0{index + 1}</div>
                <div className="w-12 h-14 mb-6 bg-cream-100 text-olive-900 flex items-center justify-center rounded-sm group-hover:rotate-[-4deg] transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="font-gothic text-2xl md:text-3xl mb-2 leading-tight">{item.title}</h2>
                <p className="font-pixel text-cream-200/60 text-xs uppercase tracking-wider mb-6">{item.pages} &middot; {item.size}</p>
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium border-t border-cream-100/15 pt-5 group-hover:border-cream-100/30">
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition" />
                  <span>Baixar PDF 0{index + 1}</span>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center mt-12 text-olive-900/60 font-serif italic text-sm">
            Os arquivos são gratuitos e podem ser compartilhados livremente em sua igreja ou comunidade.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
