import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { theme } from '../../styles/theme';

export default function Hero() {
  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: theme.colors.primary.dark }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.colors.accent.green[500].slice(1)}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: theme.colors.status.online }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: theme.colors.accent.green[400] }}
            >
              Smart assistent: enkel grå/vit design med gröna accenter för interaktivitet
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build, Book, Automate:
            <br />
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.accent.green[400]}, ${theme.colors.accent.lavender[400]})`
              }}
            >
              Din Digitala Framgång, Förenklad
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ color: theme.colors.secondary.gray[300] }}
          >
            Vi skapar inte bara digitala lösningar - vi bygger relationer och levererar resultat som 
            driver ditt företag framåt med hjärta och passion. Från första idé till färdig lösning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 text-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.green[600]})`
              }}
            >
              <span>Låt oss prata om ditt projekt</span>
              <ArrowRight size={20} />
            </button>
            
            <button 
              className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg border-2 text-lg hover:bg-white/10"
              style={{
                color: theme.colors.secondary.white,
                borderColor: theme.colors.secondary.gray[600],
                backgroundColor: 'transparent'
              }}
            >
              Utforska våra lösningar
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle 
                size={24} 
                style={{ color: theme.colors.status.online }}
              />
              <span 
                className="text-lg font-medium"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                99.9% Uptime
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle 
                size={24} 
                style={{ color: theme.colors.status.online }}
              />
              <span 
                className="text-lg font-medium"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                Personlig Service
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle 
                size={24} 
                style={{ color: theme.colors.status.online }}
              />
              <span 
                className="text-lg font-medium"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}