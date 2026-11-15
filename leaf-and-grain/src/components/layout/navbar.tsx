"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { ReservationModal } from "@/components/modals/reservation-modal";
import { Leaf, Menu, X, ShoppingBag, Trash2, User as UserIcon } from "lucide-react";
import { getApiBaseUrl } from "@/lib/utils";

const API_BASE = getApiBaseUrl();

export function Navbar() {
  const { items, count, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const navLinks = [
    { name: "Menu", href: "/#menu" },
    { name: "About", href: "/#about" },
    { name: "Beans", href: "/#beans" },
    { name: "Delivery", href: "/#delivery" },
    { name: "Contact", href: "/#contact" },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-sage/20 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold leading-none text-brand-charcoal">
                  Leaf & Grain
                </span>
                <span className="text-xs font-medium text-brand-brown">
                  specialty coffee
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-brand-brown transition-colors hover:text-brand-terracotta"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right section: Cart + CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative hidden sm:flex items-center justify-center p-2 text-brand-charcoal hover:text-brand-terracotta transition-colors"
                aria-label="Toggle cart"
              >
                <ShoppingBag className="h-6 w-6" />
                {count > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-terracotta text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </button>

              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-3 text-brand-charcoal text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      <span>{user.name || user.email}</span>
                    </div>
                    <button
                      onClick={() => logout()}
                      className="text-xs text-brand-brown hover:text-brand-terracotta underline transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="text-sm font-medium text-brand-charcoal hover:text-brand-terracotta">
                    Login
                  </Link>
                )}
                <Button onClick={() => setIsReservationOpen(true)}>
                  Reserve a Table
                </Button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-brand-charcoal"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-cream border-t border-brand-sage/20 px-4 py-6 shadow-lg">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-brand-charcoal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="py-2 border-t border-brand-sage/20">
                {user ? (
                  <div className="flex items-center justify-between text-brand-charcoal text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      <span>{user.name || user.email}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="text-xs text-brand-brown hover:text-brand-terracotta underline"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-medium text-brand-charcoal hover:text-brand-terracotta"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-brand-charcoal"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium">Cart ({count})</span>
                </button>
                <Button onClick={() => { setIsReservationOpen(true); setIsMobileMenuOpen(false); }}>
                  Reserve
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full bg-brand-cream shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-brand-sage/20 p-6">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-brand-brown hover:text-brand-charcoal">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-brand-brown text-center">
                  <ShoppingBag className="h-12 w-12 mb-4 opacity-50" />
                  <p>Your cart is empty.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setIsCartOpen(false)}>
                    Continue Browsing
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border-b border-brand-sage/10 pb-4">
                      <div>
                        <p className="font-bold text-brand-charcoal">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-5 w-5 items-center justify-center rounded border border-brand-sage/40 text-xs text-brand-brown hover:bg-brand-sage/20 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold text-brand-charcoal px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-5 w-5 items-center justify-center rounded border border-brand-sage/40 text-xs text-brand-brown hover:bg-brand-sage/20 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <span className="text-sm text-brand-brown ml-1">× ₹{item.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-brand-charcoal">₹{item.price * item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-brand-sage/20 p-6 bg-brand-cream">
                <div className="flex justify-between text-lg font-bold text-brand-charcoal mb-4">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {checkoutMessage && <div className="text-center text-sm font-medium text-brand-forest mb-4">{checkoutMessage}</div>}
                <Button
                  className="w-full"
                  disabled={isCheckingOut}
                  onClick={async () => {
                    if (!user) {
                      setIsCartOpen(false);
                      router.push('/login');
                      return;
                    }
                    setIsCheckingOut(true);
                    setCheckoutMessage('');
                    try {
                      const res = await fetch(`${API_BASE}/api/orders`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })) }),
                        credentials: 'include'
                      });
                      if (res.ok) {
                        setCheckoutMessage('Order placed successfully!');
                        setTimeout(() => {
                          clearCart();
                          setCheckoutMessage('');
                          setIsCartOpen(false);
                        }, 2000);
                      } else {
                        const data = await res.json().catch(() => ({}));
                        setCheckoutMessage(data.error || 'Failed to place order.');
                      }
                    } catch (err) {
                      setCheckoutMessage('Error placing order.');
                    } finally {
                      setIsCheckingOut(false);
                    }
                  }}
                >
                  {isCheckingOut ? 'Processing...' : user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  );
}
