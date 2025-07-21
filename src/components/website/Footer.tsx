import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { theme } from '../../styles/theme';

const footerLinks = {
  services: [
    { name: 'Bokningssystem', href: '#services' },
    { name: 'Webbsidor', href: '#services' },
    { name: 'Mobilappar', href: '#services' },
    { name: 'E-handel', href: '#services' }
  ],
  company: [
    { name: 'Om oss', href: '#about' },
    { name: 'Våra värderingar', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
    { name: 'Support', href: '#contact' }
  ],
  legal: [
    { name: 'Integritetspolicy', href: '#' },
    { name: 'Användarvillkor', href: '#' },
    { name: 'GDPR', href: '#' },
    { name: 'Cookies', href: '#' }
  ]
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: theme.colors.primary.dark }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
                  }}
                >
                  A
                </div>
                <span className="text-2xl font-bold text-white">Axie Studio</span>
              </div>
              <p 
                className="text-lg mb-8 leading-relaxed max-w-md"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                Vi hjälper företag digitalisera och automatisera sina processer med moderna webbsidor, 
                bokningssystem och e-handelslösningar som driver verklig tillväxt.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail 
                    size={20} 
                    style={{ color: theme.colors.accent.green[400] }}
                  />
                  <span 
                    className="text-sm"
                    style={{ color: theme.colors.secondary.gray[300] }}
                  >
                    stefan@axiestudio.se
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone 
                    size={20} 
                    style={{ color: theme.colors.accent.yellow[400] }}
                  />
                  <span 
                    className="text-sm"
                    style={{ color: theme.colors.secondary.gray[300] }}
                  >
                    +46 735 132 620
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin 
                    size={20} 
                    style={{ color: theme.colors.accent.lavender[400] }}
                  />
                  <span 
                    className="text-sm"
                    style={{ color: theme.colors.secondary.gray[300] }}
                  >
                    Jönköping, Sverige
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Tjänster</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: theme.colors.secondary.gray[400] }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Företag</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: theme.colors.secondary.gray[400] }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="py-8 border-t flex flex-col md:flex-row items-center justify-between"
          style={{ borderColor: theme.colors.secondary.gray[700] }}
        >
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span 
              className="text-sm"
              style={{ color: theme.colors.secondary.gray[400] }}
            >
              © 2025 Axie Studio. Alla rättigheter förbehållna.
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            {footerLinks.legal.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: theme.colors.secondary.gray[400] }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Made with Love */}
        <div 
          className="py-4 text-center border-t"
          style={{ borderColor: theme.colors.secondary.gray[800] }}
        >
          <div className="flex items-center justify-center space-x-2">
            <span 
              className="text-sm"
              style={{ color: theme.colors.secondary.gray[500] }}
            >
              Gjord med
            </span>
            <Heart 
              size={16} 
              style={{ color: theme.colors.accent.green[500] }}
              className="animate-pulse"
            />
            <span 
              className="text-sm"
              style={{ color: theme.colors.secondary.gray[500] }}
            >
              i Sverige
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}