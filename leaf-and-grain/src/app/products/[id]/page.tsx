"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import { getApiBaseUrl } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, setIsCartOpen } = useCart();

  const API_BASE = getApiBaseUrl();

  useEffect(() => {
    fetch(`${API_BASE}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setProduct(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-brand-cream"><Leaf className="h-8 w-8 animate-bounce text-brand-forest" /></div>;
  
  if (!product) return <div className="min-h-screen flex items-center justify-center bg-brand-cream text-xl font-bold">Product not found</div>;

  return (
    <div className="min-h-screen bg-brand-cream py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-sage/20 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 flex items-center justify-center bg-brand-sage/10 rounded-2xl p-12">
          {/* Placeholder for image */}
          <Leaf className="h-32 w-32 text-brand-sage/50" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="uppercase text-brand-forest text-sm font-bold tracking-wider mb-2">{product.category}</div>
          <h1 className="font-heading text-4xl font-bold text-brand-charcoal mb-4">{product.name}</h1>
          <p className="text-xl text-brand-terracotta font-bold mb-6">₹{product.price}</p>
          <p className="text-brand-brown mb-8 leading-relaxed">
            {product.description}
          </p>
          <Button 
            size="lg" 
            className="w-full md:w-auto"
            onClick={() => {
              addToCart({ id: product.id, name: product.name, price: product.price });
              setIsCartOpen(true);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
