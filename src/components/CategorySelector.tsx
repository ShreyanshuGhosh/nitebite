
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'chips', name: 'Chips', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'chocolate', name: 'Chocolate', icon: '🍫' },
  { id: 'biscuits', name: 'Biscuits', icon: '🍪' },
];

const CategorySelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('chips');

  return (
    <div className="py-10 md:py-16 bg-nitebite-dark-accent">
      <div className="page-container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 animate-fade-in">Categories</h2>
          <p className="text-nitebite-text-muted max-w-2xl mx-auto text-sm md:text-base animate-fade-in" style={{ animationDelay: '100ms' }}>
            Browse our selection of midnight munchies and quick bites.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onClick, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      onClick={onClick}
      className={cn(
        "relative p-4 md:p-6 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden touch-manipulation",
        isSelected
          ? "glass-card border-nitebite-accent shadow-lg"
          : "bg-nitebite-dark/50 border border-white/5 hover:border-white/10 active:scale-95"
      )}
    >
      <div className="text-center">
        <span className="text-3xl md:text-4xl mb-2 md:mb-3 block">{category.icon}</span>
        <h3 className={cn(
          "text-sm md:text-base font-medium transition-colors duration-300",
          isSelected ? "text-nitebite-highlight" : "text-nitebite-text"
        )}>
          {category.name}
        </h3>
      </div>
      
      {isSelected && (
        <motion.div
          layoutId="selectedCategory"
          className="absolute inset-0 bg-nitebite-accent/10 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default CategorySelector;
