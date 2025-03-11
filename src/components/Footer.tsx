
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nitebite-dark-accent pt-16 pb-8">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-2xl text-gradient-accent mb-4">nitebite</h3>
            <p className="text-nitebite-text-muted mb-6">
              Your 10-minute delivery service for late-night cravings. We bring snacks, drinks, and more right to your door.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-nitebite-highlight mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-nitebite-text-muted hover:text-nitebite-accent transition duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-nitebite-highlight mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-nitebite-accent w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-nitebite-text-muted">
                  123 Midnight Avenue, Snackville, NY 10001
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="text-nitebite-accent w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-nitebite-text-muted">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="text-nitebite-accent w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-nitebite-text-muted">
                  Open: 8 PM - 4 AM Daily
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-nitebite-highlight mb-4">Subscribe</h3>
            <p className="text-nitebite-text-muted mb-4">
              Get updates on new items and exclusive offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-nitebite-dark border border-nitebite-accent/30 text-nitebite-text rounded-lg px-4 py-2 focus:outline-none focus:border-nitebite-accent"
              />
              <button 
                type="submit"
                className="bg-nitebite-accent hover:bg-nitebite-accent-light text-white rounded-lg px-4 py-2 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 text-center">
          <p className="text-nitebite-text-muted text-sm">
            © {new Date().getFullYear()} nitebite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
