import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

// Utility to check if a string is a valid UUID
const isValidUUID = (value: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};

export function useProducts(categoryFilter?: string) {
  return useQuery<Product[], Error>({
    queryKey: ['products', categoryFilter],
    queryFn: async () => {
      let query;
      
      if (categoryFilter) {
        if (isValidUUID(categoryFilter)) {
          // Use category_id filtering if valid UUID
          query = supabase
            .from('products')
            .select('*')
            .eq('category_id', categoryFilter);
        } else {
          // Otherwise, assume it's a category name and join categories
          query = supabase
            .from('products')
            .select('*, categories!inner(*)')
            .eq('categories.name', categoryFilter);
        }
      } else {
        // No filtering applied
        query = supabase.from('products').select('*');
      }
      
      const { data, error } = await query;
      if (error) {
        throw error;
      }
      
      // Normalize image_url so it's always an array
      return (data || []).map((product: any) => ({
        ...product,
        image_url: product.image_url
          ? (Array.isArray(product.image_url)
              ? product.image_url
              : [product.image_url])
          : []
      })) as Product[];
    }
  });
}

export function useFeaturedProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(10);
      
      if (error) {
        throw error;
      }
      
      // Normalize image_url so it's always an array
      return (data || []).map((product: any) => ({
        ...product,
        image_url: product.image_url
          ? (Array.isArray(product.image_url)
              ? product.image_url
              : [product.image_url])
          : []
      })) as Product[];
    }
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      return data || [];
    }
  });
}
