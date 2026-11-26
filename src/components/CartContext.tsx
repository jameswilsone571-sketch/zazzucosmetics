"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CartDrawer } from "./CartDrawer";
import { products } from "@/lib/brand";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  shade?: string;
  image?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  add: (product: { id: string; name: string; price: number; image?: string }, shade?: string, quantity?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, quantity: number) => void;
  clear: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  toast: string | null;
  notify: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLines = window.localStorage.getItem("zazzu_cart");
      const savedWish = window.localStorage.getItem("zazzu_wishlist");
      if (savedLines) setLines(JSON.parse(savedLines) as CartLine[]);
      if (savedWish) setWishlist(JSON.parse(savedWish) as string[]);
    } catch { /* ignore malformed storage */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("zazzu_cart", JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("zazzu_wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const add = useCallback((product: { id: string; name: string; price: number; image?: string }, shade?: string, quantity = 1) => {
    const key = `${product.id}:${shade ?? "default"}`;
    setLines((current) => {
      const found = current.find((line) => line.key === key);
      if (found) return current.map((line) => line.key === key ? { ...line, quantity: line.quantity + quantity } : line);
      return [...current, { key, id: product.id, name: product.name, price: product.price, quantity, shade, image: product.image }];
    });
    setOpen(true);
    notify(`${product.name} added to your bag`);
  }, [notify]);

  const remove = useCallback((key: string) => setLines((current) => current.filter((line) => line.key !== key)), []);
  const setQty = useCallback((key: string, quantity: number) => {
    setLines((current) => quantity <= 0 ? current.filter((line) => line.key !== key) : current.map((line) => line.key === key ? { ...line, quantity } : line));
  }, []);
  const clear = useCallback(() => setLines([]), []);
  const toggleWishlist = useCallback((id: string) => {
    setWishlist((current) => {
      const exists = current.includes(id);
      notify(exists ? "Removed from wishlist" : "Saved to your wishlist");
      return exists ? current.filter((item) => item !== id) : [...current, id];
    });
  }, [notify]);

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.price * line.quantity, 0), [lines]);

  const value = useMemo(() => ({ lines, count, subtotal, isOpen, setOpen, add, remove, setQty, clear, wishlist, toggleWishlist, toast, notify }),
    [lines, count, subtotal, isOpen, add, remove, setQty, clear, wishlist, toggleWishlist, toast, notify]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-cocoa px-5 py-3 text-xs font-medium tracking-wide text-offwhite shadow-xl" role="status">
          {toast} ✓
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function suggestedProducts() {
  return products.filter((product) => product.badge === "Bestseller").slice(0, 2);
}
