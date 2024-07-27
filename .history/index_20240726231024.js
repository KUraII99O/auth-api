require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const adminhash = bcrypt.hashSync("adminpassword", 10);
const cors = require("cors");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/farmdairy?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err));

const staffs = [];
const employees = [];
const milks = [];
const milksales = [];
const cowFeeds = [];
const routineMonitors = [];
const colors = [];
const vaccineMonitors = [];
const userTypes= [];
const stalls = [];
const designations  = [];
const cows = [];
const expenses = [];
const branches  = [];
const expensePurposes  = [];
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
        calves: 2,
        staffs: 10,
        cows: 10,
        usageHours: 10,
        pregnancies: 10,

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
        calves: 50,

        staffs: 50,
        cows: 50,
        usageHours: 50,
        pregnancies: 50,
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
        calves: 100,

        staffs: 100,
        cows: 100,
        usageHours: 100,
        pregnancies: 100,
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
        calves: Infinity,
        staffs: Infinity,
        cows: Infinity,
        usageHours: Infinity,
        pregnancies: Infinity,
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

app.use(express.json());
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

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const User = mongoose.model("User", {
  id: { type: String }, // Ensure id is a string
  email: String,
  username: String,
  password: String,
  plan: Object,
  type: String,
  name: String,
  mobile: String,
  designation: String,
  joiningDate: Date,
  permanentAddress: String,
  nid: String,
  image: String,
  userType: String,
  presentAddress: String,
  basicSalary: String,
  grossSalary: String,
  resignDate: Date,
  status: Boolean,
});

const Employee = require("./modles/Employee"); // Adjusted path
const Milk = require("./modles/Milk"); // Adjusted path
const Staff = require("./modles/Staff"); // Adjusted path
const MilkSale = require("./modles/MilkSale"); // Adjusted path
const CowFeed = require("./modles/CowFeed"); // Adjusted path
const RoutineMonitor = require("./modles/Routine"); // Adjusted path
const VaccineMonitor = require("./modles/vaccines"); // Adjusted path
const Stall = require("./modles/Stalls"); // Adjusted path
const Cow = require("./modles/Cows"); // Adjusted path
const Pregnancy = require("./modles/Pregnancies"); // Adjusted path
const ExpensePurpose = require("./modles/ExpensePurpose"); // Adjusted path
const Branch = require("./modles/Branch"); // Adjusted path
const UserType = require('./modles/UserType'); // Adjust the path to your UserType model
const Designation = require('./modles/Designation'); // Adjust the path to your UserType model
const Color = require('./modles/Colors'); // Adjust the path to your UserType model

const users = [
  {
    id: uuidv4(),
    username: "admin",
    email: "admin@admin.com",
    password: adminhash,
    type: "admin",
    Image: "https://picsum.photos/200/300",
  },
];

users
  .map((user) => new User({ ...user }))
  .forEach((user) => {
    // Save to MongoDB
    user
      .save()
      .then(() => console.log("User saved to MongoDB"))
      .catch((err) => console.error("Error saving user to MongoDB", err));
  });

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

  const newUser = new User({
    id: userId,
    email,
    username,
    password: hashedPassword,
    plan,
    type,
  });

  // Save to MongoDB
  newUser
    .save()
    .then(() => console.log("User saved to MongoDB"))
    .catch((err) => console.error("Error saving user to MongoDB", err));

  users.push(newUser); // Push to in-memory array

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

  try {
    // Check in-memory array first
    const userInMemory = users.find((u) => u.email === email);
    if (userInMemory) {
      const isMatch = await bcrypt.compare(password, userInMemory.password);
      if (isMatch) {
        return res.status(200).json({
          message: "Login successful (in memory)",
          user: userInMemory,
        });
      }
    }

    // If not found in-memory, check MongoDB
    const userInMongoDB = await User.findOne({ email });
    if (userInMongoDB) {
      const isMatch = await bcrypt.compare(password, userInMongoDB.password);
      if (isMatch) {
        return res
          .status(200)
          .json({ message: "Login successful (MongoDB)", user: userInMongoDB });
      }
    }

    return res.status(400).json({ error: "Invalid email or password" });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    await newUser.save(); // Save user to MongoDB

    users.push(newUser); // Add user to in-memory array (optional)

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get users
app.get("/users", async (req, res) => {
  try {
    let users = await User.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = users.filter((user) => user.userId === userId);
    } else {
      result = users; // Return all users (in-memory)
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to edit a user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const updatedUserMongo = await User.findOneAndUpdate({ id }, updatedUser, {
      new: true,
    });

    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = updatedUser; // Update in-memory user (optional)
    }

    res.json({
      message: "User data updated successfully",
      user: updatedUserMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.findOneAndDelete({ id }); // Delete from MongoDB

    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = users.splice(index, 1)[0]; // Delete from in-memory (optional)
      res.json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to toggle user status
app.put("/users/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    let users = await User.find();
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Toggle status
    user.status = !user.status;
    await user.save();

    res.json({
      message: "User status toggled successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a staff
app.post("/staffs", async (req, res) => {
  try {
    const newStaff = new Staff({ id: uuidv4(), ...req.body });
    await newStaff.save(); // Save staff to MongoDB
    staffs.push(newStaff); // Add staff to in-memory storage

    res
      .status(201)
      .json({ message: "Staff added successfully", staff: newStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get staffs
app.get("/staffs", async (req, res) => {
  try {
    const staffsFromDB = await Staff.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = staffsFromDB.filter((staff) => staff.userId === userId);
    } else {
      result = staffsFromDB; // Return all staffs
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to edit a staff
app.put("/staffs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaff = req.body;

    const updatedStaffMongo = await Staff.findOneAndUpdate(
      { id },
      updatedStaff,
      {
        new: true,
      }
    );

    const index = staffs.findIndex((staff) => staff.id === id);
    if (index !== -1) {
      staffs[index] = updatedStaffMongo; // Update in-memory storage
    }

    res.json({
      message: "Staff data updated successfully",
      staff: updatedStaffMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a staff
app.delete("/staffs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStaff = await Staff.findOneAndDelete({ id }); // Delete from MongoDB

    if (deletedStaff) {
      const index = staffs.findIndex((staff) => staff.id === id);
      if (index !== -1) {
        const deletedStaffInMemory = staffs.splice(index, 1)[0]; // Delete from in-memory storage
        res.json({
          message: "Staff deleted successfully",
          staff: deletedStaffInMemory,
        });
      } else {
        res.status(404).json({ error: "Staff not found in in-memory storage" });
      }
    } else {
      res.status(404).json({ error: "Staff not found in MongoDB" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to toggle staff status
app.put("/staffs/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    let staffs = await Staff.find();
    const staff = staffs.find((staff) => staff.id === id);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    // Toggle status
    staff.status = !staff.status;
    await staff.save();

    res.json({
      message: "Staff status toggled successfully",
      staff: staff,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a new employee
app.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee({ id: uuidv4(), ...req.body });
    await newEmployee.save(); // Save employee to MongoDB
    employees.push(newEmployee); // Add to in-memory storage

    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get employees
app.get("/employees", async (req, res) => {
  try {
    const employeesFromDB = await Employee.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = employeesFromDB.filter((employee) => employee.userId === userId);
    } else {
      result = employeesFromDB; // Return all employees
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to edit an employee
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;

    const updatedEmployeeMongo = await Employee.findOneAndUpdate(
      { id },
      updatedEmployee,
      {
        new: true,
      }
    );

    const index = employees.findIndex((employee) => employee.id === id);
    if (index !== -1) {
      employees[index] = updatedEmployeeMongo; // Update in-memory storage
    }

    res.json({
      message: "Employee data updated successfully",
      employee: updatedEmployeeMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete an employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ id }); // Delete from MongoDB

    if (deletedEmployee) {
      const index = employees.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        const deletedEmployeeInMemory = employees.splice(index, 1)[0]; // Delete from in-memory storage
        res.json({
          message: "Employee deleted successfully",
          employee: deletedEmployeeInMemory,
        });
      } else {
        res
          .status(404)
          .json({ error: "Employee not found in in-memory storage" });
      }
    } else {
      res.status(404).json({ error: "Employee not found in MongoDB" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a new milk
app.post("/milks", async (req, res) => {
  try {
    const newMilk = new Milk({ ...req.body });
    await newMilk.save(); // Save milk to MongoDB
    milks.push(newMilk); // Add to in-memory storage

    res.status(201).json({ message: "Milk added successfully", milk: newMilk });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get milks
app.get("/milks", async (req, res) => {
  try {
    const milksFromDB = await Milk.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = milksFromDB.filter((milk) => milk.userId === userId);
    } else {
      result = milksFromDB; // Return all milks
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to edit a milk
app.put("/milks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMilk = req.body;

    const updatedMilkMongo = await Milk.findOneAndUpdate({ id }, updatedMilk, {
      new: true,
    });

    const index = milks.findIndex((milk) => milk.id === id);
    if (index !== -1) {
      milks[index] = updatedMilkMongo; // Update in-memory storage
    }

    res.json({
      message: "Milk data updated successfully",
      milk: updatedMilkMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a milk
app.delete("/milks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMilk = await Milk.findOneAndDelete({ id }); // Delete from MongoDB

    const index = milks.findIndex((milk) => milk.id === id);
    if (index !== -1) {
      const deletedMilkInMemory = milks.splice(index, 1)[0]; // Delete from in-memory storage
      res.json({
        message: "Milk deleted successfully",
        milk: deletedMilkInMemory,
      });
    } else {
      res.status(404).json({ error: "Milk not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a milk sale
app.post("/milksales", async (req, res) => {
  try {
    const newMilkSale = new MilkSale({ id: uuidv4(), ...req.body });
    await newMilkSale.save(); // Save milk sale to MongoDB

    milksales.push(newMilkSale); // Add to in-memory storage

    res
      .status(201)
      .json({ message: "Milk sale added successfully", milkSale: newMilkSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Milk Sales Endpoint
app.get("/milksales", async (req, res) => {
  try {
    const { userId } = req.query;
    let milkSales;
    if (userId) {
      milkSales = await MilkSale.find({ userId });
    } else {
      milkSales = await MilkSale.find();
    }
    res.json(
      milkSales.concat(
        milksales.filter((milkSale) => !userId || milkSale.userId === userId)
      )
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Milk Sale Endpoint
app.put("/milksales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMilkSale = req.body;

    const updatedMilkSaleMongo = await MilkSale.findOneAndUpdate(
      { id },
      updatedMilkSale,
      {
        new: true,
      }
    );

    const index = milksales.findIndex((milkSale) => milkSale.id === id);
    if (index !== -1) {
      milksales[index] = updatedMilkSaleMongo; // Update in-memory storage
    }

    res.json({
      message: "Milk sale record updated successfully",
      milkSale: updatedMilkSaleMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Milk Sale Endpoint
app.delete("/milksales/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMilkSaleMongo = await MilkSale.findOneAndDelete({ id });

    let deletedMilkSaleInMemory = null;
    const index = milksales.findIndex((milkSale) => milkSale.id === id);
    if (index !== -1) {
      deletedMilkSaleInMemory = milksales.splice(index, 1)[0]; // Delete from in-memory storage
    }

    if (!deletedMilkSaleMongo && !deletedMilkSaleInMemory) {
      return res.status(404).json({ error: "Milk sale record not found" });
    }

    res.json({
      message: "Milk sale record deleted successfully",
      milkSale: deletedMilkSaleMongo || deletedMilkSaleInMemory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add cow feed data
app.post("/cowFeeds", async (req, res) => {
  try {
    const newCowFeed = new CowFeed({
      id: req.body.id, // Use custom id field
      date: new Date().toLocaleDateString(),
      ...req.body,
    });

    await newCowFeed.save(); // Save cow feed data to MongoDB

    res
      .status(201)
      .json({
        message: "Cow feed data collected successfully",
        data: newCowFeed,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all collected cow feed data
app.get("/cowFeeds", async (req, res) => {
  try {
    const cowFeedsFromDB = await CowFeed.find();
    res.json(cowFeeds.concat(cowFeedsFromDB)); // Merge in-memory and MongoDB data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Cow Feed Data Endpoint
app.put("/cowFeeds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCowFeed = req.body;

    const updatedCowFeedMongo = await CowFeed.findOneAndUpdate(
      { id: id },
      updatedCowFeed,
      {
        new: true,
      }
    );

    if (!updatedCowFeedMongo) {
      return res.status(404).json({ error: "Cow feed data not found" });
    }

    res.json({
      message: "Cow feed data updated successfully",
      data: updatedCowFeedMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Cow Feed Data Endpoint
app.delete("/cowFeeds/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCowFeedMongo = await CowFeed.findOneAndDelete({ id: id });

    if (!deletedCowFeedMongo) {
      return res.status(404).json({ error: "Cow feed data not found" });
    }

    res.json({
      message: "Cow feed data deleted successfully",
      data: deletedCowFeedMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Routine Monitor Endpoint
app.post("/routines", async (req, res) => {
  const newRoutineMonitor = { ...req.body };
  routineMonitors.push(newRoutineMonitor); // In-memory
  const routineMonitor = new RoutineMonitor(newRoutineMonitor); // MongoDB
  await routineMonitor.save();
  res.status(201).json({
    message: "Routine monitor added successfully",
    routineMonitor: newRoutineMonitor,
  });
});

// Get Routine Monitors Endpoint
app.get("/routines", async (req, res) => {
  const { userId } = req.query;
  const memoryResults = routineMonitors.filter(
    (routineMonitor) => routineMonitor.userId === userId
  );
  const dbResults = await RoutineMonitor.find({ userId });
  res.json([...memoryResults, ...dbResults]);
});

// Edit Routine Monitor Endpoint
app.put("/routines/:id", async (req, res) => {
  const { id } = req.params;
  const updatedRoutineMonitor = req.body;

  // In-memory update
  const index = routineMonitors.findIndex(
    (routineMonitor) => routineMonitor.id === id
  );
  if (index !== -1) {
    routineMonitors[index] = updatedRoutineMonitor;
  }

  // MongoDB update
  const routineMonitor = await RoutineMonitor.findOneAndUpdate(
    { id },
    updatedRoutineMonitor,
    { new: true }
  );
  if (!routineMonitor) {
    return res.status(404).json({ error: "Routine monitor record not found" });
  }

  res.json({
    message: "Routine monitor record updated successfully",
    routineMonitor: updatedRoutineMonitor,
  });
});

// Delete Routine Monitor Endpoint
app.delete("/routines/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = routineMonitors.findIndex(
    (routineMonitor) => routineMonitor.id === id
  );
  if (index !== -1) {
    routineMonitors.splice(index, 1);
  }

  // MongoDB delete
  const routineMonitor = await RoutineMonitor.findOneAndDelete({ id });
  if (!routineMonitor) {
    return res.status(404).json({ error: "Routine monitor record not found" });
  }

  res.json({
    message: "Routine monitor record deleted successfully",
    routineMonitor,
  });
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Vaccine Monitor Endpoint
app.post("/vaccines", async (req, res) => {
  const newVaccineMonitor = { ...req.body };
  vaccineMonitors.push(newVaccineMonitor); // In-memory
  const vaccineMonitor = new VaccineMonitor(newVaccineMonitor); // MongoDB
  await vaccineMonitor.save();
  res.status(201).json({
    message: "Vaccine monitor added successfully",
    vaccineMonitor: newVaccineMonitor,
  });
});

// Get Vaccine Monitors Endpoint
app.get("/vaccines", async (req, res) => {
  const { userId } = req.query;
  const memoryResults = vaccineMonitors.filter((vaccineMonitor) => vaccineMonitor.userId === userId);
  const dbResults = await VaccineMonitor.find({ userId });
  res.json([...memoryResults, ...dbResults]);
});

// Edit Vaccine Monitor Endpoint
app.put("/vaccines/:id", async (req, res) => {
  const { id } = req.params;
  const updatedVaccineMonitor = req.body;

  // In-memory update
  const index = vaccineMonitors.findIndex((vaccineMonitor) => vaccineMonitor.id === id);
  if (index !== -1) {
    vaccineMonitors[index] = updatedVaccineMonitor;
  }

  // MongoDB update
  const vaccineMonitor = await VaccineMonitor.findOneAndUpdate({ id }, updatedVaccineMonitor, { new: true });
  if (!vaccineMonitor) {
    return res.status(404).json({ error: "Vaccine monitor record not found" });
  }

  res.json({
    message: "Vaccine monitor record updated successfully",
    vaccineMonitor: updatedVaccineMonitor,
  });
});

// Delete Vaccine Monitor Endpoint
app.delete("/vaccines/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = vaccineMonitors.findIndex((vaccineMonitor) => vaccineMonitor.id === id);
  if (index !== -1) {
    vaccineMonitors.splice(index, 1);
  }

  // MongoDB delete
  const vaccineMonitor = await VaccineMonitor.findOneAndDelete({ id });
  if (!vaccineMonitor) {
    return res.status(404).json({ error: "Vaccine monitor record not found" });
  }

  res.json({
    message: "Vaccine monitor record deleted successfully",
    vaccineMonitor,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Stall Endpoint
app.post("/stalls", async (req, res) => {
  try {
    const newStall = new Stall({ id: uuidv4(), ...req.body });
    await newStall.save(); // Save stall to MongoDB
    stalls.push(newStall); // Add stall to in-memory storage

    res.status(201).json({ message: "Stall added successfully", stall: newStall });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Stalls Endpoint with Filtering
app.get("/stalls", async (req, res) => {
  try {
    const stallsFromDB = await Stall.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = stallsFromDB.filter((stall) => stall.userId === userId);
    } else {
      result = stallsFromDB; // Return all stalls
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Edit Stall Data Endpoint
app.put("/stalls/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStall = req.body;

    const updatedStallMongo = await Stall.findOneAndUpdate({ id }, updatedStall, { new: true });

    const index = stalls.findIndex((stall) => stall.id === id);
    if (index !== -1) {
      stalls[index] = updatedStallMongo; // Update in-memory storage
    }

    res.json({
      message: "Stall data updated successfully",
      stall: updatedStallMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Stall Data Endpoint
app.delete("/stalls/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStall = await Stall.findOneAndDelete({ id }); // Delete from MongoDB

    if (deletedStall) {
      const index = stalls.findIndex((stall) => stall.id === id);
      if (index !== -1) {
        const deletedStallInMemory = stalls.splice(index, 1)[0]; // Delete from in-memory storage
        res.json({
          message: "Stall deleted successfully",
          stall: deletedStallInMemory,
        });
      } else {
        res.status(404).json({ error: "Stall not found in in-memory storage" });
      }
    } else {
      res.status(404).json({ error: "Stall not found in MongoDB" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Toggle Stall Status Endpoint
app.put("/stalls/:id/toggle-status", async (req, res) => {
  const { id } = req.params;

  // In-memory update
  const index = stalls.findIndex((stall) => stall.id === parseInt(id));
  if (index !== -1) {
    stalls[index].status = !stalls[index].status;
  }

  // MongoDB update
  const stall = await Stall.findOne({ id: parseInt(id) });
  if (!stall) {
    return res.status(404).json({ error: "Stall not found" });
  }
  stall.status = !stall.status;
  await stall.save();

  res.json({
    message: "Stall status toggled successfully",
    stall: stall,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Cow Endpoint
app.post("/cows", async (req, res) => {
  const newCow = { ...req.body, date: new Date().toLocaleDateString() }; // Adding the current date

  // In-memory storage
  cows.push(newCow);

  // MongoDB storage
  const cow = new Cow(newCow);
  await cow.save();

  res.status(201).json({
    message: "Cow added successfully",
    data: newCow,
  });
});

// Get Cows Endpoint
app.get("/cows", async (req, res) => {
  const { stallNumber, userId } = req.query;  // Use req.query to access query parameters

  try {
    // Build the query object
    const query = {};
    if (stallNumber) query.stallNumber = stallNumber;
    if (userId) query.userId = userId;
    
    // Find cows based on the query object
    const dbResults = await Cow.find(query);
    
    res.json(dbResults);
  } catch (error) {
    console.error("Error fetching cow data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Edit Cow Data Endpoint
app.put("/cows/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCow = req.body;

  // In-memory update
  const index = cows.findIndex((data) => data.id === parseInt(id));
  if (index !== -1) {
    cows[index] = updatedCow;
  }

  // MongoDB update
  const cow = await Cow.findOneAndUpdate({ id: id }, updatedCow, { new: true });
  if (!cow) {
    return res.status(404).json({ error: "Cow not found" });
  }

  res.json({
    message: "Cow data updated successfully",
    data: updatedCow,
  });
});

// Delete Cow Data Endpoint
app.delete("/cows/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = cows.findIndex((data) => data.id === parseInt(id));
  if (index !== -1) {
    cows.splice(index, 1);
  }

  // MongoDB delete
  const cow = await Cow.findOneAndDelete({ id: id });
  if (!cow) {
    return res.status(404).json({ error: "Cow not found" });
  }

  res.json({ message: "Cow deleted successfully", data: cow });
});

// Toggle Cow Status Endpoint
app.put("/cows/:id/toggle-status", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the cow by ID
    const cow = await Cow.findOne({ id: id });
    if (!cow) {
      console.error(`Cow with ID ${id} not found in the database`);
      return res.status(404).json({ error: "Cow not found" });
    }

    // Log the current status
    console.log(`Current status of cow with ID ${id}:`, cow.status);

    // Toggle the status field
    cow.status = !cow.status;

    // Save the updated cow back to the database
    await cow.save();

    // Log the updated status
    console.log(`Updated status of cow with ID ${id}:`, cow.status);

    // Optionally update the in-memory storage if used
    const index = cows.findIndex((cow) => cow.id === parseInt(id));
    if (index !== -1) {
      cows[index].status = cow.status;
    }

    res.json({
      message: "Cow status toggled successfully",
      cow: cow,
    });
  } catch (error) {
    console.error(`Error toggling status for cow with ID ${id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/calves", (req, res) => {
  const newCalf = { ...req.body };
  const user = users.find((user) => user.id === newCalf.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (
    user.plan.features.limitations.calves ===
    calves.filter((calf) => calf.userId === newCalf.userId).length
  ) {
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

app.post("/pregnancies", asyncHandler(async (req, res) => {

  const newPregnancy = new Pregnancy({ id: uuidv4(), ...req.body });
  await newPregnancy.save(); // Save to MongoDB
  pregnancies.push(newPregnancy); // Save to in-memory storage

  res.status(201).json({ message: "Pregnancy added successfully", pregnancy: newPregnancy });
}));

app.get("/pregnancies", asyncHandler(async (req, res) => {
  const { userId, animalId } = req.query;

  let query = {};
  if (userId) query.userId = userId;
  if (animalId) query.animalId = animalId;

  const dbResults = await Pregnancy.find(query);
  res.json(dbResults);
}));

app.put("/pregnancies/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedPregnancy = req.body;

  // MongoDB update
  const pregnancy = await Pregnancy.findOneAndUpdate({ id: id }, updatedPregnancy, { new: true });
  if (!pregnancy) {
    return res.status(404).json({ error: "Pregnancy not found" });
  }

  // In-memory update
  const index = pregnancies.findIndex((data) => data.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Pregnancy not found" });
  }

  if (pregnancies[index].userId !== updatedPregnancy.userId) {
    return res.status(400).json({ error: "UserId mismatch" });
  }

  pregnancies[index] = updatedPregnancy;

  res.json({ message: "Pregnancy data updated successfully", data: updatedPregnancy });
}));

app.delete("/pregnancies/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Assuming userId is passed in the request body for verification

  // MongoDB delete
  const pregnancy = await Pregnancy.findOneAndDelete({ id: id });
  if (!pregnancy) {
    return res.status(404).json({ error: "Pregnancy not found" });
  }

  // In-memory delete
  const index = pregnancies.findIndex((data) => data.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Pregnancy not found" });
  }

  if (pregnancies[index].userId !== userId) {
    return res.status(400).json({ error: "UserId mismatch" });
  }

  const deletedPregnancy = pregnancies.splice(index, 1)[0];

  res.json({ message: "Pregnancy deleted successfully", data: deletedPregnancy });
}));

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
  res
    .status(201)
    .json({ message: "Expense added successfully", expense: newExpense });
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
  res.json({
    message: "Expense deleted successfully",
    expense: deletedExpense,
  });
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Expense Purpose Endpoint
app.post("/expense-purposes", async (req, res) => {
  const newExpensePurpose = { ...req.body, date: new Date().toLocaleDateString() }; // Adding the current date

  // In-memory storage
  expensePurposes.push(newExpensePurpose);

  // MongoDB storage
  const expensePurpose = new ExpensePurpose(newExpensePurpose);
  await expensePurpose.save();

  res.status(201).json({
    message: "Expense purpose added successfully",
    data: newExpensePurpose,
  });
});

// Get Expense Purposes Endpoint
app.get("/expense-purposes", async (req, res) => {
  const dbResults = await ExpensePurpose.find();
  res.json(dbResults);
});

// Edit Expense Purpose Data Endpoint
app.put("/expense-purposes/:id", async (req, res) => {
  const { id } = req.params;
  const updatedExpensePurpose = req.body;

  // In-memory update
  const index = expensePurposes.findIndex((data) => data.id === id);
  if (index !== -1) {
    expensePurposes[index] = updatedExpensePurpose;
  } else {
    return res.status(404).json({ error: "Expense purpose not found" });
  }

  // MongoDB update
  const expensePurpose = await ExpensePurpose.findOneAndUpdate({ id: id }, updatedExpensePurpose, { new: true });
  if (!expensePurpose) {
    return res.status(404).json({ error: "Expense purpose not found" });
  }

  res.json({
    message: "Expense purpose data updated successfully",
    data: updatedExpensePurpose,
  });
});

// Delete Expense Purpose Data Endpoint
app.delete("/expense-purposes/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = expensePurposes.findIndex((data) => data.id === id);
  if (index !== -1) {
    const deletedExpensePurpose = expensePurposes.splice(index, 1)[0];
    
    // MongoDB delete
    await ExpensePurpose.findOneAndDelete({ id: id });
    
    res.json({ message: "Expense purpose deleted successfully", data: deletedExpensePurpose });
  } else {
    return res.status(404).json({ error: "Expense purpose not found" });
  }
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/branches", async (req, res) => {
  try {
    const newBranch = { ...req.body, date: new Date().toLocaleDateString() };

    // In-memory storage
    branches.push(newBranch);

    // MongoDB storage
    const branch = new Branch(newBranch);
    await branch.save();

    res.status(201).json({
      message: "Branch added successfully",
      data: newBranch,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the branch." });
  }
});


app.get("/branches", async (req, res) => {
  try {
    const dbResults = await Branch.find();
    res.json(dbResults);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the branches." });
  }
});

// Update Branch Endpoint
app.put("/branches/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBranch = req.body;

  try {
    // MongoDB update
    const result = await Branch.findOneAndUpdate({ id: id }, updatedBranch, { new: true });
    if (!result) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.json({
      message: "Branch updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ error: "An error occurred while updating the branch" });
  }
});

// Delete Branch Endpoint
app.delete("/branches/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await Branch.findOneAndDelete({ id: id });
    if (!result) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.json({ message: "Branch deleted successfully", data: result });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ error: "An error occurred while deleting the branch" });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add UserType Endpoint
app.post("/userTypes", async (req, res) => {
  const newUserType = { ...req.body, date: new Date().toLocaleDateString() }; // Adding the current date

  // In-memory storage
  userTypes.push(newUserType);

  // MongoDB storage
  const userType = new UserType(newUserType);
  await userType.save();

  res.status(201).json({
    message: "UserType added successfully",
    data: newUserType,
  });
});

// Get UserTypes Endpoint
app.get("/userTypes", async (req, res) => {
  const dbResults = await UserType.find();
  res.json(dbResults);
});

// Edit UserType Data Endpoint
app.put("/userTypes/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUserType = req.body;

  // In-memory update
  const index = userTypes.findIndex((data) => data.id === id);
  if (index !== -1) {
    userTypes[index] = updatedUserType;
  }

  // MongoDB update
  const userType = await UserType.findOneAndUpdate({ id: id }, updatedUserType, { new: true });
  if (!userType) {
    return res.status(404).json({ error: "UserType not found" });
  }

  res.json({
    message: "UserType data updated successfully",
    data: updatedUserType,
  });
});

// Delete UserType Data Endpoint
app.delete("/userTypes/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = userTypes.findIndex((data) => data.id === id);
  if (index !== -1) {
    userTypes.splice(index, 1);
  }

  // MongoDB delete
  const userType = await UserType.findOneAndDelete({ id: id });
  if (!userType) {
    return res.status(404).json({ error: "UserType not found" });
  }

  res.json({ message: "UserType deleted successfully", data: userType });
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/designations", async (req, res) => {
  const newDesignation = { ...req.body, date: new Date().toLocaleDateString() };
  designations.push(newDesignation); // In-memory storage
  // MongoDB storage
  const designation = new Designation(newDesignation);
  await designation.save();
  res.status(201).json({ message: "Designation added successfully", data: newDesignation });
});

app.put("/designations/:id", async (req, res) => {
  const { id } = req.params;
  const updatedDesignation = req.body;
  const index = designations.findIndex((data) => data.id === id);
  if (index !== -1) {
    designations[index] = updatedDesignation; // In-memory update
  }
  const designation = await Designation.findOneAndUpdate({ id: id }, updatedDesignation, { new: true });
  if (!designation) {
    return res.status(404).json({ error: "Designation not found" });
  }
  res.json({ message: "Designation data updated successfully", data: updatedDesignation });
});

app.delete("/designations/:id", async (req, res) => {
  const { id } = req.params;
  const index = designations.findIndex((data) => data.id === id);
  if (index !== -1) {
    designations.splice(index, 1); // In-memory delete
  }
  const designation = await Designation.findOneAndDelete({ id: id });
  if (!designation) {
    return res.status(404).json({ error: "Designation not found" });
  }
  res.json({ message: "Designation deleted successfully", data: designation });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/colors", async (req, res) => {
  const newColor = { ...req.body, date: new Date().toLocaleDateString() };

  // In-memory storage
  colors.push(newColor);

  // MongoDB storage
  const color = new Color(newColor);
  await color.save();

  res.status(201).json({
    message: "Color added successfully",
    data: newColor,
  });
});

// Get Colors Endpoint
app.get("/colors", async (req, res) => {
  try {
    const colorsFromDB = await Color.find();
    const { userId } = req.query;
    let result;
    if (userId) {
      result = colorsFromDB.filter((color) => color.userId === userId);
    } else {
      result = colorsFromDB; // Return all colors
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Color Data Endpoint
app.put("/colors/:id", async (req, res) => {
  const { id } = req.params;
  const updatedColor = req.body;

  // In-memory update
  const index = colors.findIndex((data) => data.id === id);
  if (index !== -1) {
    colors[index] = { ...colors[index], ...updatedColor };
  }

  // MongoDB update
  const color = await Color.findByIdAndUpdate(id, updatedColor, { new: true });
  if (!color) {
    return res.status(404).json({ error: "Color not found" });
  }

  res.json({
    message: "Color data updated successfully",
    data: color,
  });
});

// Delete Color Data Endpoint
app.delete("/colors/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = colors.findIndex((data) => data.id === id);
  if (index !== -1) {
    colors.splice(index, 1);
  }

  // MongoDB delete
  const color = await Color.findByIdAndDelete(id);
  if (!color) {
    return res.status(404).json({ error: "Color not found" });
  }

  res.json({ message: "Color deleted successfully", data: color });
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
