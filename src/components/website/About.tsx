import React from 'react';
import { Heart, Target, Users, Award } from 'lucide-react';
import { theme } from '../../styles/theme';

const values = [
  {
    icon: Heart,
    title: 'Passion & Hjärta',
    description: 'Vi brinner för att skapa digitala lösningar som verkligen gör skillnad för våra kunder.',
    color: theme.colors.accent.green[500]
  },
  {
    icon: Target,
    title: 'Precision & Kvalitet',
    description: 'Varje projekt genomförs med noggrannhet och fokus på att leverera högsta kvalitet.',
    color: theme.colors.accent.yellow[500]
  },
  {
    icon: Users,
    title: 'Personlig Service',
    description: 'Vi bygger långsiktiga relationer och är alltid här när du behöver oss.',
    color: theme.colors.accent.lavender[500]
  },
  {
    icon: Award,
    title: 'Branschledande',
    description: 'Vi använder de senaste teknologierna och bästa metoderna inom branschen.',
    color: theme.colors.accent.green[600]
  }
];

export default function About() {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: theme.colors.secondary.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: theme.colors.status.online }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: theme.colors.accent.green[600] }}
            >
              Om Axie Studio
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: theme.colors.primary.dark }}
          >
            Vi Bygger Inte Bara Teknik
            <br />
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
              }}
            >
              Vi Bygger Relationer
            </span>
          </h2>
          <p 
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: theme.colors.secondary.gray[600] }}
          >
            Axie Studio grundades med en vision: att göra avancerad digital teknik tillgänglig för alla företag. 
            Vi tror på att kombinera teknisk excellens med genuint engagemang för våra kunders framgång.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 
              className="text-3xl font-bold mb-6"
              style={{ color: theme.colors.primary.dark }}
            >
              Vår Historia
            </h3>
            <div className="space-y-6">
              <p 
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.secondary.gray[600] }}
              >
                Grundat 2023 av ett team av passionerade utvecklare och designers som såg behovet av 
                mer personliga och resultatdrivna digitala lösningar. Vi ville skapa en studio där 
                teknisk kompetens möter äkta omsorg om kundernas framgång.
              </p>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.secondary.gray[600] }}
              >
                Idag hjälper vi företag över hela Sverige att digitalisera och automatisera sina 
                processer med moderna webbsidor, bokningssystem och e-handelslösningar som driver 
                verklig tillväxt.
              </p>
            </div>
          </div>
          <div 
            className="rounded-2xl p-8 text-center"
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.accent.green[50]}, ${theme.colors.accent.lavender[50]})`,
              border: `2px solid ${theme.colors.secondary.gray[200]}`
            }}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: theme.colors.accent.green[600] }}
                >
                  100+
                </div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.secondary.gray[600] }}
                >
                  Nöjda Kunder
                </p>
              </div>
              <div>
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: theme.colors.accent.yellow[600] }}
                >
                  200+
                </div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.secondary.gray[600] }}
                >
                  Projekt Levererade
                </p>
              </div>
              <div>
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: theme.colors.accent.lavender[600] }}
                >
                  99.9%
                </div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.secondary.gray[600] }}
                >
                  Kundnöjdhet
                </p>
              </div>
              <div>
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: theme.colors.accent.green[700] }}
                >
                  24/7
                </div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.secondary.gray[600] }}
                >
                  Support
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: theme.colors.primary.dark }}
          >
            Våra Värderingar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
                style={{ 
                  backgroundColor: theme.colors.secondary.white,
                  borderColor: theme.colors.secondary.gray[200]
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <value.icon size={32} style={{ color: value.color }} />
                </div>
                <h4 
                  className="text-xl font-bold mb-3"
                  style={{ color: theme.colors.primary.dark }}
                >
                  {value.title}
                </h4>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.secondary.gray[600] }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}