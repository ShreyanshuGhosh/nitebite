
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (transparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [transparent]);

  const navbarClass = cn(
    'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out px-4 md:px-8',
    {
      'bg-nitebite-dark/95 backdrop-blur-md shadow-md': isScrolled || !transparent,
      'bg-transparent': transparent && !isScrolled,
      'bg-nitebite-dark': isMenuOpen
    }
  );

  return (
    <nav className={navbarClass}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-nitebite-highlight font-bold text-xl"
        >
          <span className="text-gradient-accent text-2xl">nitebite</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border">
            Home
          </Link>
          <Link to="/menu" className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border">
            Menu
          </Link>
          <Link to="/about" className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border">
            About
          </Link>
          <Link to="/contact" className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border">
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-nitebite-text hover:text-nitebite-highlight focus-ring">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-nitebite-text hover:text-nitebite-highlight relative focus-ring">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-nitebite-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale">
              0
            </span>
          </Button>
          <Button className="bg-nitebite-accent hover:bg-nitebite-accent-light text-white transition duration-300 focus-ring">
            Order Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-nitebite-text hover:text-nitebite-highlight relative focus-ring">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-nitebite-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale">
              0
            </span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-nitebite-text hover:text-nitebite-highlight focus-ring"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-nitebite-dark z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
            <Link 
              to="/" 
              className="text-nitebite-text hover:text-nitebite-highlight text-2xl animate-fade-in-up" 
              style={{ animationDelay: '100ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="text-nitebite-text hover:text-nitebite-highlight text-2xl animate-fade-in-up" 
              style={{ animationDelay: '200ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className="text-nitebite-text hover:text-nitebite-highlight text-2xl animate-fade-in-up" 
              style={{ animationDelay: '300ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-nitebite-text hover:text-nitebite-highlight text-2xl animate-fade-in-up" 
              style={{ animationDelay: '400ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              className="bg-nitebite-accent hover:bg-nitebite-accent-light text-white text-xl py-6 px-10 rounded-full animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Order Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
