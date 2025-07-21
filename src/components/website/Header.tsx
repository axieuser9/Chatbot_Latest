import React from 'react';
import { theme } from '../../styles/theme';

export default function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        borderColor: theme.colors.secondary.gray[700]
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
              }}
            >
              A
            </div>
            <span className="text-xl font-bold text-white">Axie Studio</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: theme.colors.secondary.gray[300] }}
            >
              Tjänster
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: theme.colors.secondary.gray[300] }}
            >
              Om oss
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: theme.colors.secondary.gray[300] }}
            >
              Kontakt
            </a>
          </nav>

          {/* CTA Button */}
          <button 
            className="px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.accent.yellow[500]}, ${theme.colors.accent.yellow[600]})`
            }}
          >
            Boka konsultation
          </button>
        </div>
      </div>
    </header>
  );
}