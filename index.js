require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const app = express();
const adminhash = bcrypt.hashSync("adminpassword", 10);
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://faresjguerim90:nCHCn6EF24Ga3ENC@gescowcluster.kbgd4.mongodb.net/gescow?retryWrites=true&w=majority&appName=gescowcluster"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database", err));

const staffs = [];
const employees = [];
const milks = [];
const milksales = [];
const cowFeeds = [];
const foodItems = [];
const suppliers = [];
const routineMonitors = [];
const animalTypes = [];
const colors = [];
const vaccineMonitors = [];
const userTypes = [];
const stalls = [];
const designations = [];
const cows = [];
const expenses = [];
const branches = [];
const expensePurposes = [];
const monitoringServices = [];
const calfs = [];
const pregnancies = [];
const cowSales = [];
const vaccines = [];
const foodUnits = [];
const subscriptionPlans = [
  {
    id: 1,
    name: "Free Plan",
    price: "0",
    features: {
      description: "Basic features",
      limitations: {
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

app.use(express.static(path.join(__dirname, "../Farm-Dairy/dist"))); // Use 'dist' or 'build' depending on your setup
app.use(cors({
  origin: 'https://farm-dairy.vercel.app',  // Allow only your Vercel frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],     // Allow specific headers
  credentials: true  // Enable if you're sending cookies or auth tokens
}));

app.use("/public", express.static("public"));
app.use(express.json());
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

const asyncHandler = (fn) => (req, res, next) => {
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
const VaccineMonitor = require("./modles/VaccineMonitor"); // Adjusted path
const Stall = require("./modles/Stalls"); // Adjusted path
const Cow = require("./modles/Cows"); // Adjusted path
const Pregnancy = require("./modles/Pregnancies"); // Adjusted path
const ExpensePurpose = require("./modles/ExpensePurpose"); // Adjusted path
const Branch = require("./modles/Branch"); // Adjusted path
const UserType = require("./modles/UserType"); // Adjust the path to your UserType model
const Designation = require("./modles/Designation"); // Adjust the path to your UserType model
const Color = require("./modles/Colors"); // Adjust the path to your UserType model
const AnimalType = require("./modles/AnimalTypes"); // Adjust the path to your UserType model
const FoodUnit = require("./modles/FoodUnit"); // Adjust the path to your UserType model
const Supplier = require("./modles/Suppliers"); // Adjust the path to your UserType model
const FoodItem = require("./modles/FoodItem"); // Adjust the path to your UserType model
const MonitoringService = require("./modles/MonitoringService"); // Adjust the path to your UserType model
const CowSale = require("./modles/CowSale"); // Adjust the path to your UserType model
const Vaccine = require("./modles/Vaccines"); // Adjust the path to your UserType model
const Calf = require("./modles/Calfs"); // Adjust the path to your UserType model

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


  app.get("/",(req,res)=>{

    res.json("hello")
  }
)
app.post("/api/register", async (req, res) => {
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

app.post("/api/login", async (req, res) => {
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
app.post("/api/users", async (req, res) => {
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
app.get("/api/users", async (req, res) => {
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
app.put("/api/users/:id", async (req, res) => {
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
app.delete("/api/users/:id", async (req, res) => {
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
app.put("/api/users/:id/toggle-status", async (req, res) => {
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
app.post("/api/staffs", async (req, res) => {
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
app.get("/api/staffs", async (req, res) => {
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
app.put("/api/staffs/:id", async (req, res) => {
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
app.delete("/api/staffs/:id", async (req, res) => {
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
app.put("/api/staffs/:id/toggle-status", async (req, res) => {
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
app.post("/api/employees", async (req, res) => {
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
app.get("/api/employees", async (req, res) => {
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
app.put("/api/employees/:id", async (req, res) => {
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
app.delete("/api/employees/:id", async (req, res) => {
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
app.post("/api/milks", async (req, res) => {
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
app.get("/api/milks", async (req, res) => {
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
app.put("/api/milks/:id", async (req, res) => {
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
app.delete("/api/milks/:id", async (req, res) => {
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
app.post("/api/milksales", async (req, res) => {
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
app.get("/api/milksales", async (req, res) => {
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
app.put("/api/milksales/:id", async (req, res) => {
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
app.delete("/api/milksales/:id", async (req, res) => {
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
app.post("/api/cowFeeds", async (req, res) => {
  try {
    const newCowFeed = new CowFeed({
      id: req.body.id, // Use custom id field
      date: new Date().toLocaleDateString(),
      ...req.body,
    });

    await newCowFeed.save(); // Save cow feed data to MongoDB

    res.status(201).json({
      message: "Cow feed data collected successfully",
      data: newCowFeed,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all collected cow feed data
app.get("/api/cowFeeds", async (req, res) => {
  try {
    const cowFeedsFromDB = await CowFeed.find();
    res.json(cowFeeds.concat(cowFeedsFromDB)); // Merge in-memory and MongoDB data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Cow Feed Data Endpoint
app.put("/api/cowFeeds/:id", async (req, res) => {
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
app.delete("/api/cowFeeds/:id", async (req, res) => {
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
app.post("/api/routines", async (req, res) => {
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
app.get("/api/routines", async (req, res) => {
  const { userId } = req.query;
  const memoryResults = routineMonitors.filter(
    (routineMonitor) => routineMonitor.userId === userId
  );
  const dbResults = await RoutineMonitor.find({ userId });
  res.json([...memoryResults, ...dbResults]);
});

// Edit Routine Monitor Endpoint
app.put("/api/routines/:id", async (req, res) => {
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
app.delete("/api/routines/:id", async (req, res) => {
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
app.post("/api/vaccines-monitor", async (req, res) => {
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
app.get("/api/vaccines-monitor", async (req, res) => {
  const { userId } = req.query;
  const memoryResults = vaccineMonitors.filter(
    (vaccineMonitor) => vaccineMonitor.userId === userId
  );
  const dbResults = await VaccineMonitor.find({ userId });
  res.json([...memoryResults, ...dbResults]);
});

// Edit Vaccine Monitor Endpoint
app.put("/api/vaccines-monitor/:id", async (req, res) => {
  const { id } = req.params;
  const updatedVaccineMonitor = req.body;

  // In-memory update
  const index = vaccineMonitors.findIndex(
    (vaccineMonitor) => vaccineMonitor.id === id
  );
  if (index !== -1) {
    vaccineMonitors[index] = updatedVaccineMonitor;
  }

  // MongoDB update
  const vaccineMonitor = await VaccineMonitor.findOneAndUpdate(
    { id },
    updatedVaccineMonitor,
    { new: true }
  );
  if (!vaccineMonitor) {
    return res.status(404).json({ error: "Vaccine monitor record not found" });
  }

  res.json({
    message: "Vaccine monitor record updated successfully",
    vaccineMonitor: updatedVaccineMonitor,
  });
});

// Delete Vaccine Monitor Endpoint
app.delete("/api/vaccines-monitor/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = vaccineMonitors.findIndex(
    (vaccineMonitor) => vaccineMonitor.id === id
  );
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
app.post("/api/stalls", async (req, res) => {
  try {
    const newStall = new Stall({ id: uuidv4(), ...req.body });
    await newStall.save(); // Save stall to MongoDB
    stalls.push(newStall); // Add stall to in-memory storage

    res
      .status(201)
      .json({ message: "Stall added successfully", stall: newStall });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Stalls Endpoint with Filtering
app.get("/api/stalls", async (req, res) => {
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
app.put("/api/stalls/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStall = req.body;

    const updatedStallMongo = await Stall.findOneAndUpdate(
      { id },
      updatedStall,
      { new: true }
    );

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
app.delete("/api/stalls/:id", async (req, res) => {
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
app.put("/api/stalls/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;

    const stall = await Stall.findOne({ id });
    if (!stall) {
      return res.status(404).json({ error: "Stall not found" });
    }

    // Toggle status
    stall.status = !stall.status;
    await stall.save();

    // Update in-memory storage
    const index = stalls.findIndex((s) => s.id === id);
    if (index !== -1) {
      stalls[index].status = stall.status;
    }

    res.json({
      message: "Stall status toggled successfully",
      stall: stall,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Cow Endpoint
app.post("/api/cows", async (req, res) => {
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
app.get("/api/cows", async (req, res) => {
  const { stallNumber, userId } = req.query; // Use req.query to access query parameters

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
app.put("/api/cows/:id", async (req, res) => {
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
app.delete("/api/cows/:id", async (req, res) => {
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
app.put("/api/cows/:id/toggle-status", async (req, res) => {
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

app.post("/api/calfs", async (req, res) => {
  const newCalf = { ...req.body, date: new Date().toLocaleDateString() }; // Adding the current date

  // In-memory storage
  calfs.push(newCalf);

  // MongoDB storage
  const calf = new Calf(newCalf);
  await calf.save();

  res.status(201).json({
    message: "Calf added successfully",
    data: newCalf,
  });
});

// Get Calfs Endpoint
app.get("/api/calfs", async (req, res) => {
  const { stallNumber, userId } = req.query; // Use req.query to access query parameters

  try {
    // Build the query object
    const query = {};
    if (stallNumber) query["informations.stallNumber"] = stallNumber;
    if (userId) query.userId = userId;

    // Find calfs based on the query object
    const dbResults = await Calf.find(query);

    res.json(dbResults);
  } catch (error) {
    console.error("Error fetching calf data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Edit Calf Data Endpoint
app.put("/api/calfs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCalf = req.body;

  // In-memory update
  const index = calfs.findIndex((data) => data.id === parseInt(id));
  if (index !== -1) {
    calfs[index] = updatedCalf;
  }

  // MongoDB update
  const calf = await Calf.findOneAndUpdate({ id: id }, updatedCalf, {
    new: true,
  });
  if (!calf) {
    return res.status(404).json({ error: "Calf not found" });
  }

  res.json({
    message: "Calf data updated successfully",
    data: updatedCalf,
  });
});

// Delete Calf Data Endpoint
app.delete("/api/calfs/:id", async (req, res) => {
  const { id } = req.params;

  // In-memory delete
  const index = calfs.findIndex((data) => data.id === parseInt(id));
  if (index !== -1) {
    calfs.splice(index, 1);
  }

  // MongoDB delete
  const calf = await Calf.findOneAndDelete({ id: id });
  if (!calf) {
    return res.status(404).json({ error: "Calf not found" });
  }

  res.json({ message: "Calf deleted successfully", data: calf });
});

// Toggle Calf Status Endpoint
app.put("/api/calfs/:id/toggle-status", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the calf by ID
    const calf = await Calf.findOne({ id: id });
    if (!calf) {
      console.error(`Calf with ID ${id} not found in the database`);
      return res.status(404).json({ error: "Calf not found" });
    }

    // Log the current status
    console.log(`Current status of calf with ID ${id}:`, calf.status);

    // Toggle the status field
    calf.status = !calf.status;

    // Save the updated calf back to the database
    await calf.save();

    // Optionally update the in-memory storage if used
    const index = calfs.findIndex((calf) => calf.id === parseInt(id));
    if (index !== -1) {
      calfs[index].status = calf.status;
    }

    res.json({
      message: "Calf status toggled successfully",
      calf: calf,
    });
  } catch (error) {
    console.error(`Error toggling status for calf with ID ${id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post(
  "/api/pregnancies",
  asyncHandler(async (req, res) => {
    const newPregnancy = new Pregnancy({ id: uuidv4(), ...req.body });
    await newPregnancy.save(); // Save to MongoDB
    pregnancies.push(newPregnancy); // Save to in-memory storage

    res.status(201).json({
      message: "Pregnancy added successfully",
      pregnancy: newPregnancy,
    });
  })
);

app.get(
  "/api/pregnancies",
  asyncHandler(async (req, res) => {
    const { userId, animalId } = req.query;

    let query = {};
    if (userId) query.userId = userId;
    if (animalId) query.animalId = animalId;

    const dbResults = await Pregnancy.find(query);
    res.json(dbResults);
  })
);

app.put(
  "/api/pregnancies/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedPregnancy = req.body;

    // MongoDB update
    const pregnancy = await Pregnancy.findOneAndUpdate(
      { id: id },
      updatedPregnancy,
      { new: true }
    );
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

    res.json({
      message: "Pregnancy data updated successfully",
      data: updatedPregnancy,
    });
  })
);

app.delete(
  "/api/pregnancies/:id",
  asyncHandler(async (req, res) => {
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

    res.json({
      message: "Pregnancy deleted successfully",
      data: deletedPregnancy,
    });
  })
);

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Endpoint to add a cow sale
app.post("/api/cowsales", async (req, res) => {
  try {
    const newCowSale = new CowSale({ id: uuidv4(), ...req.body });
    await newCowSale.save(); // Save cow sale to MongoDB

    cowSales.push(newCowSale); // Add to in-memory storage

    res
      .status(201)
      .json({ message: "Cow sale added successfully", cowSale: newCowSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Cow Sales Endpoint
app.get("/api/cowsales", async (req, res) => {
  try {
    const { userId } = req.query;
    let cowSalesFromDB;
    if (userId) {
      cowSalesFromDB = await CowSale.find({ userId });
    } else {
      cowSalesFromDB = await CowSale.find();
    }

    res.json(
      cowSalesFromDB.concat(
        cowSales.filter((cowSale) => !userId || cowSale.userId === userId)
      )
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Cow Sale Endpoint
app.put("/api/cowsales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCowSale = req.body;

    const updatedCowSaleMongo = await CowSale.findOneAndUpdate(
      { id },
      updatedCowSale,
      { new: true }
    );

    const index = cowSales.findIndex((cowSale) => cowSale.id === id);
    if (index !== -1) {
      cowSales[index] = updatedCowSaleMongo; // Update in-memory storage
    }

    res.json({
      message: "Cow sale record updated successfully",
      cowSale: updatedCowSaleMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Cow Sale Endpoint
app.delete("/api/cowsales/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCowSaleMongo = await CowSale.findOneAndDelete({ id });

    let deletedCowSaleInMemory = null;
    const index = cowSales.findIndex((cowSale) => cowSale.id === id);
    if (index !== -1) {
      deletedCowSaleInMemory = cowSales.splice(index, 1)[0]; // Delete from in-memory storage
    }

    if (!deletedCowSaleMongo && !deletedCowSaleInMemory) {
      return res.status(404).json({ error: "Cow sale record not found" });
    }

    res.json({
      message: "Cow sale record deleted successfully",
      cowSale: deletedCowSaleMongo || deletedCowSaleInMemory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add Expense Endpoint
app.post("/api/expenses", (req, res) => {
  const newExpense = { ...req.body };
  expenses.push(newExpense);
  res
    .status(201)
    .json({ message: "Expense added successfully", expense: newExpense });
});

// Get Expenses Endpoint
app.get("/api/expenses", (req, res) => {
  const { userId } = req.query;
  res.json(expenses.filter((expense) => expense.userId === userId));
});

// Edit Expense Endpoint
app.put("/api/expenses/:id", (req, res) => {
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
app.delete("/api/expenses/:id", (req, res) => {
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
app.post("/api/expense-purposes", async (req, res) => {
  try {
    const newExpensePurpose = {
      ...req.body,
      date: new Date().toLocaleDateString(),
    }; // Adding the current date

    const expensePurpose = new ExpensePurpose(newExpensePurpose);
    await expensePurpose.save(); // Save to MongoDB

    // Add to in-memory storage
    expensePurposes.push(expensePurpose);

    res.status(201).json({
      message: "Expense purpose added successfully",
      data: expensePurpose,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Expense Purposes Endpoint
app.get("/api/expense-purposes", async (req, res) => {
  try {
    const { userId } = req.query;
    let expensePurposesFromDB = await ExpensePurpose.find();

    if (userId) {
      expensePurposesFromDB = expensePurposesFromDB.filter(
        (expensePurpose) => expensePurpose.userId === userId
      );
    }

    res.json(expensePurposesFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Edit Expense Purpose Data Endpoint
app.put("/api/expense-purposes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpensePurpose = req.body;

    const updatedExpensePurposeMongo = await ExpensePurpose.findOneAndUpdate(
      { id },
      updatedExpensePurpose,
      { new: true }
    );
    if (!updatedExpensePurposeMongo) {
      return res.status(404).json({ error: "Expense purpose not found" });
    }

    // Update in-memory storage
    const index = expensePurposes.findIndex(
      (expensePurpose) => expensePurpose.id === id
    );
    if (index !== -1) {
      expensePurposes[index] = updatedExpensePurposeMongo;
    }

    res.json({
      message: "Expense purpose data updated successfully",
      data: updatedExpensePurposeMongo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Expense Purpose Data Endpoint
app.delete("/api/expense-purposes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete from MongoDB
    const deletedExpensePurposeMongo = await ExpensePurpose.findOneAndDelete({
      id,
    });
    if (!deletedExpensePurposeMongo) {
      return res.status(404).json({ error: "Expense purpose not found" });
    }

    // Delete from in-memory storage
    const index = expensePurposes.findIndex(
      (expensePurpose) => expensePurpose.id === id
    );
    if (index !== -1) {
      const deletedExpensePurpose = expensePurposes.splice(index, 1)[0];
      res.json({
        message: "Expense purpose deleted successfully",
        data: deletedExpensePurpose,
      });
    } else {
      res
        .status(404)
        .json({ error: "Expense purpose not found in in-memory storage" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Branch Endpoint
app.post("/api/branches", async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// Get Branches Endpoint
app.get("/api/branches", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter branches by userId
    let branchesFromDB = await Branch.find();

    if (userId) {
      branchesFromDB = branchesFromDB.filter(
        (branch) => branch.userId === userId
      );
    }

    res.json(branchesFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Branch Endpoint
app.put("/api/branches/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBranch = req.body;

  try {
    // MongoDB update
    const result = await Branch.findOneAndUpdate({ id }, updatedBranch, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Update in-memory storage if needed
    const index = branches.findIndex((branch) => branch.id.toString() === id);
    if (index !== -1) {
      branches[index] = result;
    }

    res.json({
      message: "Branch updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Branch Endpoint
app.delete("/api/branches/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await Branch.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Remove from in-memory storage if needed
    const index = branches.findIndex((branch) => branch.id.toString() === id);
    if (index !== -1) {
      const deletedBranch = branches.splice(index, 1)[0];
      res.json({
        message: "Branch deleted successfully",
        data: deletedBranch,
      });
    } else {
      res.json({
        message: "Branch deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
// Add UserType Endpoint
app.post("/api/userTypes", async (req, res) => {
  try {
    const newUserType = { ...req.body, date: new Date().toLocaleDateString() };

    // In-memory storage
    userTypes.push(newUserType);

    // MongoDB storage
    const userType = new UserType(newUserType);
    await userType.save();

    res.status(201).json({
      message: "UserType added successfully",
      data: newUserType,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get UserTypes Endpoint
app.get("/api/userTypes", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter user types by userId
    let userTypesFromDB = await UserType.find();

    if (userId) {
      userTypesFromDB = userTypesFromDB.filter(
        (userType) => userType.userId === userId
      );
    }

    res.json(userTypesFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update UserType Endpoint
app.put("/api/userTypes/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUserType = req.body;

  try {
    // MongoDB update
    const result = await UserType.findOneAndUpdate({ id }, updatedUserType, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "UserType not found" });
    }

    // Update in-memory storage if needed
    const index = userTypes.findIndex(
      (userType) => userType.id.toString() === id
    );
    if (index !== -1) {
      userTypes[index] = result;
    }

    res.json({
      message: "UserType data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete UserType Endpoint
app.delete("/api/userTypes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await UserType.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "UserType not found" });
    }

    // Remove from in-memory storage if needed
    const index = userTypes.findIndex(
      (userType) => userType.id.toString() === id
    );
    if (index !== -1) {
      const deletedUserType = userTypes.splice(index, 1)[0];
      res.json({
        message: "UserType deleted successfully",
        data: deletedUserType,
      });
    } else {
      res.json({
        message: "UserType deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Designation Endpoint
app.post("/api/designations", async (req, res) => {
  try {
    const newDesignation = {
      ...req.body,
      date: new Date().toLocaleDateString(),
    };

    // In-memory storage
    designations.push(newDesignation);

    // MongoDB storage
    const designation = new Designation(newDesignation);
    await designation.save();

    res.status(201).json({
      message: "Designation added successfully",
      data: newDesignation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Designations Endpoint
app.get("/api/designations", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter designations by userId
    let designationsFromDB = await Designation.find();

    if (userId) {
      designationsFromDB = designationsFromDB.filter(
        (designation) => designation.userId === userId
      );
    }

    res.json(designationsFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Designation Endpoint
app.put("/api/designations/:id", async (req, res) => {
  const { id } = req.params;
  const updatedDesignation = req.body;

  try {
    // MongoDB update
    const result = await Designation.findOneAndUpdate(
      { id },
      updatedDesignation,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Designation not found" });
    }

    // Update in-memory storage if needed
    const index = designations.findIndex(
      (designation) => designation.id.toString() === id
    );
    if (index !== -1) {
      designations[index] = result;
    }

    res.json({
      message: "Designation data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Designation Endpoint
app.delete("/api/designations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await Designation.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Designation not found" });
    }

    // Remove from in-memory storage if needed
    const index = designations.findIndex(
      (designation) => designation.id.toString() === id
    );
    if (index !== -1) {
      const deletedDesignation = designations.splice(index, 1)[0];
      res.json({
        message: "Designation deleted successfully",
        data: deletedDesignation,
      });
    } else {
      res.json({
        message: "Designation deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/api/colors", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get Colors Endpoint
app.get("/api/colors", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter colors by userId
    let colorsFromDB = await Color.find();

    if (userId) {
      colorsFromDB = colorsFromDB.filter((color) => color.userId === userId);
    }

    res.json(colorsFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Color Data Endpoint
app.put("/api/colors/:id", async (req, res) => {
  const { id } = req.params;
  const updatedColor = req.body;

  try {
    // MongoDB update
    const result = await Color.findOneAndUpdate({ id }, updatedColor, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Color not found" });
    }

    // Update in-memory storage if needed
    const index = colors.findIndex((color) => color.id.toString() === id);
    if (index !== -1) {
      colors[index] = result;
    }

    res.json({
      message: "Color data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/colors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await Color.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Color not found" });
    }

    // Remove from in-memory storage if needed
    const index = colors.findIndex((color) => color.id.toString() === id);
    if (index !== -1) {
      const deletedColor = colors.splice(index, 1)[0];
      res.json({
        message: "Color deleted successfully",
        data: deletedColor,
      });
    } else {
      res.json({
        message: "Color deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/api/animal-types", async (req, res) => {
  try {
    const newAnimalType = {
      ...req.body,
      date: new Date().toLocaleDateString(),
    };

    // In-memory storage
    animalTypes.push(newAnimalType);

    // MongoDB storage
    const animalType = new AnimalType(newAnimalType);
    await animalType.save();

    res.status(201).json({
      message: "Animal type added successfully",
      data: newAnimalType,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get AnimalTypes Endpoint
app.get("/api/animal-types", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter animal types by userId
    let animalTypesFromDB = await AnimalType.find();

    if (userId) {
      animalTypesFromDB = animalTypesFromDB.filter(
        (animalType) => animalType.userId === userId
      );
    }

    res.json(animalTypesFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit AnimalType Data Endpoint
app.put("/api/animal-types/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAnimalType = req.body;

  try {
    // MongoDB update
    const result = await AnimalType.findOneAndUpdate(
      { id },
      updatedAnimalType,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Animal type not found" });
    }

    // Update in-memory storage if needed
    const index = animalTypes.findIndex(
      (animalType) => animalType.id.toString() === id
    );
    if (index !== -1) {
      animalTypes[index] = result;
    }

    res.json({
      message: "Animal type data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete AnimalType Endpoint
app.delete("/api/animal-types/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await AnimalType.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Animal type not found" });
    }

    // Remove from in-memory storage if needed
    const index = animalTypes.findIndex(
      (animalType) => animalType.id.toString() === id
    );
    if (index !== -1) {
      const deletedAnimalType = animalTypes.splice(index, 1)[0];
      res.json({
        message: "Animal type deleted successfully",
        data: deletedAnimalType,
      });
    } else {
      res.json({
        message: "Animal type deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Vaccine Endpoint
app.post("/api/vaccines", async (req, res) => {
  try {
    const newVaccine = { ...req.body, date: new Date().toLocaleDateString() };

    // In-memory storage
    vaccines.push(newVaccine);

    // MongoDB storage
    const vaccine = new Vaccine(newVaccine);
    await vaccine.save();

    res.status(201).json({
      message: "Vaccine added successfully",
      data: newVaccine,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Vaccines Endpoint
app.get("/api/vaccines", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter vaccines by userId
    let vaccinesFromDB = await Vaccine.find();

    if (userId) {
      vaccinesFromDB = vaccinesFromDB.filter(
        (vaccine) => vaccine.userId === userId
      );
    }

    res.json(vaccinesFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Vaccine Endpoint
app.put("/api/vaccines/:id", async (req, res) => {
  const { id } = req.params;
  const updatedVaccine = req.body;

  try {
    // MongoDB update
    const result = await Vaccine.findOneAndUpdate({ id }, updatedVaccine, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Vaccine not found" });
    }

    // Update in-memory storage if needed
    const index = vaccines.findIndex((vaccine) => vaccine.id === id);
    if (index !== -1) {
      vaccines[index] = result;
    }

    res.json({
      message: "Vaccine updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Vaccine Endpoint
app.delete("/api/vaccines/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await Vaccine.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Vaccine not found" });
    }

    // Remove from in-memory storage if needed
    const index = vaccines.findIndex((vaccine) => vaccine.id === id);
    if (index !== -1) {
      const deletedVaccine = vaccines.splice(index, 1)[0];
      res.json({
        message: "Vaccine deleted successfully",
        data: deletedVaccine,
      });
    } else {
      res.json({
        message: "Vaccine deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add FoodUnit Endpoint
app.post("/api/food-units", async (req, res) => {
  try {
    const newFoodUnit = { ...req.body, date: new Date().toLocaleDateString() };

    // In-memory storage
    foodUnits.push(newFoodUnit);

    // MongoDB storage
    const foodUnit = new FoodUnit(newFoodUnit);
    await foodUnit.save();

    res.status(201).json({
      message: "Food unit added successfully",
      data: newFoodUnit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get FoodUnits Endpoint
app.get("/api/food-units", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter food units by userId
    let foodUnitsFromDB = await FoodUnit.find();

    if (userId) {
      foodUnitsFromDB = foodUnitsFromDB.filter(
        (foodUnit) => foodUnit.userId === userId
      );
    }

    res.json(foodUnitsFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update FoodUnit Endpoint
app.put("/api/food-units/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFoodUnit = req.body;

  try {
    // MongoDB update
    const result = await FoodUnit.findOneAndUpdate({ id }, updatedFoodUnit, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Food unit not found" });
    }

    // Update in-memory storage if needed
    const index = foodUnits.findIndex((foodUnit) => foodUnit.id === id);
    if (index !== -1) {
      foodUnits[index] = result;
    }

    res.json({
      message: "Food unit updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete FoodUnit Endpoint
app.delete("/api/food-units/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await FoodUnit.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Food unit not found" });
    }

    // Remove from in-memory storage if needed
    const index = foodUnits.findIndex((foodUnit) => foodUnit.id === id);
    if (index !== -1) {
      const deletedFoodUnit = foodUnits.splice(index, 1)[0];
      res.json({
        message: "Food unit deleted successfully",
        data: deletedFoodUnit,
      });
    } else {
      res.json({
        message: "Food unit deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

// Add Supplier Endpoint
app.post("/api/suppliers", async (req, res) => {
  try {
    const newSupplier = { ...req.body, date: new Date().toLocaleDateString() };

    // In-memory storage
    suppliers.push(newSupplier);

    // MongoDB storage
    const supplier = new Supplier(newSupplier);
    await supplier.save();

    res.status(201).json({
      message: "Supplier added successfully",
      data: newSupplier,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Suppliers Endpoint
app.get("/api/suppliers", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter suppliers by userId
    let suppliersFromDB = await Supplier.find();

    if (userId) {
      suppliersFromDB = suppliersFromDB.filter(
        (supplier) => supplier.userId === userId
      );
    }

    res.json(suppliersFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Supplier Endpoint
app.put("/api/suppliers/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSupplier = req.body;

  try {
    // MongoDB update
    const result = await Supplier.findOneAndUpdate({ id }, updatedSupplier, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    // Update in-memory storage if needed
    const index = suppliers.findIndex((supplier) => supplier.id === id);
    if (index !== -1) {
      suppliers[index] = result;
    }

    res.json({
      message: "Supplier updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Supplier Endpoint
app.delete("/api/suppliers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await Supplier.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    // Remove from in-memory storage if needed
    const index = suppliers.findIndex((supplier) => supplier.id === id);
    if (index !== -1) {
      const deletedSupplier = suppliers.splice(index, 1)[0];
      res.json({
        message: "Supplier deleted successfully",
        data: deletedSupplier,
      });
    } else {
      res.json({
        message: "Supplier deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/api/food-items", async (req, res) => {
  try {
    const newFoodItem = { ...req.body };

    // In-memory storage
    foodItems.push(newFoodItem);

    // MongoDB storage
    const foodItem = new FoodItem(newFoodItem);
    await foodItem.save();

    res.status(201).json({
      message: "Food item added successfully",
      data: newFoodItem,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/food-items", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter food items by userId
    let foodItemsFromDB = await FoodItem.find();

    if (userId) {
      foodItemsFromDB = foodItemsFromDB.filter(
        (item) => item.userId === userId
      );
    }

    res.json(foodItemsFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/food-items/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFoodItem = req.body;

  try {
    // MongoDB update
    const result = await FoodItem.findOneAndUpdate({ id }, updatedFoodItem, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Food item not found" });
    }

    // Update in-memory storage if needed
    const index = foodItems.findIndex((item) => item._id.toString() === id);
    if (index !== -1) {
      foodItems[index] = result;
    }

    res.json({
      message: "Food item updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/food-items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await FoodItem.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: "Food item not found" });
    }

    // Remove from in-memory storage if needed
    const index = foodItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const deletedFoodItem = foodItems.splice(index, 1)[0];
      res.json({
        message: "Food item deleted successfully",
        data: deletedFoodItem,
      });
    } else {
      res.json({
        message: "Food item deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/api/monitorings", async (req, res) => {
  try {
    const newMonitoringService = { ...req.body, lastPerformed: new Date() };

    // In-memory storage
    monitoringServices.push(newMonitoringService);

    // MongoDB storage
    const monitoringService = new MonitoringService(newMonitoringService);
    await monitoringService.save();

    res.status(201).json({
      message: "Monitoring service added successfully",
      data: newMonitoringService,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/monitorings", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you want to filter monitoring services by userId
    let monitoringServicesFromDB = await MonitoringService.find();

    if (userId) {
      monitoringServicesFromDB = monitoringServicesFromDB.filter(
        (service) => service.userId === userId
      );
    }

    res.json(monitoringServicesFromDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/monitorings/:id", async (req, res) => {
  const { id } = req.params;
  const updatedMonitoringService = req.body;

  try {
    // MongoDB update
    const result = await MonitoringService.findByIdAndUpdate(
      id,
      updatedMonitoringService,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Monitoring service not found" });
    }

    // Update in-memory storage if needed
    const index = monitoringServices.findIndex(
      (service) => service._id.toString() === id
    );
    if (index !== -1) {
      monitoringServices[index] = result;
    }

    res.json({
      message: "Monitoring service updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/monitorings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // MongoDB delete
    const result = await MonitoringService.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Monitoring service not found" });
    }

    // Remove from in-memory storage if needed
    const index = monitoringServices.findIndex(
      (service) => service._id.toString() === id
    );
    if (index !== -1) {
      const deletedService = monitoringServices.splice(index, 1)[0];
      res.json({
        message: "Monitoring service deleted successfully",
        data: deletedService,
      });
    } else {
      res.json({
        message: "Monitoring service deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/api/reset-password-request", (req, res) => {
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

app.get("/api/admin/plans", (req, res) => {
  res.json(subscriptionPlans);
});

// Create a new subscription plan
app.post("/api/admin/plans", (req, res) => {
  const { name, price, features } = req.body;
  const plan = { id: subscriptionPlans.length + 1, name, price, features };
  subscriptionPlans.push(plan);
  res.status(201).json(plan);
});

// User API Resource

// User sign-in

// Fetch all users (for testing)
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Fetch all plans
app.get("/api/plans", (req, res) => {
  res.json(subscriptionPlans);
});

// Fetch all invoices
app.get("/api/users/:id/invoices", (req, res) => {
  const { id } = req.params;
  res.json(invoices.filter((invoice) => invoice.userId === id));
});

app.get("/api/invoices/:id", (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find((inv) => inv.id === parseInt(id));
  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404).json({ error: "Invoice not found" });
  }
});

// Update invoice payment status
app.post("/api/invoices/pay/:id", (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find((invoice) => invoice.id === parseInt(id));

  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }

  invoice.paymentStatus = "paid";
  res.status(200).json({ message: "Payment successful", invoice });
});

app.put("/api/upgrade/:userId", (req, res) => {
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

app.put("/api/cancel/:userId", (req, res) => {
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

app.get("/api/users/:userId/payment-methods", (req, res) => {
  const userId = req.params.userId;
  const paymentMethods = userPaymentMethods[userId] || [];
  res.json({ methods: paymentMethods });
});

app.post("/api/users/:userId/payment-methods/credit-card", (req, res) => {
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

app.post("/api/users/:userId/payment-methods/paypal", (req, res) => {
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

app.post("/api/users/:userId/payment-methods/bank", (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});