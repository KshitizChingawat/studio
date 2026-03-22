// src/ai/flows/suggest-optimal-pickup-times.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow to suggest optimal pickup times for food orders.
 *
 * It takes into account vendor prep time and predicted demand to minimize user wait times and ensure order freshness.
 *
 * @exports {
 *   suggestOptimalPickupTimes,
 *   SuggestOptimalPickupTimesInput,
 *   SuggestOptimalPickupTimesOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalPickupTimesInputSchema = z.object({
  vendorId: z.string().describe('The ID of the vendor.'),
  menuItems: z
    .array(z.string())
    .describe('A list of menu item IDs selected by the user.'),
  currentTime: z.string().describe('The current time.'),
});
export type SuggestOptimalPickupTimesInput = z.infer<
  typeof SuggestOptimalPickupTimesInputSchema
>;

const SuggestOptimalPickupTimesOutputSchema = z.object({
  suggestedPickupTimes: z
    .array(z.string())
    .describe('A list of suggested pickup times.'),
});
export type SuggestOptimalPickupTimesOutput = z.infer<
  typeof SuggestOptimalPickupTimesOutputSchema
>;

export async function suggestOptimalPickupTimes(
  input: SuggestOptimalPickupTimesInput
): Promise<SuggestOptimalPickupTimesOutput> {
  return suggestOptimalPickupTimesFlow(input);
}

const suggestOptimalPickupTimesPrompt = ai.definePrompt({
  name: 'suggestOptimalPickupTimesPrompt',
  input: {schema: SuggestOptimalPickupTimesInputSchema},
  output: {schema: SuggestOptimalPickupTimesOutputSchema},
  prompt: `You are a food service expert, specialized in advising optimal pickup times for customers to minimize wait times and ensure food freshness.

  Given the following information, suggest 3 optimal pickup times for the user:

  Vendor ID: {{{vendorId}}}
  Menu Items: {{{menuItems}}}
  Current Time: {{{currentTime}}}

  Consider the vendor's prep time for the selected menu items and the predicted demand at different times.
  Return the suggested pickup times as a list of strings.
  Avoid suggesting times that are too close to the current time, and try to space them out evenly.
`,
});

const suggestOptimalPickupTimesFlow = ai.defineFlow(
  {
    name: 'suggestOptimalPickupTimesFlow',
    inputSchema: SuggestOptimalPickupTimesInputSchema,
    outputSchema: SuggestOptimalPickupTimesOutputSchema,
  },
  async input => {
    const {output} = await suggestOptimalPickupTimesPrompt(input);
    return output!;
  }
);
