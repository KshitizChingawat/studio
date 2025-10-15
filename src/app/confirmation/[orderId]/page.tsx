import { Header } from "@/components/header";
import { QrCodePlaceholder } from "@/components/qr-code-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage({ params }: { params: { orderId: string } }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-3 w-fit">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="mt-4 text-2xl font-headline">Order Confirmed!</CardTitle>
                        <CardDescription>Your order is being prepared. Show this QR code at the counter.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <QrCodePlaceholder />
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Order ID</span>
                                <span className="font-mono">{params.orderId.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pickup Time</span>
                                <span className="font-medium">11:30 AM</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Paid</span>
                                <span className="font-medium">₹145.58</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/dashboard">Back to Dashboard</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}
