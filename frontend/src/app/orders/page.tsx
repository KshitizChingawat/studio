import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, ShoppingBag } from "lucide-react";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/types";
import { orders as fallbackOrders } from "@/lib/data";


const OrderCard = ({ order, isCurrent = false }: { order: Order, isCurrent?: boolean }) => (
    <Card className={isCurrent ? "bg-secondary" : "bg-card"}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg font-headline">Order #{order.id.toUpperCase()}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1">
                        <Clock className="h-4 w-4" /> 
                        {new Date(order.date).toLocaleString()}
                    </CardDescription>
                </div>
                 <Badge variant={order.status === "Picked Up" ? "default" : "secondary"}>
                    {order.status}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
             <Separator />
            <div className="flex justify-between items-center pt-4">
                <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-bold text-xl">₹{order.total.toFixed(2)}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link href={`/confirmation/${order.id}`}>
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default async function OrdersPage() {
    const orders = await getOrders().catch(() => fallbackOrders);
    const currentOrder = orders.find(o => o.status === "In Progress");
    const pastOrders = orders.filter(o => o.status !== "In Progress");

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-4 font-headline text-foreground flex items-center gap-2">
                           <ShoppingBag className="h-8 w-8" /> My Orders
                        </h1>
                    </div>

                    {currentOrder && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-primary">Current Order</h2>
                            <OrderCard order={currentOrder} isCurrent={true} />
                        </div>
                    )}
                    
                    <div className="space-y-4">
                         <h2 className="text-xl font-semibold text-foreground">Past Orders</h2>
                        {pastOrders.length > 0 ? (
                            pastOrders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                             <Card className="text-center p-8">
                                <p className="text-muted-foreground">You have no past orders.</p>
                             </Card>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
