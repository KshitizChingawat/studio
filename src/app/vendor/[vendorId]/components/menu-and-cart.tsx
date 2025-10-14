'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2 } from 'lucide-react';
import type { MenuItem, vendors as VendorType } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { TimeSlotSelector } from './time-slot-selector';

type CartItem = MenuItem & { quantity: number };

export function MenuAndCart({
  vendor,
  menuItems,
}: {
  vendor: typeof VendorType[0];
  menuItems: MenuItem[];
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 font-headline">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => {
            const itemImage = getImage(item.imageId);
            return (
              <Card key={item.id} className="flex flex-col">
                <CardHeader className="flex flex-row gap-4 items-start">
                  {itemImage && (
                    <Image
                      src={itemImage.imageUrl}
                      alt={item.name}
                      data-ai-hint={itemImage.imageHint}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="flex justify-between items-center">
                  <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
                  <Button onClick={() => addToCart(item)} variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="font-headline">Your Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        {item.quantity === 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Separator />
            <div className="space-y-1">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
            <Separator />
            <TimeSlotSelector vendorId={vendor.id} cartItems={cart} />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-accent hover:bg-accent/90" disabled={cart.length === 0}>
                <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
