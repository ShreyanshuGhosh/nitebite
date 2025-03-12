
import React from 'react';
import CategoryButton from './CategoryButton';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoriesSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}) => {
  return (
    <div className="w-20 flex-shrink-0 overflow-y-auto bg-nitebite-dark-accent border-r border-white/5">
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategorySelect(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoriesSidebar;
