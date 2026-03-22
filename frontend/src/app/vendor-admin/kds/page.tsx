import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getKdsOrders } from "@/lib/api";
import { kdsOrders as fallbackKdsOrders } from "@/lib/data";

export default async function KdsPage() {
    const kdsOrders = await getKdsOrders().catch(() => fallbackKdsOrders);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Kitchen Display Screen</h1>
            <Tabs defaultValue={Object.keys(kdsOrders)[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    {Object.keys(kdsOrders).map(time => (
                        <TabsTrigger key={time} value={time}>{time}</TabsTrigger>
                    ))}
                </TabsList>

                {Object.entries(kdsOrders).map(([time, orderData]) => (
                    <TabsContent key={time} value={time}>
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Order #{orderData.orderId}</CardTitle>
                                        <CardDescription>Pickup Time: {time}</CardDescription>
                                    </div>
                                    <Badge variant={orderData.status === "Pending" ? "destructive" : "secondary"}>{orderData.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Separator />
                                <div className="space-y-3">
                                    {orderData.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="font-medium text-lg">{item.name}</div>
                                            <div className="text-2xl font-bold text-primary">x {item.quantity}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
