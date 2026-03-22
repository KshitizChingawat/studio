import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCodePlaceholder } from "@/components/qr-code-placeholder";
import { QrCode, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ScannerPage() {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Order Scanner</h1>
        <p className="text-muted-foreground">Scan a customer&apos;s QR code to mark their order as picked up.</p>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-64 h-64 bg-slate-900/80 rounded-lg flex items-center justify-center">
            <div className="w-48 h-48 border-4 border-dashed border-slate-500 rounded-md flex items-center justify-center">
                <QrCode className="w-16 h-16 text-slate-600" />
            </div>
          </div>
          
           <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <QrCode className="mr-2 h-4 w-4" /> Scan Order
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><CheckCircle className="text-green-500"/>Order Found</DialogTitle>
                    <DialogDescription>
                        Confirm the order details and mark as picked up.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="flex justify-center">
                      <QrCodePlaceholder size={120} />
                    </div>
                    <Separator/>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="font-medium">Order ID:</span> <span className="font-mono">XYZ123</span></div>
                        <div className="flex justify-between"><span className="font-medium">Customer:</span> <span>Jane Doe</span></div>
                        <div className="flex justify-between"><span className="font-medium">Items:</span> <span>2</span></div>
                    </div>
                    <Separator/>
                    <p className="font-semibold">Items:</p>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                        <li>Classic Burger x1</li>
                        <li>Fries x1</li>
                    </ul>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary">Cancel</Button>
                    <Button type="submit">Confirm Pickup</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        </CardContent>
      </Card>
    </div>
  );
}
