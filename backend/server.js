const express = require("express");
const cors = require("cors");
const {
  campuses,
  vendors,
  menuItems,
  orders,
  kdsOrders,
  vendorDashboard
} = require("./data");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true
}));
app.use(express.json());

function buildPickupTimes({ currentTime, menuItems: selectedItems }) {
  const base = new Date(currentTime);
  const itemCount = Array.isArray(selectedItems) ? selectedItems.length : 0;
  const spacingMinutes = Math.max(10, itemCount * 5);

  return [
    "Immediately",
    new Date(base.getTime() + spacingMinutes * 60000).toISOString(),
    new Date(base.getTime() + (spacingMinutes + 10) * 60000).toISOString(),
    new Date(base.getTime() + (spacingMinutes + 25) * 60000).toISOString()
  ];
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/campuses", (_req, res) => {
  res.json(campuses);
});

app.get("/api/vendors", (_req, res) => {
  res.json(vendors);
});

app.get("/api/vendors/:vendorId", (req, res) => {
  const vendor = vendors.find((entry) => entry.id === req.params.vendorId);

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  return res.json(vendor);
});

app.get("/api/vendors/:vendorId/menu", (req, res) => {
  const vendorMenu = menuItems[req.params.vendorId];

  if (!vendorMenu) {
    return res.status(404).json({ message: "Vendor menu not found" });
  }

  return res.json(vendorMenu);
});

app.get("/api/orders", (_req, res) => {
  res.json(orders);
});

app.get("/api/orders/:orderId", (req, res) => {
  const order = orders.find((entry) => entry.id === req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json(order);
});

app.get("/api/vendor-admin/dashboard", (_req, res) => {
  res.json(vendorDashboard);
});

app.get("/api/vendor-admin/kds", (_req, res) => {
  res.json(kdsOrders);
});

app.post("/api/pickup-times", (req, res) => {
  const { vendorId, menuItems: selectedItems, currentTime } = req.body || {};

  if (!vendorId || !Array.isArray(selectedItems) || !currentTime) {
    return res.status(400).json({ message: "vendorId, menuItems, and currentTime are required" });
  }

  if (!vendors.find((entry) => entry.id === vendorId)) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  return res.json({
    suggestedPickupTimes: buildPickupTimes({
      currentTime,
      menuItems: selectedItems
    })
  });
});

app.listen(port, () => {
  console.log(`CampusPreorder backend listening on port ${port}`);
});
