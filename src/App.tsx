import { MessageCircle, CheckCircle2, Stethoscope, Car, TrendingUp, Building, Shield, UserCheck, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import heroImage from './assets/images/frustrated_executive_car_1786479907167.jpg';

// Standardized highly-polished UX ease curve and animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function CustomCursor() {
  useEffect(() => {
    const spotlight = document.getElementById('cursor-spotlight');
    const dot = document.getElementById('cursor-dot');
    
    let rafId: number;
    
    const updatePosition = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        }
        if (dot) {
          dot.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        }
      });
    };
    
    window.addEventListener('mousemove', updatePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div 
        id="cursor-spotlight"
        className="pointer-events-none fixed top-0 left-0 z-[100] w-[1200px] h-[1200px] rounded-full opacity-100 transition-opacity duration-300"
        style={{ 
          background: 'radial-gradient(circle, rgba(229,114,0,0.08) 0%, transparent 50%)',
          transform: 'translate3d(-50%, -50%, 0)',
          willChange: 'transform'
        }}
      />
      <div 
        id="cursor-dot"
        className="pointer-events-none fixed top-0 left-0 z-[110] w-2.5 h-2.5 rounded-full bg-[#b2b2b2] shadow-[0_0_8px_rgba(178,178,178,0.5)] transition-transform duration-75 ease-out"
        style={{ 
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform'
        }}
      />
    </>
  );
}

interface WhatsAppButtonProps {
  text: string;
  variant?: 'orange' | 'dark';
  className?: string;
}

const Logo = () => (
  <div className="flex items-center gap-1.5 font-display select-none">
    <span className="text-brand-orange text-3xl font-black lowercase tracking-tighter">ekto</span>
    <span className="text-gray-400 text-xl font-bold uppercase tracking-widest mt-1">SEGUROS</span>
  </div>
);

const WhatsAppButton = ({ text, variant = 'orange', className = '' }: WhatsAppButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-semibold transition-all duration-300 hover:scale-105 z-10 cursor-none";
  const variants = {
    orange: "bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-brand-orange/20",
    dark: "bg-brand-dark text-white hover:bg-gray-700 shadow-lg"
  };
  
  return (
    <a 
      href="#diagnostico" 
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5 text-white" />
      <span>{text}</span>
    </a>
  );
};

function Header() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <WhatsAppButton text="Falar com um especialista" className="px-6 py-2.5 text-sm" />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 w-full py-16 grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          className="flex flex-col items-start z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
        >
          <motion.div 
            variants={fadeUpVariant}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-widest font-display">
              Seguro Auto
            </span>
          </motion.div>
          <motion.h1 variants={fadeUpVariant} className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-[1.15] tracking-tight mb-6 max-w-xl">
            Renovar no automático <span className="text-brand-orange">custa caro.</span>
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="font-sans text-xl text-gray-300 mb-10 max-w-lg">
            Auditamos sua apólice para fechar lacunas e proteger seu patrimônio de verdade.
          </motion.p>
          <motion.div variants={fadeUpVariant}>
            <WhatsAppButton text="Revisar meu seguro agora" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative hidden lg:block h-full min-h-[500px]"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <img 
              src={heroImage} 
              alt="Especialista Corporativo Frustrado com Carro" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

function ContextAndProof() {
  const stats = [
    { number: "14+", label: "Anos de experiência" },
    { number: "VIP", label: "Setor de sinistros" },
    { number: "100%", label: "Atendimento humano" },
    { number: "Hub", label: "Swiss Park" }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariant}
        >
          {stats.map((stat, idx) => (
            <motion.div variants={fadeUpVariant} key={idx} className="flex flex-col border-l-2 border-brand-orange/20 pl-5">
              <span className="font-display font-black text-3xl md:text-4xl text-brand-black mb-1">{stat.number}</span>
              <span className="font-sans text-gray-500 font-medium text-sm md:text-base">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariant}
        >
          <motion.div variants={fadeUpVariant} className="flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-black mb-3">Fim da Burocracia</h3>
            <p className="font-sans text-gray-600 leading-relaxed text-sm">
              Esqueça os 0800 demorados. Na Ekto, você tem um especialista focado em resolver imprevistos em minutos.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUpVariant} className="flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-brand-dark/5 flex items-center justify-center text-brand-dark mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-black mb-3">Cotação Inteligente</h3>
            <p className="font-sans text-gray-600 leading-relaxed text-sm">
              Avaliamos o seu perfil em mais de 10 seguradoras simultaneamente para garantir o melhor cenário.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUpVariant} className="flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-black mb-3">Sem Robôs</h3>
            <p className="font-sans text-gray-600 leading-relaxed text-sm">
              Atendimento consultivo direto pelo WhatsApp. Especialistas que entendem o valor do seu tempo.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function Deepening() {
  const pillars = [
    {
      title: "Inteligência Contínua",
      desc: "Nossa matriz de risco é revisada ativamente. Antecipamos exposições e evitamos gaps de cobertura.",
      icon: Shield
    },
    {
      title: "Parceria Estratégica",
      desc: "Alinhamos sua apólice ao planejamento financeiro, protegendo o caixa e o legado da sua empresa.",
      icon: TrendingUp
    },
    {
      title: "Especialistas Dedicados",
      desc: "Atendimento por quem entende da sua rotina. Desenhamos estruturas que funcionam para a sua realidade.",
      icon: UserCheck
    }
  ];

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3D3D3D_0%,_#0A0A0A_100%)] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Comparação */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariant}
        >
          <motion.h2 variants={fadeUpVariant} className="font-display font-black text-3xl md:text-4xl text-white uppercase leading-tight mb-12 text-center max-w-3xl mx-auto">
            Acidentes acontecem, mas <span className="text-brand-orange">ter prejuízo é uma escolha.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUpVariant} className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
              <h3 className="font-display font-bold text-xl text-gray-400 mb-8">Modelo Tradicional</h3>
              <ul className="space-y-6">
                {[
                  "Cobertura genérica, revisada apenas na renovação.",
                  "Zero acompanhamento durante a vigência da apólice.",
                  "Sinistros tratados de forma reativa e burocrática."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-gray-400 text-sm">
                    <span className="font-bold text-gray-500 mt-0.5">✕</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-brand-black border border-brand-orange/30 rounded-3xl p-8 lg:p-10 shadow-[0_0_30px_rgba(229,114,0,0.1)] relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-orange text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide font-display">
                CORRETORA EKTO
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-8">Nossa Metodologia</h3>
              <ul className="space-y-6">
                {[
                  "Cobertura estruturada conforme sua operação real.",
                  "Acompanhamento VIP direto no seu WhatsApp.",
                  "Departamento exclusivo para aprovação ágil de sinistros."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-gray-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Pilares */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 border-t border-white/5 pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariant}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div variants={fadeUpVariant} key={idx} className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{pillar.title}</h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

function HighDensity() {
  const verticals = [
    {
      id: "saude",
      label: "Saúde e Clínicas",
      icon: <Stethoscope className="w-5 h-5" />,
      seu_risco: "Erros médicos, processos por responsabilidade civil, sinistralidade alta em planos de equipe.",
      solucao: "Seguro RC Médico sob medida + gestão ativa de benefícios para retenção de talentos.",
      empresas: "Clínicas médicas, consultórios de alto padrão, laboratórios."
    },
    {
      id: "premium",
      label: "Bens Premium e Frotas",
      icon: <Car className="w-5 h-5" />,
      seu_risco: "Perda patrimonial em veículos de luxo, burocracia excessiva em sinistros automotivos.",
      solucao: "Seguro Auto Premium com assistência VIP e despachante exclusivo.",
      empresas: "Empresários, executivos C-Level, frotas corporativas de diretoria."
    },
    {
      id: "sucessao",
      label: "Previdência e Sucessão",
      icon: <TrendingUp className="w-5 h-5" />,
      seu_risco: "Falta de liquidez na sucessão empresarial, impostos altos sobre herança, futuro desprotegido.",
      solucao: "Planejamento sucessório estruturado e Previdência Privada corporativa/familiar.",
      empresas: "Sócios fundadores, diretores, investidores e family offices."
    },
    {
      id: "consorcio",
      label: "Consórcios e Expansão",
      icon: <Building className="w-5 h-5" />,
      seu_risco: "Descapitalização rápida para compra de equipamentos ou abertura de novas sedes, juros altos.",
      solucao: "Cartas de consórcio estruturadas como ferramenta de alavancagem de forma inteligente.",
      empresas: "Empresas em fase de expansão, renovação de maquinário médico/industrial."
    }
  ];

  const faqs = [
    {
      q: "Como funciona a auditoria gratuita de apólice?",
      a: "Nossos especialistas analisam as condições atuais do seu seguro, identificando lacunas de cobertura e oportunidades de redução de custo, apresentando um cenário otimizado sem compromisso."
    },
    {
      q: "O atendimento é realmente direto pelo WhatsApp?",
      a: "Sim. Eliminamos os 0800 demorados. Você terá um canal direto com nossa equipe de especialistas e departamento de sinistros para resolução imediata."
    },
    {
      q: "Vocês atendem apenas clientes de Campinas?",
      a: "Embora nossa sede esteja no Swiss Park em Campinas, atendemos clientes e grandes contas em todo o território nacional com a mesma proximidade e excelência."
    },
    {
      q: "Qual a diferença de cotar com a Ekto ou direto no banco?",
      a: "Os gerentes de banco oferecem produtos engessados da própria instituição. Como corretora independente, a Ekto cota seu perfil em mais de 10 seguradoras simultaneamente para encontrar a melhor relação custo-benefício."
    }
  ];

  const [activeTab, setActiveTab] = useState(verticals[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Setores */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariant}
        >
          <motion.div variants={fadeUpVariant} className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-black uppercase leading-tight">
              Especialização por setor para uma <span className="text-brand-orange">proteção sob medida.</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap justify-center gap-2 mb-8">
            {verticals.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm transition-all z-10 cursor-none ${
                  activeTab === tab.id 
                    ? 'bg-brand-black text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[340px] md:min-h-[280px]">
            {verticals.map(tab => (
              <div 
                key={tab.id} 
                className={`grid lg:grid-cols-2 gap-12 transition-all duration-500 absolute inset-0 p-8 lg:p-12 ${
                  activeTab === tab.id ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 pointer-events-none z-0'
                }`}
              >
                <div className="space-y-8">
                  <div>
                    <h4 className="text-brand-dark font-display font-bold text-sm uppercase tracking-wider mb-2">Seu risco atual:</h4>
                    <p className="font-sans text-gray-600 text-base leading-relaxed">{tab.seu_risco}</p>
                  </div>
                  <div>
                    <h4 className="text-brand-orange font-display font-bold text-sm uppercase tracking-wider mb-2">Nossa solução:</h4>
                    <p className="font-sans text-brand-black font-semibold text-base leading-relaxed">{tab.solucao}</p>
                  </div>
                </div>
                
                <div className="bg-brand-black rounded-2xl p-8 flex flex-col justify-center">
                  <h4 className="text-brand-orange font-display font-bold text-sm uppercase tracking-wider mb-4">Para quem é:</h4>
                  <p className="font-sans text-white text-lg leading-relaxed">
                    {tab.empresas}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ */}
        <motion.div 
          className="max-w-3xl mx-auto pt-16 border-t border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariant}
        >
          <motion.h2 variants={fadeUpVariant} className="font-display font-black text-2xl md:text-3xl text-brand-black uppercase leading-tight mb-10 text-center">
            Perguntas Frequentes
          </motion.h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div variants={fadeUpVariant} key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white z-10 relative">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left cursor-none"
                >
                  <span className="font-display font-bold text-brand-black pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-orange transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === idx ? 'max-h-48 py-5 border-t border-gray-100 bg-gray-50' : 'max-h-0 py-0'
                  }`}
                >
                  <p className="font-sans text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden" id="diagnostico">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#111111_0%,_#3D3D3D_100%)]" />
      
      <motion.div 
        className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainerVariant}
      >
        <motion.p variants={fadeUpVariant} className="text-brand-orange font-bold uppercase tracking-wider text-sm mb-4 font-display">
          Diagnóstico gratuito de exposição
        </motion.p>
        <motion.h2 variants={fadeUpVariant} className="font-display font-black text-4xl md:text-5xl uppercase leading-tight mb-8 text-white">
          Sem surpresas, sem atalhos.
        </motion.h2>
        
        <motion.p variants={fadeUpVariant} className="font-sans text-lg text-gray-300 mb-12 leading-relaxed">
          Antes de qualquer proposta, um especialista dedicado ao seu setor mapeia sua matriz de risco atual e identifica gaps de cobertura que podem virar sinistro no futuro. Tudo documentado e explicado antes de você decidir.
        </motion.p>
        
        <motion.div variants={fadeUpVariant} className="w-full sm:w-auto">
          <WhatsAppButton text="Solicitar diagnóstico sem compromisso" className="text-lg px-10 py-5 w-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-6 font-sans text-sm text-gray-500 z-10 relative">
          <span>© {new Date().getFullYear()} Ekto Grupo. Todos os direitos reservados.</span>
          <a href="#" className="hover:text-white transition-colors cursor-none">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-orange/30 cursor-none relative">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <ContextAndProof />
        <Deepening />
        <HighDensity />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
