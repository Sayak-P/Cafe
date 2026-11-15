"use client";

import React, { useState } from "react";
import { MapPin, Clock, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    // Simulate API call
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <footer id="contact" className="bg-brand-cream pt-24 pb-12 blob-t-r">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
          
          {/* Left Block */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
              Come visit us!
            </h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-brand-forest shrink-0" />
                <div>
                  <p className="font-bold text-brand-charcoal">123 Specialty Ave</p>
                  <p className="text-brand-brown">Coffee District, CD 10012</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-6 w-6 text-brand-forest shrink-0" />
                <div>
                  <p className="font-bold text-brand-charcoal">Opening Hours</p>
                  <p className="text-brand-brown">Daily: 08:00 - 21:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 text-brand-forest shrink-0" />
                <div>
                  <p className="font-bold text-brand-charcoal">Call Us</p>
                  <p className="text-brand-brown">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="mt-1 h-6 w-6 text-brand-forest shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <div>
                  <p className="font-bold text-brand-charcoal">Instagram</p>
                  <a href="https://instagram.com/leafandgrain" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-terracotta transition-colors">
                    @leafandgrain
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-4">
              Stay updated on news and special offers
            </h2>
            
            <form onSubmit={handleSubscribe} className="mt-8 flex w-full max-w-md flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Your e-mail"
                className={`w-full flex-1 rounded-full border-2 bg-white px-6 py-3 text-sm outline-none transition-colors focus:border-brand-forest ${
                  status === "error" ? "border-red-400" : "border-brand-sage/50"
                }`}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "newsletter-error" : status === "success" ? "newsletter-success" : undefined}
              />
              <Button type="submit" className="shrink-0 w-full sm:w-auto">
                Subscribe
              </Button>
            </form>

            {status === "success" && (
              <div id="newsletter-success" className="mt-3 flex items-center gap-2 text-sm text-brand-forest">
                <CheckCircle2 className="h-4 w-4" />
                <span>Thanks — you're subscribed!</span>
              </div>
            )}
            
            {status === "error" && (
              <div id="newsletter-error" className="mt-3 text-sm text-red-500">
                Please enter a valid email address.
              </div>
            )}

            {/* Decorative Illustration Space */}
            <div className="mt-12 opacity-40 flex justify-end pr-8" aria-hidden="true">
              <svg width="140" height="100" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-forest">
                {/* Table */}
                <path d="M60 40 L80 40" />
                <path d="M70 40 L70 80" />
                <path d="M60 80 L80 80" />
                {/* Left Chair */}
                <path d="M40 80 L40 50" />
                <path d="M40 50 L55 50" />
                <path d="M55 50 L55 80" />
                <path d="M40 40 L40 50" />
                <path d="M48 65 L55 65" />
                {/* Right Chair */}
                <path d="M100 80 L100 50" />
                <path d="M100 50 L85 50" />
                <path d="M85 50 L85 80" />
                <path d="M100 40 L100 50" />
                <path d="M92 65 L85 65" />
                {/* Plant on table */}
                <path d="M66 40 L66 35 L74 35 L74 40 Z" />
                <path d="M70 35 C70 30 65 25 65 25 C65 25 70 20 70 20 C70 20 75 25 75 25 C75 25 70 30 70 35 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-brand-sage/20 pt-8 sm:flex-row">
          <p className="text-sm text-brand-brown">
            © {new Date().getFullYear()} Leaf & Grain. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0 text-sm text-brand-brown">
            <a href="#" className="hover:text-brand-charcoal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-charcoal transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
