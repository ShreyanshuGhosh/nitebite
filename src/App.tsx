import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { createContext, useContext } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { supabase } from "./supabaseClient";

import Index from "./pages/Index";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";

// Create Supabase Context
const SupabaseContext = createContext(supabase);
export const useSupabase = () => useContext(SupabaseContext);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SupabaseContext.Provider value={supabase}>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-details" element={<OrderDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AnimatePresence>
        </SupabaseContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;