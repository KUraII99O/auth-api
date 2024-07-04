require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;
const adminhash = bcrypt.hashSync("adminpassword", 10);
const cors = require("cors");

const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@admin.com",
    password: adminhash,
    type: "admin",
    Image: "https://picsum.photos/200/300",
  },
];
const staffs = [];
const employees = [];
const milks = [];
const milksales = [];
const cowFeeds = [];
const routineMonitors = [];
const vaccineMonitors = [];
const stalls = [];
const expenses  = [];
const cows = [];
const calves = [];
const pregnancies = [];
const sales = [];
const subscriptionPlans = [
  {
    id: 1,
    name: "Free Plan",
    price: "0",
    features: {
      description: "Basic features",
      limitations: {
        calves:2,
        staffs:2,
        cows: 10,
        usageHours: 10,
      },
    },
  },
  {
    id: 2,
    name: "Small Plan",
    price: "100",
    features: {
      description: "Basic features + Additional features",
      limitations: {
        calves:50,

        staffs:50,
        cows: 50,
        usageHours: 50,
      },
    },
  },
  {
    id: 3,
    name: "Medium Plan",
    price: "200",
    features: {
      description: "Basic features + Additional features",
      limitations: {
        calves:100,

        staffs:100,
        cows: 100,
        usageHours: 100,
      },
    },
  },
  {
    id: 4,
    name: "Large Plan",
    price: "300",
    features: {
      description: "Basic features + Additional features + Premium support",
      limitations: {
        calves:Infinity,
        staffs: Infinity,
        cows: Infinity,
        usageHours: Infinity,
      },
    },
  },
];
const invoices = [];
let userPaymentMethods = {}; // Simulating a database with an in-memory object

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address stored in an environment variable
    pass: process.env.EMAIL_PASS, // Your email password stored in an environment variable
  },
});

app.use(express.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(cors());
app.use("/public", express.static("public"));

// User registration endpoint
function generateInvoice(user) {
  const startDate = new Date().toISOString();
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Due date is 30 days from now
  const paymentStatus = "unpaid";
  return {
    id: invoices.length + 1,
    userId: user.id,
    user: user.email,
    plan: user.plan.name,
    price: user.plan.price,
    features: user.plan.features,
    startDate: startDate,
    dueDate: dueDate,
    paymentStatus: paymentStatus,
  };
}

app.post("/register", async (req, res) => {
  const { email, password, planId, username } = req.body;
  const userExists = users.some((u) => u.email === email);

  if (userExists) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });
  }

  let plan;
  if (planId) {
    plan = subscriptionPlans.find((p) => p.id === planId);
  }

  // Assign the Free Plan if no planId is provided or if the plan is not found
  if (!plan) {
    plan = subscriptionPlans.find((p) => p.id === 1); // Default to Free Plan
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = uuidv4(); // Generate UUID for user ID
  const type = "user"; // Set default user type

  const newUser = {
    id: userId,
    email,
    username,
    password: hashedPassword,
    plan,
    type,
  };

  users.push(newUser);

  // Generate invoice only if plan is not Free Plan
  let newInvoice;
  if (plan.id !== 1) {
    // Check if plan is not Free Plan
    newInvoice = generateInvoice(newUser);
    invoices.push(newInvoice);
  }

  res.status(200).json({
    message: "Sign up successful",
    user: newUser,
    invoice: newInvoice, // Return invoice only if created
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add User Endpoint
app.post("/users", (req, res) => {
  const newUser = { ...req.body };
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
});

// Get Users Endpoint
app.get("/users", (req, res) => {
  const { userId } = req.query;
  res.json(users.filter((user) => user.userId === userId));
});

// Edit User Endpoint
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[index] = updatedUser;
  res.json({
    message: "User data updated successfully",
    user: updatedUser,
  });
});

// Delete User Endpoint
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: "User deleted successfully", user: deletedUser });
});

// Toggle User Status Endpoint
app.put("/users/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Toggle user status
  users[index].status = !users[index].status;
  res.json({
    message: "User status toggled successfully",
    user: users[index],
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/staffs", (req, res) => {
  const newStaff = { ...req.body };
  const user = users.find((user) => user.id === newStaff.userId);
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const currentStaffCount = staffs.filter(staff => staff.userId === newStaff.userId).length;

  if (user.plan.features.limitations.staffs === currentStaffCount) {
    return res.status(403).json({ error: "Limit has been reached" });
  }

  staffs.push(newStaff);
  res.status(201).json({ message: "Staff added successfully", staff: newStaff });
});

// Get Staffs Endpoint
app.get("/staffs", (req, res) => {
  const { userId } = req.query;
  res.json(staffs.filter((staff) => staff.userId === userId));
});

// Edit Staff Endpoint
app.put("/staffs/:id", (req, res) => {
  const { id } = req.params;
  const updatedStaff = req.body;
  const index = staffs.findIndex((staffMember) => staffMember.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Staff member not found" });
  }
  staffs[index] = updatedStaff;
  res.json({
    message: "Staff member data updated successfully",
    staff: updatedStaff,
  });
});

// Delete Staff Endpoint
app.delete("/staffs/:id", (req, res) => {
  const { id } = req.params;
  const index = staffs.findIndex((staffMember) => staffMember.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Staff member not found" });
  }

  const deletedStaff = staffs.splice(index, 1)[0];
  res.json({
    message: "Staff member deleted successfully",
    staff: deletedStaff,
  });
});

// Toggle Status Endpoint
app.put("/staffs/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = staffs.findIndex((staffMember) => staffMember.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Staff member not found" });
  }
  // Toggle staff status
  staffs[index].status = !staffs[index].status;
  res.json({
    message: "Staff member status toggled successfully",
    staff: staffs[index],
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/employees", (req, res) => {
  const newEmployee = { ...req.body };
  employees.push(newEmployee);
  res
    .status(201)
    .json({ message: "Employee added successfully", employee: newEmployee });
});

// Get Employees Endpoint
app.get("/employees", (req, res) => {
  const { userId } = req.query;
  res.json(employees.filter((employee) => employee.userId === userId));
});

// Edit Employee Endpoint
app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;
  const index = employees.findIndex((employee) => employee.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }
  employees[index] = updatedEmployee;
  res.json({
    message: "Employee data updated successfully",
    employee: updatedEmployee,
  });
});

// Delete Employee Endpoint
app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex((employee) => employee.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const deletedEmployee = employees.splice(index, 1)[0];
  res.json({
    message: "Employee deleted successfully",
    employee: deletedEmployee,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Milk Endpoint
app.post("/milks", (req, res) => {
  const newMilk = { ...req.body };
  milks.push(newMilk);
  res.status(201).json({ message: "Milk added successfully", milk: newMilk });
});

// Get Milks Endpoint
app.get("/milks", (req, res) => {
  const { userId } = req.query;
  res.json(milks.filter((milk) => milk.userId === userId));
});

// Edit Milk Endpoint
app.put("/milks/:id", (req, res) => {
  const { id } = req.params;
  const updatedMilk = req.body;
  const index = milks.findIndex((milk) => milk.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Milk record not found" });
  }
  milks[index] = updatedMilk;
  res.json({
    message: "Milk record updated successfully",
    milk: updatedMilk,
  });
});

// Delete Milk Endpoint
app.delete("/milks/:id", (req, res) => {
  const { id } = req.params;
  const index = milks.findIndex((milk) => milk.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Milk record not found" });
  }

  const deletedMilk = milks.splice(index, 1)[0];
  res.json({ message: "Milk record deleted successfully", milk: deletedMilk });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/milksales", (req, res) => {
  const newMilkSale = { ...req.body };
  milksales.push(newMilkSale);
  res
    .status(201)
    .json({ message: "Milk sale added successfully", milkSale: newMilkSale });
});

// Get Milk Sales Endpoint
app.get("/milksales", (req, res) => {
  const { userId } = req.query;
  res.json(milksales.filter((milkSale) => milkSale.userId === userId));
});

// Edit Milk Sale Endpoint
app.put("/milksales/:id", (req, res) => {
  const { id } = req.params;
  const updatedMilkSale = req.body;
  const index = milksales.findIndex((milkSale) => milkSale.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Milk sale record not found" });
  }
  milksales[index] = updatedMilkSale;
  res.json({
    message: "Milk sale record updated successfully",
    milkSale: updatedMilkSale,
  });
});

// Delete Milk Sale Endpoint
app.delete("/milksales/:id", (req, res) => {
  const { id } = req.params;
  const index = milksales.findIndex((milkSale) => milkSale.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Milk sale record not found" });
  }

  const deletedMilkSale = milksales.splice(index, 1)[0];
  res.json({
    message: "Milk sale record deleted successfully",
    milkSale: deletedMilkSale,
  });
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/cowFeeds", (req, res) => {
  const newcowFeeds = req.body;
  newcowFeeds.date = new Date().toLocaleDateString(); // Adding the current date

  cowFeeds.push(newcowFeeds);
  res
    .status(201)
    .json({ message: "Milk data collected successfully", data: newcowFeeds });
});

// Get all collected milk data
app.get("/cowFeeds", (req, res) => {
  res.json(cowFeeds);
});

// Edit Milk Data Endpoint (if needed)
app.put("/cowFeeds/:id", (req, res) => {
  const { id } = req.params;
  const updatedcowFeeds = req.body;
  const index = cowFeeds.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "cow Feeds not found" });
  }
  cowFeeds[index] = updatedcowFeeds;
  res.json({
    message: "cow Feeds data updated successfully",
    data: updatedcowFeeds,
  });
});

// Delete Milk Data Endpoint (if needed)
app.delete("/cowFeeds/:id", (req, res) => {
  const { id } = req.params;
  const index = cowFeeds.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Milk data not found" });
  }
  const deletedcowFeeds = cowFeeds.splice(index, 1)[0];
  res.json({
    message: "cow Feeds deleted successfully",
    data: deletedcowFeeds,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/routines", (req, res) => {
  const newRoutineMonitor = { ...req.body };
  routineMonitors.push(newRoutineMonitor);
  res.status(201).json({
    message: "Routine monitor added successfully",
    routineMonitor: newRoutineMonitor,
  });
});

// Get Routine Monitors Endpoint
app.get("/routines", (req, res) => {
  const { userId } = req.query;
  res.json(
    routineMonitors.filter((routineMonitor) => routineMonitor.userId === userId)
  );
});

// Edit Routine Monitor Endpoint
app.put("/routines/:id", (req, res) => {
  const { id } = req.params;
  const updatedRoutineMonitor = req.body;
  const index = routineMonitors.findIndex(
    (routineMonitor) => routineMonitor.id === id
  );
  if (index === -1) {
    return res.status(404).json({ error: "Routine monitor record not found" });
  }
  routineMonitors[index] = updatedRoutineMonitor;
  res.json({
    message: "Routine monitor record updated successfully",
    routineMonitor: updatedRoutineMonitor,
  });
});

// Delete Routine Monitor Endpoint
app.delete("/routines/:id", (req, res) => {
  const { id } = req.params;
  const index = routineMonitors.findIndex(
    (routineMonitor) => routineMonitor.id === id
  );
  if (index === -1) {
    return res.status(404).json({ error: "Routine monitor record not found" });
  }

  const deletedRoutineMonitor = routineMonitors.splice(index, 1)[0];
  res.json({
    message: "Routine monitor record deleted successfully",
    routineMonitor: deletedRoutineMonitor,
  });
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Vaccine Monitor Endpoint
app.post("/vaccines", (req, res) => {
  const newVaccineMonitor = { ...req.body };
  vaccineMonitors.push(newVaccineMonitor);
  res.status(201).json({
    message: "Vaccine monitor added successfully",
    vaccineMonitor: newVaccineMonitor,
  });
});

// Get Vaccine Monitors Endpoint
app.get("/vaccines", (req, res) => {
  const { userId } = req.query;
  res.json(
    vaccineMonitors.filter((vaccineMonitor) => vaccineMonitor.userId === userId)
  );
});

// Edit Vaccine Monitor Endpoint
app.put("/vaccines/:id", (req, res) => {
  const { id } = req.params;
  const updatedVaccineMonitor = req.body;
  const index = vaccineMonitors.findIndex(
    (vaccineMonitor) => vaccineMonitor.id === id
  );
  if (index === -1) {
    return res.status(404).json({ error: "Vaccine monitor record not found" });
  }
  vaccineMonitors[index] = updatedVaccineMonitor;
  res.json({
    message: "Vaccine monitor record updated successfully",
    vaccineMonitor: updatedVaccineMonitor,
  });
});

// Delete Vaccine Monitor Endpoint
app.delete("/vaccines/:id", (req, res) => {
  const { id } = req.params;
  const index = vaccineMonitors.findIndex(
    (vaccineMonitor) => vaccineMonitor.id === id
  );
  if (index === -1) {
    return res.status(404).json({ error: "Vaccine monitor record not found" });
  }

  const deletedVaccineMonitor = vaccineMonitors.splice(index, 1)[0];
  res.json({
    message: "Vaccine monitor record deleted successfully",
    vaccineMonitor: deletedVaccineMonitor,
  });
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/stalls", (req, res) => {
  const newstalls = req.body;

  newstalls.date = new Date().toLocaleDateString(); // Adding the current date
  stalls.push(newstalls);
  res.status(201).json({
    message: "routine Monitors collected successfully",
    data: newstalls,
  });
});

app.get("/stalls", (req, res) => {
  res.json(stalls);
});

// Edit stall Data Endpoint (if needed)
app.put("/stalls/:id", (req, res) => {
  const { id } = req.params;
  const updatedstalls = req.body;
  const index = stalls.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "stalls not found" });
  }
  stalls[index] = updatedstalls;
  res.json({
    message: "stalls  data updated successfully",
    data: updatedstalls,
  });
});

// Delete stall Data Endpoint (if needed)
app.delete("/stalls/:id", (req, res) => {
  const { id } = req.params;
  const index = stalls.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "stalls data not found" });
  }

  const deletedstalls = stalls.splice(index, 1)[0];
  res.json({ message: "stalls deleted successfully", data: deletedstalls });
});

app.put("/stalls/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = stalls.findIndex((stall) => stall.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "stall not found" });
  }

  // Toggle stall status
  stalls[index].status = !stalls[index].status;
  res.json({
    message: "stall status toggled successfully",
    stall: stalls[index],
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/cows", (req, res) => {
  const newCow = { ...req.body };
  const user = users.find((user) => user.id === newCow.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.plan.features.limitations.cows === cows.filter(cow => cow.userId === newCow.userId).length) {
    return res.status(403).json({ error: "Plan cow limitation reached" });
  }
  cows.push(newCow);
  res.status(201).json({ message: "Cow added successfully", cow: newCow });
});

// Get Cows Endpoint
app.get("/cows", (req, res) => {
  const { userId } = req.query;
  res.json(cows.filter((cow) => cow.userId === userId));
});

// Edit Cow Endpoint
app.put("/cows/:id", (req, res) => {
  const { id } = req.params;
  const updatedCow = req.body;
  const index = cows.findIndex((cow) => cow.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Cow not found" });
  }
  cows[index] = updatedCow;
  res.json({
    message: "Cow data updated successfully",
    cow: updatedCow,
  });
});

// Delete Cow Endpoint
app.delete("/cows/:id", (req, res) => {
  const { id } = req.params;
  const index = cows.findIndex((cow) => cow.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Cow not found" });
  }

  const deletedCow = cows.splice(index, 1)[0];
  res.json({
    message: "Cow deleted successfully",
    cow: deletedCow,
  });
});

// Toggle Status Endpoint
app.put("/cows/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = cows.findIndex((cow) => cow.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Cow not found" });
  }
  // Toggle cow status
  cows[index].status = !cows[index].status;
  res.json({
    message: "Cow status toggled successfully",
    cow: cows[index],
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/calves", (req, res) => {
  const newCalf = { ...req.body };
  const user = users.find((user) => user.id === newCalf.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.plan.features.limitations.calves === calves.filter(calf => calf.userId === newCalf.userId).length) {
    return res.status(403).json({ error: "Plan calf limitation reached" });
  }
  calves.push(newCalf);
  res.status(201).json({ message: "Calf added successfully", calf: newCalf });
});

// Get Calves Endpoint
app.get("/calves", (req, res) => {
  const { userId } = req.query;
  res.json(calves.filter((calf) => calf.userId === userId));
});

// Edit Calf Endpoint
app.put("/calves/:id", (req, res) => {
  const { id } = req.params;
  const updatedCalf = req.body;
  const index = calves.findIndex((calf) => calf.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Calf not found" });
  }
  calves[index] = updatedCalf;
  res.json({
    message: "Calf data updated successfully",
    calf: updatedCalf,
  });
});

// Delete Calf Endpoint
app.delete("/calves/:id", (req, res) => {
  const { id } = req.params;
  const index = calves.findIndex((calf) => calf.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Calf not found" });
  }

  const deletedCalf = calves.splice(index, 1)[0];
  res.json({
    message: "Calf deleted successfully",
    calf: deletedCalf,
  });
});

// Toggle Status Endpoint for Calf
app.put("/calves/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = calves.findIndex((calf) => calf.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Calf not found" });
  }
  // Toggle calf status
  calves[index].status = !calves[index].status;
  res.json({
    message: "Calf status toggled successfully",
    calf: calves[index],
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/pregnancies", (req, res) => {
  pregnancies.push(req.body);
  res
    .status(201)
    .json({ message: "Pregnancy added successfully", data: req.body });
});

app.get("/pregnancies", (req, res) => {
  const { animalId } = req.query;

  if (animalId) {
    // Filter pregnancies by animalId
    const filteredPregnancies = pregnancies.filter(
      (pregnancy) => pregnancy.animalId === animalId
    );
    res.json(filteredPregnancies);
  } else {
    // If no animalId provided, return all pregnancies
    res.json(pregnancies);
  }
});

app.put("/pregnancies/:id", (req, res) => {
  const { id } = req.params;

  const updatedPregnancy = req.body;
  const index = pregnancies.findIndex((data) => data.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Pregnancy not found" });
  }
  pregnancies[index] = updatedPregnancy;
  res.json({
    message: "Pregnancy data updated successfully",
    data: updatedPregnancy,
  });
});

app.delete("/pregnancies/:id", (req, res) => {
  const { id } = req.params;

  const index = pregnancies.findIndex((data) => data.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Pregnancy data not found" });
  }

  const deletedPregnancy = pregnancies.splice(index, 1)[0];
  res.json({
    message: "Pregnancy deleted successfully",
    data: deletedPregnancy,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Sale Endpoint
app.post("/sales", (req, res) => {
  const newSale = { ...req.body };
  sales.push(newSale);
  res.status(201).json({ message: "Sale added successfully", sale: newSale });
});

// Get Sales Endpoint
app.get("/sales", (req, res) => {
  const { userId } = req.query;
  res.json(sales.filter((sale) => sale.userId === userId));
});

// Edit Sale Endpoint
app.put("/sales/:id", (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;
  const index = sales.findIndex((sale) => sale.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Sale not found" });
  }
  sales[index] = updatedSale;
  res.json({
    message: "Sale data updated successfully",
    sale: updatedSale,
  });
});

// Delete Sale Endpoint
app.delete("/sales/:id", (req, res) => {
  const { id } = req.params;
  const index = sales.findIndex((sale) => sale.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Sale not found" });
  }
  const deletedSale = sales.splice(index, 1)[0];
  res.json({ message: "Sale deleted successfully", sale: deletedSale });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Expense Endpoint
app.post("/expenses", (req, res) => {
  const newExpense = { ...req.body };
  expenses.push(newExpense);
  res.status(201).json({ message: "Expense added successfully", expense: newExpense });
});

// Get Expenses Endpoint
app.get("/expenses", (req, res) => {
  const { userId } = req.query;
  res.json(expenses.filter((expense) => expense.userId === userId));
});

// Edit Expense Endpoint
app.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }
  expenses[index] = updatedExpense;
  res.json({
    message: "Expense data updated successfully",
    expense: updatedExpense,
  });
});

// Delete Expense Endpoint
app.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const deletedExpense = expenses.splice(index, 1)[0];
  res.json({ message: "Expense deleted successfully", expense: deletedExpense });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/reset-password-request", (req, res) => {
  const { email } = req.body;

  // Generate OTP (for simplicity, let's generate a 6-digit random number)
  const OTP = Math.floor(1000 + Math.random() * 9000);

  // Hash the OTP before sending it (optional)
  const hashedOTP = bcrypt.hashSync(OTP.toString(), 10);

  // Construct email message
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use the stored email address from environment variable
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${OTP}`,
  };

  // Send email with OTP
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send OTP email" });
    } else {
      console.log("Email sent:", info.response);
      // For security reasons, you might want to store hashedOTP in your database associated with the user's email
      res.status(200).json({ message: "OTP sent successfully" });
    }
  });
});

app.get("/admin/plans", (req, res) => {
  res.json(subscriptionPlans);
});

// Create a new subscription plan
app.post("/admin/plans", (req, res) => {
  const { name, price, features } = req.body;
  const plan = { id: subscriptionPlans.length + 1, name, price, features };
  subscriptionPlans.push(plan);
  res.status(201).json(plan);
});

// User API Resource

// User sign-in

// Fetch all users (for testing)
app.get("/users", (req, res) => {
  res.json(users);
});

// Fetch all plans
app.get("/plans", (req, res) => {
  res.json(subscriptionPlans);
});

// Fetch all invoices
app.get("/users/:id/invoices", (req, res) => {
  const { id } = req.params;
  res.json(invoices.filter((invoice) => invoice.userId === id));
});

app.get("/invoices/:id", (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find((inv) => inv.id === parseInt(id));
  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404).json({ error: "Invoice not found" });
  }
});

// Update invoice payment status
app.post("/invoices/pay/:id", (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find((invoice) => invoice.id === parseInt(id));

  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }

  invoice.paymentStatus = "paid";
  res.status(200).json({ message: "Payment successful", invoice });
});

app.put("/upgrade/:userId", (req, res) => {
  const { userId } = req.params;
  const { planId } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const currentPlan = user.plan;
  const newPlan = subscriptionPlans.find((p) => p.id === planId);
  if (!newPlan) {
    return res.status(400).json({ error: "Invalid plan ID" });
  }

  // Check if the user is already on the requested plan
  if (currentPlan.id === newPlan.id) {
    return res.status(400).json({ error: "User is already on this plan" });
  }

  // Update user's plan
  user.plan = newPlan;

  // Generate invoice for the new plan
  const newInvoice = generateInvoice(user);
  invoices.push(newInvoice);

  res.json({
    message: "Subscription plan upgraded successfully",
    user,
    invoice: newInvoice,
  });
});

app.put("/cancel/:userId", (req, res) => {
  const { userId } = req.params;

  // Find the user by userId
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Find the Free Plan
  const freePlan = subscriptionPlans.find((p) => p.name === "Free Plan");
  if (!freePlan) {
    return res.status(500).json({ error: "Free plan not found" });
  }

  // Remove invoices for the user
  const filteredInvoices = invoices.filter(
    (invoice) => invoice.user !== user.username
  );

  // Update user's plan to the Free Plan
  user.plan = freePlan;

  // Replace the original invoices array with the filtered one
  invoices.length = 0; // Clear the original array
  Array.prototype.push.apply(invoices, filteredInvoices); // Reassign filtered invoices

  res.json({
    message: "Subscription cancelled successfully. Reverted to free plan.",
    user,
  });
});

app.get("/users/:userId/payment-methods", (req, res) => {
  const userId = req.params.userId;
  const paymentMethods = userPaymentMethods[userId] || [];
  res.json({ methods: paymentMethods });
});

app.post("/users/:userId/payment-methods/credit-card", (req, res) => {
  const userId = req.params.userId;
  const { cardNumber, expiryDate, cvv } = req.body;
  if (!userPaymentMethods[userId]) {
    userPaymentMethods[userId] = [];
  }
  userPaymentMethods[userId].push({
    method: `Credit Card ending in ${cardNumber.slice(-4)}`,
    type: "creditCard",
  });
  res.json({ message: "Credit Card added successfully" });
});

app.post("/users/:userId/payment-methods/paypal", (req, res) => {
  const userId = req.params.userId;
  const { email } = req.body;
  if (!userPaymentMethods[userId]) {
    userPaymentMethods[userId] = [];
  }
  userPaymentMethods[userId].push({
    method: `PayPal (${email})`,
    type: "paypal",
  });
  res.json({ message: "PayPal account added successfully" });
});

app.post("/users/:userId/payment-methods/bank", (req, res) => {
  const userId = req.params.userId;
  const { accountNumber, bankName } = req.body;
  if (!userPaymentMethods[userId]) {
    userPaymentMethods[userId] = [];
  }
  userPaymentMethods[userId].push({
    method: `Bank Transfer (${bankName})`,
    type: "bank",
  });
  res.json({ message: "Bank account added successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
