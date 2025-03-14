
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from '@/hooks/use-click-outside';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore(state => state.getItemCount());
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

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
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-nitebite-text hover:text-nitebite-highlight transition duration-200 animated-border"
          >
            How to Order
          </button>
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

      {/* Mobile Menu - Floating Box Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <motion.div 
              className="w-full h-full flex justify-end items-start pt-16 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                ref={menuRef}
                className="w-[80%] max-w-xs bg-nitebite-dark-accent/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden pointer-events-auto"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.32, 0.72, 0, 1],
                  staggerChildren: 0.05,
                  delayChildren: 0.1
                }}
              >
                <div className="py-4 px-2">
                  {/* Menu Items */}
                  <div className="flex flex-col space-y-2">
                    <MenuItemAnimation>
                      <Link 
                        to="/" 
                        className="flex items-center px-4 py-3 rounded-md text-nitebite-text hover:bg-white/5 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-lg font-medium">Home</span>
                      </Link>
                    </MenuItemAnimation>
                    
                    <MenuItemAnimation>
                      <button 
                        className="flex items-center px-4 py-3 rounded-md text-nitebite-text hover:bg-white/5 text-left transition-all duration-200"
                        onClick={() => scrollToSection('category-section')}
                      >
                        <span className="text-lg font-medium">Menu</span>
                      </button>
                    </MenuItemAnimation>
                    
                    <MenuItemAnimation>
                      <button 
                        className="flex items-center px-4 py-3 rounded-md text-nitebite-text hover:bg-white/5 text-left transition-all duration-200"
                        onClick={() => scrollToSection('how-it-works')}
                      >
                        <span className="text-lg font-medium">How to Order</span>
                      </button>
                    </MenuItemAnimation>
                    
                    <MenuItemAnimation>
                      <button 
                        className="flex items-center px-4 py-3 rounded-md text-nitebite-text hover:bg-white/5 text-left transition-all duration-200"
                        onClick={() => scrollToSection('footer')}
                      >
                        <span className="text-lg font-medium">Contact</span>
                      </button>
                    </MenuItemAnimation>
                    
                    <MenuItemAnimation>
                      <div className="mt-4 px-4">
                        <Button 
                          className="w-full glassmorphic-button py-5 rounded-md text-white font-medium"
                          onClick={() => {
                            scrollToSection('category-section');
                            setIsMenuOpen(false);
                          }}
                        >
                          Order Now
                        </Button>
                      </div>
                    </MenuItemAnimation>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Animation wrapper for menu items
const MenuItemAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Navbar;
