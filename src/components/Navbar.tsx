
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore(state => state.getItemCount());

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
    'fixed top-0 left-0 right-0 z-50 py-3 md:py-4 transition-all duration-300 ease-in-out px-3 md:px-8 backdrop-blur-sm',
    {
      'bg-nitebite-dark/95 backdrop-blur-md shadow-lg': isScrolled || !transparent,
      'bg-transparent': transparent && !isScrolled,
      'bg-nitebite-dark': isMenuOpen
    }
  );

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={navbarClass}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-nitebite-highlight font-bold text-xl"
        >
          <span className="text-gradient-accent text-xl md:text-2xl">nitebite</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border">
            Home
          </Link>
          <button 
            onClick={() => scrollToSection('category-section')} 
            className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border"
          >
            Menu
          </button>
          <Link to="/about" className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border">
            About
          </Link>
          <button 
            onClick={() => scrollToSection('footer')} 
            className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border"
          >
            Contact
          </button>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-nitebite-text hover:text-nitebite-highlight focus-ring glassmorphic-icon">
            <User size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-nitebite-text hover:text-nitebite-highlight relative focus-ring glassmorphic-icon"
            asChild
          >
            <Link to="/checkout">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nitebite-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button 
            className="bg-nitebite-accent hover:bg-nitebite-accent-light text-white transition duration-300 focus-ring glassmorphic-button"
            onClick={() => scrollToSection('category-section')}
          >
            Order Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-nitebite-text hover:text-nitebite-highlight relative focus-ring glassmorphic-icon h-9 w-9"
            asChild
          >
            <Link to="/checkout">
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nitebite-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-scale">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-nitebite-text hover:text-nitebite-highlight focus-ring glassmorphic-icon h-9 w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-nitebite-dark/95 backdrop-blur-lg z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
            <Link 
              to="/" 
              className="text-nitebite-text hover:text-nitebite-highlight text-xl animate-fade-in-up" 
              style={{ animationDelay: '100ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <button 
              className="text-nitebite-text hover:text-nitebite-highlight text-xl animate-fade-in-up" 
              style={{ animationDelay: '200ms' }}
              onClick={() => scrollToSection('category-section')}
            >
              Menu
            </button>
            <Link 
              to="/about" 
              className="text-nitebite-text hover:text-nitebite-highlight text-xl animate-fade-in-up" 
              style={{ animationDelay: '300ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <button 
              className="text-nitebite-text hover:text-nitebite-highlight text-xl animate-fade-in-up" 
              style={{ animationDelay: '400ms' }}
              onClick={() => scrollToSection('footer')}
            >
              Contact
            </button>
            <button
              className="glassmorphic-button text-white text-lg py-4 px-8 rounded-full animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
              onClick={() => {
                scrollToSection('category-section');
                setIsMenuOpen(false);
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
