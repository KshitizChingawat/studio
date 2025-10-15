import { Header } from "@/components/header";
import { QrCodePlaceholder } from "@/components/qr-code-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orders } from "@/lib/data";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ConfirmationPage({ params }: { params: { orderId: string } }) {
    const order = orders.find(o => o.id === params.orderId);

    if (!order) {
        notFound();
    }

    const getStatusIcon = () => {
        switch (order.status) {
            case 'Picked Up':
                return <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />;
            case 'Cancelled':
                 return <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />;
            default:
                return <AlertTriangle className="h-10 w-10 text-amber-600 dark:text-amber-400" />;
        }
    }

     const getStatusColor = () => {
        switch (order.status) {
            case 'Picked Up':
                return "bg-green-100 dark:bg-green-900";
            case 'Cancelled':
                 return "bg-red-100 dark:bg-red-900";
            default:
                return "bg-amber-100 dark:bg-amber-900";
        }
    }

    const getStatusDescription = () => {
        switch (order.status) {
            case 'Picked Up':
                return "This order has been successfully picked up.";
            case 'Cancelled':
                 return "This order has been cancelled.";
            case 'In Progress':
                return "Your order is being prepared. Show this QR code at the counter.";
            default:
                return "Your order is confirmed.";
        }
    }


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <div className={`mx-auto ${getStatusColor()} rounded-full p-3 w-fit`}>
                            {getStatusIcon()}
                        </div>
                        <CardTitle className="mt-4 text-2xl font-headline">Order {order.status}!</CardTitle>
                        <CardDescription>{getStatusDescription()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {order.status !== 'Cancelled' && (
                            <div className="flex justify-center">
                                <QrCodePlaceholder />
                            </div>
                        )}
                        <Separator />
                        <div className="space-y-2 text-sm">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Order ID</span>
                                <span className="font-mono">{order.id.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pickup Time</span>
                                <span className="font-medium">{order.pickupTime}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Paid</span>
                                <span className="font-medium">₹{order.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Separator />
                        <div>
                             <h3 className="font-semibold mb-2 text-sm">Items</h3>
                             <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} x {item.quantity}
                                    </li>
                                ))}
                             </ul>
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
