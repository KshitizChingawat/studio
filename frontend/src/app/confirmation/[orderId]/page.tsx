import { Header } from "@/components/header";
import { QrCodePlaceholder } from "@/components/qr-code-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/api";
import { orders as fallbackOrders } from "@/lib/data";

export default async function ConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const order = await getOrder(orderId).catch(() => fallbackOrders.find((entry) => entry.id === orderId) ?? null);

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

    const qrValue = JSON.stringify({
        orderId: order.id,
        pickupTime: order.pickupTime,
        total: order.total,
        items: order.items.map((item) => ({ id: item.id, quantity: item.quantity })),
    });

    return (
        <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(31,158,234,0.12),_transparent_25%),linear-gradient(180deg,_#fdf7ef_0%,_#f8fbff_55%,_#f2faf6_100%)]">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <Card className="w-full max-w-xl overflow-hidden rounded-[2rem] border-white/60 bg-white/85 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.4)] backdrop-blur">
                    <CardHeader className="text-center">
                        <div className={`mx-auto ${getStatusColor()} rounded-full p-4 w-fit shadow-sm`}>
                            {getStatusIcon()}
                        </div>
                        <CardTitle className="mt-4 text-3xl font-black font-headline tracking-[-0.04em]">Order {order.status}!</CardTitle>
                        <CardDescription>{getStatusDescription()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {order.status !== 'Cancelled' && (
                            <div className="rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(31,158,234,0.06),rgba(255,255,255,0.96))] p-5">
                                <div className="flex justify-center">
                                    <QrCodePlaceholder value={qrValue} title={`Order ${order.id.toUpperCase()} QR code`} />
                                </div>
                                <p className="mt-4 text-center text-sm text-muted-foreground">
                                    Present this live QR code at pickup. It contains your order number, pickup slot, and item summary.
                                </p>
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
