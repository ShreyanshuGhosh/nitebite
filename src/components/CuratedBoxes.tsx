
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Leaf, BookOpen, Users, Zap } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CuratedBoxes = () => {
  const boxes = [
    {
      id: 'midnight-munchies',
      title: 'Midnight Munchies',
      tagline: 'Conquer those 2 AM cravings',
      description: 'Packed with chips, chocolates, and quick bites – everything you need when hunger strikes after hours.',
      cta: 'Grab the Munchies',
      ctaAlt: 'Feed Your Craving',
      icon: <span className="text-4xl">🍕</span>,
      color: 'from-purple-900 to-purple-700',
      iconBg: 'bg-purple-500/20',
      items: [
        { name: 'Chocolate Bar', image: '🍫', desc: 'Rich milk chocolate for sweet cravings' },
        { name: 'Potato Chips', image: '🥔', desc: 'Crispy, salted potato chips' },
        { name: 'Cheese Sticks', image: '🧀', desc: 'Cheesy, savory snacks' },
        { name: 'Instant Noodles', image: '🍜', desc: 'Quick, hot noodles for instant satisfaction' }
      ],
      LucideIcon: Users
    },
    {
      id: 'study-fuel',
      title: 'Study Night Pack',
      tagline: 'Power through papers & exams',
      description: 'Energy drinks, nuts, healthier snacks, and chocolate motivation.',
      cta: 'Fuel Your Brain',
      ctaAlt: 'Get Focused',
      icon: <span className="text-4xl">🧠</span>,
      color: 'from-indigo-900 to-indigo-700',
      iconBg: 'bg-indigo-500/20',
      items: [
        { name: 'Energy Drink', image: '🥤', desc: 'Caffeine boost to keep you alert' },
        { name: 'Mixed Nuts', image: '🥜', desc: 'Brain-boosting protein' },
        { name: 'Dark Chocolate', image: '🍫', desc: 'Antioxidant-rich mood booster' },
        { name: 'Granola Bars', image: '🥣', desc: 'Sustained energy release' }
      ],
      LucideIcon: BookOpen
    },
    {
      id: 'chakna-box',
      title: 'Hostel Hangout Pack',
      tagline: 'Your instant party starter kit',
      description: 'Shareable snacks for hangouts. Savory, crunchy, fun.',
      cta: 'Start the Party',
      ctaAlt: 'Share the Snacks',
      icon: <span className="text-4xl">🎉</span>,
      color: 'from-amber-900 to-amber-700',
      iconBg: 'bg-amber-500/20',
      items: [
        { name: 'Spicy Mix', image: '🌶️', desc: 'Fiery spiced snack mix' },
        { name: 'Pretzels', image: '🥨', desc: 'Crunchy, salted pretzels' },
        { name: 'Nachos & Dip', image: '🧀', desc: 'Crispy chips with tangy dip' },
        { name: 'Popcorn', image: '🍿', desc: 'Classic buttery popcorn' }
      ],
      LucideIcon: Zap
    },
    {
      id: 'healthy-choices',
      title: 'Smart Snacker',
      tagline: 'Snack smart, not hard',
      description: 'Baked snacks, fruit bars, nuts, dark chocolate.',
      cta: 'Choose Healthy-ish',
      ctaAlt: 'Snack Smarter',
      icon: <span className="text-4xl">🥗</span>,
      color: 'from-teal-900 to-teal-700',
      iconBg: 'bg-teal-500/20',
      items: [
        { name: 'Dried Fruits', image: '🍇', desc: 'Natural sweetness and fiber' },
        { name: 'Baked Chips', image: '🥔', desc: 'Less oil, all the flavor' },
        { name: 'Protein Bars', image: '🏋️', desc: 'Protein-packed energy boost' },
        { name: 'Seed Mix', image: '🌱', desc: 'Nutrient-dense mix of seeds' }
      ],
      LucideIcon: Leaf
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
      } 
    }
  };

  return (
    <div className="py-20 bg-nitebite-midnight relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-nitebite-purple">Curated Boxes on Demand</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Pre-packed boxes for every late-night scenario, delivered straight to your door
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {boxes.map((box, index) => (
            <motion.div 
              key={box.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="flex flex-col h-full"
            >
              <Card className={`h-full overflow-hidden bg-gradient-to-b ${box.color} border-none shadow-lg`}>
                <CardHeader className="pb-2">
                  <div className={`w-16 h-16 rounded-full ${box.iconBg} flex items-center justify-center mb-4`}>
                    <box.LucideIcon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">{box.title}</CardTitle>
                  <CardDescription className="text-white/90 text-lg font-medium">
                    {box.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white/80">
                  <p>{box.description}</p>
                  
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="items" className="border-white/20">
                      <AccordionTrigger className="text-nitebite-yellow hover:text-nitebite-yellow/80 text-sm">
                        What's Inside?
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 py-2">
                          {box.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <span className="text-xl">{item.image}</span>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-white/60 text-xs">{item.desc}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-auto">
                  <Button 
                    className="w-full glassmorphic-button border border-nitebite-yellow/20"
                    asChild
                  >
                    <Link to={`/box/${box.id}`}>
                      {box.cta}
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-white hover:text-nitebite-yellow hover:bg-white/5"
                    asChild
                  >
                    <Link to={`/box/${box.id}`}>
                      {box.ctaAlt}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CuratedBoxes;
