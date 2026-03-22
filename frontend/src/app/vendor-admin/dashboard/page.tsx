import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, Users, Activity } from "lucide-react";
import { getVendorDashboard } from "@/lib/api";
import { orders as fallbackOrders } from "@/lib/data";

const fallbackVendorDashboard = {
  stats: [
    { title: "Today's Revenue", value: "₹12500.00", icon: "DollarSign", change: "+12.5%" },
    { title: "Today's Orders", value: "82", icon: "Package", change: "+5.1%" },
    { title: "New Customers", value: "12", icon: "Users", change: "+2" },
    { title: "Avg. Prep Time", value: "8m 15s", icon: "Activity", change: "-30s" },
  ],
  recentOrders: fallbackOrders.map((order) => ({
    id: order.id.toUpperCase(),
    customer: "Campus User",
    total: `₹${order.total.toFixed(2)}`,
    status: order.status,
  })),
};

const iconMap = {
  DollarSign,
  Package,
  Users,
  Activity,
};

export default async function VendorDashboard() {
  const { stats, recentOrders } = await getVendorDashboard().catch(() => fallbackVendorDashboard);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          (() => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];

            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from yesterday</p>
                </CardContent>
              </Card>
            );
          })()
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>A list of the most recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Picked Up' ? 'default' : order.status === 'In Progress' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
