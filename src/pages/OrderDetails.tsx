
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const OrderDetails = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [hostelNumber, setHostelNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, calculateSubtotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const serviceFee = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  const hostelOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleCheckout = () => {
    // Validate form
    if (!whatsappNumber || !hostelNumber || !roomNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    if (whatsappNumber.length < 10) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) {
    useEffect(() => {
      navigate('/checkout');
    }, [navigate]);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-nitebite-dark"
    >
      <Navbar transparent={false} />
      <main className="pt-24 pb-28 md:pb-16">
        <div className="page-container max-w-lg mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glassmorphic-ghost-button rounded-full mr-4 sticky top-24"
              onClick={() => navigate('/checkout')}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-nitebite-highlight">
              Order Details
            </h1>
          </div>
          
          <div className="glassmorphic-card p-4 md:p-6 rounded-2xl mb-8">
            <h2 className="text-xl font-medium text-nitebite-highlight mb-6">Delivery Information</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-nitebite-text mb-2">
                  WhatsApp Number
                </label>
                <Input
                  id="whatsapp"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Enter your WhatsApp number"
                  className="bg-nitebite-dark-accent/50 border-white/10 text-nitebite-text w-full focus:ring-nitebite-accent"
                />
              </div>
              
              <div>
                <label htmlFor="hostel" className="block text-sm font-medium text-nitebite-text mb-2">
                  Hostel Number
                </label>
                <Select value={hostelNumber} onValueChange={setHostelNumber}>
                  <SelectTrigger className="bg-nitebite-dark-accent/50 border-white/10 text-nitebite-text w-full focus:ring-nitebite-accent">
                    <SelectValue placeholder="Select your hostel" />
                  </SelectTrigger>
                  <SelectContent className="bg-nitebite-dark-accent border-white/10 text-nitebite-text">
                    {hostelOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        Hostel {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="room" className="block text-sm font-medium text-nitebite-text mb-2">
                  Room Number
                </label>
                <Input
                  id="room"
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="Enter your room number"
                  className="bg-nitebite-dark-accent/50 border-white/10 text-nitebite-text w-full focus:ring-nitebite-accent"
                />
              </div>
            </div>
          </div>
          
          <div className="glassmorphic-card p-4 md:p-6 rounded-2xl">
            <h2 className="text-xl font-medium text-nitebite-highlight mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-nitebite-text">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-nitebite-text">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-nitebite-text">
                <span>Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-white/10 my-2 pt-2"></div>
              
              <div className="flex justify-between font-medium text-nitebite-highlight">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Sticky Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-nitebite-dark/95 backdrop-blur-md border-t border-white/10 z-40">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-nitebite-text-muted text-center mb-3">
            Payment will be taken through COD or QR at the time of delivery.
          </p>
          <Button 
            className="w-full glassmorphic-button text-white py-6 text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-glow"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Checkout'}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
