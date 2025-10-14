import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, Users, Activity } from "lucide-react";

export default function VendorDashboard() {
  const stats = [
    { title: "Today's Revenue", value: "₹1,250.00", icon: DollarSign, change: "+12.5%" },
    { title: "Today's Orders", value: "82", icon: Package, change: "+5.1%" },
    { title: "New Customers", value: "12", icon: Users, change: "+2" },
    { title: "Avg. Prep Time", value: "8m 15s", icon: Activity, change: "-30s" },
  ];

  const recentOrders = [
    { id: "ORD001", customer: "Jane Doe", total: "₹22.50", status: "Picked Up" },
    { id: "ORD002", customer: "John Smith", total: "₹15.00", status: "In Progress" },
    { id: "ORD003", customer: "Sam Wilson", total: "₹8.99", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from yesterday</p>
            </CardContent>
          </Card>
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
