import React from 'react';
import { Calendar, X } from 'lucide-react';
import { theme } from '../../styles/theme';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
  title: string;
  closeLabel: string;
}

export default function BookingModal({ isOpen, onClose, bookingUrl, title, closeLabel }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-300"
         style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div 
        className="w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 rounded-2xl overflow-hidden"
        style={{ backgroundColor: theme.colors.secondary.white }}
      >
        <div 
          className="flex items-center justify-between p-6 text-white"
          style={{ backgroundColor: theme.colors.primary.dark }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Calendar className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-white/20"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            aria-label={closeLabel}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={bookingUrl}
            className="w-full h-full border-none"
            title={title}
          />
        </div>
      </div>
    </div>
  );
}