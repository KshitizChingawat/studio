'use client';

import { Loader2 } from 'lucide-react';
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { suggestOptimalPickupTimes } from '@/ai/flows/suggest-optimal-pickup-times';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type SuggestPickupState = {
  suggestedPickupTimes: string[];
};

const initialState: SuggestPickupState = {
  suggestedPickupTimes: [],
};

async function suggestTimesAction(_prevState: SuggestPickupState, formData: FormData): Promise<SuggestPickupState> {
  const vendorId = formData.get('vendorId') as string;
  const menuItems = formData.getAll('menuItems').map(String);
  const currentTime = new Date().toISOString();

  try {
    const result = await suggestOptimalPickupTimes({
      vendorId,
      menuItems,
      currentTime,
    });
    
    // Fallback for demo purposes if AI returns nothing
    if (!result || !result.suggestedPickupTimes || result.suggestedPickupTimes.length === 0) {
      const now = new Date();
      return {
        suggestedPickupTimes: [
          'Immediately',
          new Date(now.getTime() + 15 * 60000).toISOString(),
          new Date(now.getTime() + 25 * 60000).toISOString(),
          new Date(now.getTime() + 40 * 60000).toISOString(),
        ],
      };
    }

    return {
      suggestedPickupTimes: ['Immediately', ...result.suggestedPickupTimes],
    };
  } catch (error) {
    console.error("Error suggesting pickup times:", error);
    const now = new Date();
    return {
        suggestedPickupTimes: [
          'Immediately',
          new Date(now.getTime() + 15 * 60000).toISOString(),
          new Date(now.getTime() + 25 * 60000).toISOString(),
          new Date(now.getTime() + 40 * 60000).toISOString(),
        ],
      };
  }
}

function SubmitButton({ disabled, hasSuggestions }: { disabled: boolean; hasSuggestions: boolean }) {
  const { pending } = useFormStatus();
  if (hasSuggestions) return null;

  return (
    <Button type="submit" disabled={disabled || pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Find Pickup Times'}
    </Button>
  );
}

export function TimeSlotSelector({ vendorId, cartItems }: { vendorId: string; cartItems: { id: string }[] }) {
  const [state, formAction] = useActionState(suggestTimesAction, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="vendorId" value={vendorId} />
      {cartItems.map((item, index) => (
        <input type="hidden" key={`${item.id}-${index}`} name="menuItems" value={item.id} />
      ))}
      
      <SubmitButton disabled={cartItems.length === 0} hasSuggestions={state.suggestedPickupTimes.length > 0} />

      {pending && state.suggestedPickupTimes.length === 0 && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Finding best times...</p>
        </div>
      )}

      {state.suggestedPickupTimes.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-2">Available Pickup Times</h4>
          <RadioGroup defaultValue={state.suggestedPickupTimes[0]} name="pickupTime" className="gap-2">
            {state.suggestedPickupTimes.map((time: string) => (
              <Label
                htmlFor={time}
                key={time}
                className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:checked]:border-accent transition-colors"
              >
                <RadioGroupItem
                  value={time}
                  id={time}
                  className="border-muted-foreground"
                />
                <span>
                  {time === 'Immediately'
                    ? 'Immediately'
                    : new Date(time).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      )}
    </form>
  );
}
