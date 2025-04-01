
import React from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-nitebite-dark-accent/80 backdrop-blur-lg py-12">
      <div className="page-container">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="font-bold text-2xl text-gradient-accent mb-6">nitebite</h3>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <a 
              href="mailto:nitebite4u@gmail.com" 
              className="p-3 rounded-full glassmorphic-ghost-button text-nitebite-text hover:text-nitebite-accent transition-all duration-300 hover:scale-110"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/nitebit.e/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full glassmorphic-ghost-button text-nitebite-text hover:text-nitebite-accent transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/nitebite" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full glassmorphic-ghost-button text-nitebite-text hover:text-nitebite-accent transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          
          <a 
            href="mailto:nitebite4u@gmail.com"
            className="text-nitebite-text hover:text-nitebite-accent text-sm transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            nitebite4u@gmail.com
          </a>
          
          <p className="text-nitebite-text-muted text-xs mt-6">
            © {new Date().getFullYear()} nitebite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
