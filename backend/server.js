const express = require("express");
const cors = require("cors");
const {
  campuses,
  vendors,
  menuItems,
  orders,
  kdsOrders,
  vendorDashboard,
  vendorAccounts
} = require("./data");

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim().replace(/\/+$/, ""))
  : null;

app.use(cors({
  origin: (origin, callback) => {
    if (!allowedOrigins || !origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/+$/, "");
    return callback(null, allowedOrigins.includes(normalizedOrigin));
  }
}));
app.use(express.json());

function buildPickupTimes({ currentTime, menuItems: selectedItems }) {
  const base = new Date(currentTime);
  const baseMinutes = base.getMinutes();
  const remainder = baseMinutes % 15;
  const firstOffset = remainder === 0 ? 15 : 15 - remainder;
  const firstSlot = new Date(base.getTime() + firstOffset * 60000);

  return [
    firstSlot.toISOString(),
    new Date(firstSlot.getTime() + 15 * 60000).toISOString(),
    new Date(firstSlot.getTime() + 30 * 60000).toISOString()
  ];
}

function isStrongEnoughPassword(password) {
  return typeof password === "string" && password.trim().length >= 8;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/campuses", (_req, res) => {
  res.json(campuses);
});

app.post("/api/auth/student-login", (req, res) => {
  const { campusId, email, password } = req.body || {};
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedCampusId = String(campusId || "").trim();
  const campus = campuses.find((entry) => entry.id === normalizedCampusId);

  if (!campus || !normalizedEmail || !password) {
    return res.status(400).json({ message: "Campus, email, and password are required." });
  }

  if (!normalizedEmail.endsWith(`@${campus.emailDomain}`)) {
    return res.status(401).json({ message: `Use your ${campus.name} student email address.` });
  }

  if (!isStrongEnoughPassword(password)) {
    return res.status(401).json({ message: "Password must be at least 8 characters long." });
  }

  return res.json({
    ok: true,
    user: {
      campusId: campus.id,
      campusName: campus.name,
      email: normalizedEmail,
      role: "student"
    }
  });
});

app.post("/api/auth/vendor-login", (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const account = vendorAccounts.find((entry) => entry.email === normalizedEmail);

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (!account || account.password !== password) {
    return res.status(401).json({ message: "Invalid vendor credentials." });
  }

  return res.json({
    ok: true,
    user: {
      email: account.email,
      displayName: account.displayName,
      vendorId: account.vendorId,
      role: "vendor"
    }
  });
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
