import React from 'react';
import { Calendar, Globe, Smartphone, ShoppingCart, BarChart3, Zap } from 'lucide-react';
import { theme } from '../../styles/theme';

const services = [
  {
    icon: Calendar,
    title: 'Avancerat Bokningssystem',
    description: 'Automatisera hela bokningsprocessen från första kontakt till genomförd tjänst.',
    features: ['Intelligent schemaläggning', 'Realtidsbokningar', 'Automatiska påminnelser', 'CRM-integration'],
    color: theme.colors.accent.green[500]
  },
  {
    icon: Globe,
    title: 'Professionella Webbsidor',
    description: 'Webbsidor som imponerar och konverterar besökare till kunder.',
    features: ['Anpassad design', 'SEO-optimerad', 'Mobilresponsiv', 'Säker & snabb'],
    color: theme.colors.accent.lavender[500]
  },
  {
    icon: Smartphone,
    title: 'Mobilappar',
    description: 'Moderna mobilappar för iOS och Android som fungerar perfekt på alla plattformar.',
    features: ['Cross-platform', 'App Store-publicering', 'Push-notifikationer', 'Native känsla'],
    color: theme.colors.accent.yellow[500]
  },
  {
    icon: ShoppingCart,
    title: 'E-handelslösningar',
    description: 'Kompletta webshop-lösningar som konverterar besökare till kunder.',
    features: ['Säkra betalningar', 'Lagerhantering', 'Kundkonton', 'Marknadsföringsverktyg'],
    color: theme.colors.accent.green[600]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: theme.colors.secondary.gray[50] }}>
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
              Våra Digitala Lösningar
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: theme.colors.primary.dark }}
          >
            Allt Du Behöver För
            <br />
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
              }}
            >
              Digital Framgång
            </span>
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: theme.colors.secondary.gray[600] }}
          >
            Vi levererar kompletta digitala lösningar som driver ditt företag framåt med precision, kvalitet och resultat.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{ 
                backgroundColor: theme.colors.secondary.white,
                borderColor: theme.colors.secondary.gray[200]
              }}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon size={32} style={{ color: service.color }} />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ color: theme.colors.primary.dark }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-lg mb-4 leading-relaxed"
                    style={{ color: theme.colors.secondary.gray[600] }}
                  >
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        <span 
                          className="text-sm font-medium"
                          style={{ color: theme.colors.secondary.gray[700] }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div 
          className="rounded-2xl p-8 md:p-12 text-center"
          style={{ backgroundColor: theme.colors.primary.dark }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <BarChart3 
                  size={24} 
                  style={{ color: theme.colors.accent.green[400] }}
                />
                <span 
                  className="text-3xl font-bold text-white"
                >
                  99.9%
                </span>
              </div>
              <p 
                className="text-lg font-medium"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                Uptime Garanti
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap 
                  size={24} 
                  style={{ color: theme.colors.accent.yellow[400] }}
                />
                <span 
                  className="text-3xl font-bold text-white"
                >
                  14
                </span>
              </div>
              <p 
                className="text-lg font-medium"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                Dagar Genomsnittlig Leverans
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar 
                  size={24} 
                  style={{ color: theme.colors.accent.lavender[400] }}
                />
                <span 
                  className="text-3xl font-bold text-white"
                >
                  24/7
                </span>
              </div>
              <p 
                className="text-lg font-medium"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                Support & Underhåll
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}