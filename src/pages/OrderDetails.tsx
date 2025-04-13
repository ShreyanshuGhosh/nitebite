import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import PaymentOptions from './PaymentOptions';
import { supabase } from '@/lib/supabase';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { items, calculateSubtotal, clearCart, couponDiscount } = useCartStore();

  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [hostelNumber, setHostelNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "qr">("cod");

  useEffect(() => {
    if (items.length === 0) {
      navigate('/checkout');
      return;
    }
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to place an order');
        navigate('/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone_number, email, full_name')
        .eq('user_id', user.id)
        .single();
      if (profile) {
        setWhatsappNumber(profile.phone_number || '');
        setEmail(profile.email || '');
        setCustomerName(profile.full_name || '');
      }
    };
    checkUser();
  }, [items.length, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = calculateSubtotal();
  const freeDeliveryThreshold = 149;
  const remainingForFreeDelivery = subtotal < freeDeliveryThreshold ? freeDeliveryThreshold - subtotal : 0;
  const deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : 10;
  const convenienceFee = subtotal > 0 ? 6 : 0;
  const totalBeforeDiscount = subtotal + deliveryFee + convenienceFee;
  const total = totalBeforeDiscount - (couponDiscount ? Math.min(couponDiscount, subtotal) : 0);

  const hostelOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleCheckout = async () => {
    if (!whatsappNumber || !hostelNumber || !roomNumber || !email || !customerName) {
      toast.error('Please fill in all fields');
      return;
    }
    if (whatsappNumber.length < 10) {
      toast.error('Please enter a valid WhatsApp number');
      return;
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to place an order');
        navigate('/login');
        return;
      }
      
      const orderData = {
        user_id: user.id,
        amount: total,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        phone_number: whatsappNumber,
        hostel_number: hostelNumber,
        room_number: roomNumber,
        email,
        customer_name: customerName,
        payment_method: paymentMethod,
        payment_status: 'pending',
        coupon_discount: couponDiscount ? Math.min(couponDiscount, subtotal) : 0,
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
      if (error) throw error;

      if (couponDiscount && couponDiscount > 0) {
        const appliedCouponCode = "FIRSTBIT";
        const { data: couponData, error: couponError } = await supabase
          .from('coupons')
          .select('id')
          .eq('code', appliedCouponCode)
          .single();
        if (!couponError && couponData) {
          const couponId = couponData.id;
          const { error: usageError } = await supabase
            .from('coupon_usage')
            .insert([{ coupon_id: couponId, user_id: user.id, order_id: data.id }]);
          if (usageError) {
            console.error("Failed to record coupon usage", usageError);
          }
        } else {
          console.error("Failed to retrieve coupon id", couponError);
        }
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          phone_number: whatsappNumber,
          email,
          full_name: customerName,
        });
      if (profileError) {
        console.error('Failed to update profile:', profileError);
      }

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/account');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to place order. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentMethodChange = (method: "cod" | "qr") => {
    setPaymentMethod(method);
  };

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
            <h1 className="text-3xl font-bold text-nitebite-highlight">Order Details</h1>
          </div>

          <div className="glassmorphic-card p-4 md:p-6 rounded-2xl mb-8">
            <h2 className="text-xl font-medium text-nitebite-highlight mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-nitebite-text mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-nitebite-dark-accent/50 border-white/10 text-nitebite-text w-full focus:ring-nitebite-accent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nitebite-text mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-nitebite-dark-accent/50 border-white/10 text-nitebite-text w-full focus:ring-nitebite-accent"
                />
              </div>
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
            </div>
          </div>

          <div className="glassmorphic-card p-4 md:p-6 rounded-2xl mb-8">
            <h2 className="text-xl font-medium text-nitebite-highlight mb-6">Delivery Information</h2>
            <div className="space-y-6">
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

          <div className="glassmorphic-card p-4 md:p-6 rounded-2xl mb-8">
            <h2 className="text-xl font-medium text-nitebite-highlight mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-nitebite-text">
                <span>Subtotal</span>
                <span className="text-nitebite-highlight">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-nitebite-text">
                <span>Delivery Fee</span>
                <span className="text-nitebite-highlight">
                  {deliveryFee === 0 ? (
                    <span className="text-green-400">Free!</span>
                  ) : (
                    `₹${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-nitebite-text">
                <span>Convenience Fee</span>
                <span className="text-nitebite-highlight">₹{convenienceFee.toFixed(2)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-₹{Math.min(couponDiscount, subtotal).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-white/10 my-2 pt-2"></div>
              <div className="flex justify-between font-medium text-nitebite-highlight">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < freeDeliveryThreshold && subtotal > 0 && (
              <p className="text-sm text-amber-300 text-center mb-4">
                Add just ₹{remainingForFreeDelivery.toFixed(2)} more for free delivery!
              </p>
            )}
          </div>

          <PaymentOptions 
            selectedMethod={paymentMethod}
            onMethodChange={handlePaymentMethodChange}
            totalAmount={total}
          />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-nitebite-dark/95 backdrop-blur-md border-t border-white/10 z-40">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-nitebite-text-muted text-center mb-3">
            {paymentMethod === 'cod'
              ? 'Payment will be collected in cash at the time of delivery'
              : 'Please complete the payment using the QR code above'}
          </p>
          <Button
            className="w-full glassmorphic-button text-white py-6 text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-glow"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
