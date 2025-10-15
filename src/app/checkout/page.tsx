import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Smartphone } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    // Mock data
    const subtotal = 134.8;
    const tax = 10.78;
    const total = 145.58;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                                <CardDescription>Choose a payment method and enter your details.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="card" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="card"><CreditCard className="w-4 h-4 mr-1 inline"/>Card</TabsTrigger>
                                        <TabsTrigger value="upi"><Smartphone className="w-4 h-4 mr-1 inline"/>UPI</TabsTrigger>
                                        <TabsTrigger value="wallet"><Wallet className="w-4 h-4 mr-1 inline"/>Wallet</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="card" className="mt-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name on card</Label>
                                                <Input id="name" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="card-number">Card number</Label>
                                                <Input id="card-number" placeholder="**** **** **** 1234" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="expiry">Expiry</Label>
                                                    <Input id="expiry" placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvc">CVC</Label>
                                                    <Input id="cvc" placeholder="123" />
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="upi" className="mt-4">
                                        <div className="space-y-4">
                                            <Label htmlFor="upi-id">UPI ID</Label>
                                            <Input id="upi-id" placeholder="yourname@bank" />
                                            <p className="text-xs text-muted-foreground">A payment request will be sent to your UPI app.</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="wallet" className="mt-4">
                                         <p className="text-sm text-center text-muted-foreground py-8">Wallet integration coming soon!</p>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="md:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>Classic Burger x1</span><span>₹89.90</span></div>
                                    <div className="flex justify-between"><span>Fries x1</span><span>₹34.90</span></div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-muted-foreground"><span>Tax (8%)</span><span>₹{tax.toFixed(2)}</span></div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-xl">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                                    <Link href="/confirmation/xyz123">Pay ₹{total.toFixed(2)}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
