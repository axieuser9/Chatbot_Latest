import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { theme } from '../../styles/theme';

const contactInfo = [
  {
    icon: Mail,
    title: 'E-post',
    primary: 'stefan@axiestudio.se',
    secondary: 'support@axiestudio.se',
    description: 'Vi svarar inom 2 timmar',
    color: theme.colors.accent.green[500]
  },
  {
    icon: Phone,
    title: 'Telefon',
    primary: '+46 735 132 620',
    secondary: '+63 962 576 1387',
    description: 'Vardagar 9-17',
    color: theme.colors.accent.yellow[500]
  },
  {
    icon: MapPin,
    title: 'Plats',
    primary: 'Jönköping, Sverige',
    secondary: 'Eller virtuellt via video',
    description: 'Träffas personligen eller online',
    color: theme.colors.accent.lavender[500]
  },
  {
    icon: Clock,
    title: 'Konsultation',
    primary: 'Kostnadsfri rådgivning',
    secondary: '30-60 minuter',
    description: 'Avslappnad atmosfär',
    color: theme.colors.accent.green[600]
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: theme.colors.secondary.gray[50] }}>
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
              Låt Oss Prata
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: theme.colors.primary.dark }}
          >
            Redo Att Förändra
            <br />
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
              }}
            >
              Ditt Företag?
            </span>
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: theme.colors.secondary.gray[600] }}
          >
            Vi älskar att träffa nya människor och höra om spännande projekt. Låt oss ta en kaffe 
            (virtuellt eller fysiskt) och prata om hur vi kan hjälpa dig växa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 
              className="text-2xl font-bold mb-8"
              style={{ color: theme.colors.primary.dark }}
            >
              Kontakta Oss Direkt
            </h3>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-2xl border hover:shadow-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.colors.secondary.white,
                    borderColor: theme.colors.secondary.gray[200]
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <info.icon size={24} style={{ color: info.color }} />
                  </div>
                  <div>
                    <h4 
                      className="text-lg font-bold mb-1"
                      style={{ color: theme.colors.primary.dark }}
                    >
                      {info.title}
                    </h4>
                    <p 
                      className="font-semibold mb-1"
                      style={{ color: info.color }}
                    >
                      {info.primary}
                    </p>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: theme.colors.secondary.gray[600] }}
                    >
                      {info.secondary}
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: theme.colors.secondary.gray[500] }}
                    >
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div 
              className="p-8 rounded-2xl text-center"
              style={{ backgroundColor: theme.colors.primary.dark }}
            >
              <h4 className="text-2xl font-bold text-white mb-4">
                Kostnadsfri Konsultation ☕
              </h4>
              <p 
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.secondary.gray[300] }}
              >
                Vi erbjuder alltid en kostnadsfri första konsultation där vi lär känna dig, 
                ditt företag och dina drömmar. Inga säljpitchar - bara genuina samtal om hur vi kan hjälpa dig.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span 
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: theme.colors.accent.green[500],
                    color: theme.colors.secondary.white
                  }}
                >
                  30-60 minuter
                </span>
                <span 
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: theme.colors.accent.yellow[500],
                    color: theme.colors.secondary.white
                  }}
                >
                  Helt gratis
                </span>
                <span 
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: theme.colors.accent.lavender[500],
                    color: theme.colors.secondary.white
                  }}
                >
                  Avslappnad atmosfär
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div 
              className="p-8 rounded-2xl border shadow-lg"
              style={{ 
                backgroundColor: theme.colors.secondary.white,
                borderColor: theme.colors.secondary.gray[200]
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: theme.colors.primary.dark }}
              >
                Skicka Ett Meddelande
              </h3>
              
              {isSubmitted ? (
                <div 
                  className="text-center py-12"
                  style={{ color: theme.colors.accent.green[600] }}
                >
                  <CheckCircle size={48} className="mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Tack för ditt meddelande!</h4>
                  <p>Vi återkommer inom 2 timmar.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.primary.dark }}
                      >
                        Namn *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{
                          borderColor: theme.colors.secondary.gray[300],
                          backgroundColor: theme.colors.secondary.white
                        }}
                        placeholder="Ditt namn"
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.primary.dark }}
                      >
                        E-post *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{
                          borderColor: theme.colors.secondary.gray[300],
                          backgroundColor: theme.colors.secondary.white
                        }}
                        placeholder="din@email.se"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.primary.dark }}
                      >
                        Företag
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{
                          borderColor: theme.colors.secondary.gray[300],
                          backgroundColor: theme.colors.secondary.white
                        }}
                        placeholder="Ditt företag"
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.primary.dark }}
                      >
                        Tjänst
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{
                          borderColor: theme.colors.secondary.gray[300],
                          backgroundColor: theme.colors.secondary.white
                        }}
                      >
                        <option value="">Välj tjänst</option>
                        <option value="website">Webbsida</option>
                        <option value="booking">Bokningssystem</option>
                        <option value="ecommerce">E-handel</option>
                        <option value="app">Mobilapp</option>
                        <option value="consultation">Konsultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.primary.dark }}
                    >
                      Meddelande *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                      style={{
                        borderColor: theme.colors.secondary.gray[300],
                        backgroundColor: theme.colors.secondary.white
                      }}
                      placeholder="Berätta om ditt projekt och hur vi kan hjälpa dig..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.green[600]})`
                    }}
                  >
                    <Send size={20} />
                    <span>Skicka Meddelande</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}