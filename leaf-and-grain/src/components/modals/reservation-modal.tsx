"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2 } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-brand-cream p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-brand-brown hover:text-brand-charcoal"
        >
          <X className="h-6 w-6" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 className="mb-4 h-16 w-16 text-brand-forest" />
            <h3 className="font-heading text-2xl font-bold text-brand-charcoal">
              Table Reserved!
            </h3>
            <p className="mt-2 text-brand-brown">
              We look forward to hosting you at Leaf & Grain.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal">
              Reserve a Table
            </h2>
            <p className="mt-2 text-sm text-brand-brown">
              Join us for specialty coffee and fresh pastries.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-charcoal">
                  Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded-2xl border-2 border-brand-sage bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-forest"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-brand-charcoal">
                  Contact (Email or Phone)
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded-2xl border-2 border-brand-sage bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-forest"
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-brand-charcoal">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full rounded-2xl border-2 border-brand-sage bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-forest"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-brand-charcoal">
                    Time
                  </label>
                  <input
                    required
                    type="time"
                    className="w-full rounded-2xl border-2 border-brand-sage bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-forest"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-brand-charcoal">
                  Party Size
                </label>
                <select className="w-full rounded-2xl border-2 border-brand-sage bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-forest">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" className="mt-4 w-full">
                Confirm Reservation
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
