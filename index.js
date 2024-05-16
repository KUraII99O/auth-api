require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;
const adminhash = bcrypt.hashSync("adminpassword", 10);
const cors = require('cors');

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
const milksale = [];
const cowFeeds = [];
const routineMonitors = [];
const Vaccinemonitors = [];
const stalls = [];
const cows = [];
const calfs = [];
const pregnancies = [];
const sales = [];


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address stored in an environment variable
    pass: process.env.EMAIL_PASS // Your email password stored in an environment variable
  }
});


app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));

// User registration endpoint
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    // Store the user in the database with default type 'user'
    users.push({ username, email, password: hash, type: "user" });
    res.status(201).json({ message: "User registered successfully" });
  });
});

// User authentication endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);

  // Check if user exists
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Compare passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json(user);
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/users", (req, res) => {
  const newUser = req.body;

  // Store the user in the database with default type 'user'
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
});

// Endpoint to get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Endpoint to update a user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user in the database
  users[index] = { ...users[index], ...updatedUser };
  res.json({ message: "User updated successfully", user: users[index] });
});

// Endpoint to delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Remove the user from the database
  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: "User deleted successfully", user: deletedUser });
});

// Endpoint to toggle user status (if needed)
app.put("/users/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Toggle user status
  users[index].status = !users[index].status;
  res.json({ message: "User status toggled successfully", user: users[index] });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/staffs", (req, res) => {
  const newStaff = req.body;
  staffs.push(newStaff);
  res
    .status(201)
    .json({ message: "Staff added successfully", staff: newStaff });
});
// Endpoint to get all staffs
app.get("/staffs", (req, res) => {
  res.json(staffs);
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
  res.json({ message: "Staff member deleted successfully", staff: deletedStaff });
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
  const newEmployee = req.body;
  employees.push(newEmployee);
  res
    .status(201)
    .json({ message: "Employee added successfully", employee: newEmployee });
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;
  const index = employees.findIndex((employee) => employee.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }
  employees[index] = updatedEmployee;
  res.json({
    message: "Employee updated successfully",
    employee: updatedEmployee,
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex((employee) => employee.id === parseInt(id));
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
app.post("/milks", (req, res) => {
  const { username, ...newMilkData } = req.body; // Destructure the username from the request body
  newMilkData.AddedBy = username;
  newMilkData.date = new Date().toLocaleDateString(); // Adding the current date

  milks.push(newMilkData);
  res
    .status(201)
    .json({ message: "Milk data collected successfully", data: newMilkData });
});

// Get all collected milk data
app.get("/milks", (req, res) => {
  // Changed the endpoint name to milks
  res.json(milks);
});

// Edit Milk Data Endpoint (if needed)
app.put("/milks/:id", (req, res) => {
  // Changed the endpoint name to milks
  const { id } = req.params;
  const updatedMilkData = req.body;
  const index = milks.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Milk data not found" });
  }
  milks[index] = updatedMilkData;
  res.json({
    message: "Milk data updated successfully",
    data: updatedMilkData,
  });
});

// Delete Milk Data Endpoint (if needed)
app.delete("/milks/:id", (req, res) => {
  // Changed the endpoint name to milks
  const { id } = req.params;
  const index = milks.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Milk data not found" });
  }
  const deletedMilkData = milks.splice(index, 1)[0];
  res.json({
    message: "Milk data deleted successfully",
    data: deletedMilkData,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
app.post("/milksale", (req, res) => {
  const newmilksale = req.body;
  newmilksale.SoldBy = "Admin"; // Assuming "Admin" is the default user adding the data
  newmilksale.date = new Date().toLocaleDateString(); // Adding the current date

  milksale.push(newmilksale);
  res
    .status(201)
    .json({ message: "Milk data collected successfully", data: newmilksale });
});

// Get all collected milk data
app.get("/milksale", (req, res) => {
  res.json(milksale);
});

// Edit Milk Data Endpoint (if needed)
app.put("/milksale/:id", (req, res) => {
  const { id } = req.params;
  const updatedmilksale = req.body;
  const index = milksale.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Milk data not found" });
  }
  milksale[index] = updatedmilksale;
  res.json({
    message: "milk sale data updated successfully",
    data: updatedmilksale,
  });
});

// Delete Milk Data Endpoint (if needed)
app.delete("/milksale/:id", (req, res) => {
  const { id } = req.params;
  const index = milksale.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Milk data not found" });
  }
  const deletedmilksale = milksale.splice(index, 1)[0];
  res.json({
    message: "Milk data deleted successfully",
    data: deletedmilksale,
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
app.post("/routineMonitors", (req, res) => {
  const newroutineMonitors = req.body;

  newroutineMonitors.date = new Date().toLocaleDateString(); // Adding the current date
  newroutineMonitors.AddedBy = "Admin";
  routineMonitors.push(newroutineMonitors);
  res
    .status(201)
    .json({
      message: "routine Monitors collected successfully",
      data: newroutineMonitors,
    });
});

// Get all collected milk data
app.get("/routineMonitors", (req, res) => {
  res.json(routineMonitors);
});

// Edit Milk Data Endpoint (if needed)
app.put("/routineMonitors/:id", (req, res) => {
  const { id } = req.params;
  const updatedroutineMonitors = req.body;
  const index = routineMonitors.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "routine Monitors not found" });
  }
  routineMonitors[index] = updatedroutineMonitors;
  res.json({
    message: "routine Monitors data updated successfully",
    data: updatedroutineMonitors,
  });
});

// Delete Milk Data Endpoint (if needed)
app.delete("/routineMonitors/:id", (req, res) => {
  const { id } = req.params;
  const index = routineMonitors.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "routine Monitors data not found" });
  }
  const deletedroutineMonitors = routineMonitors.splice(index, 1)[0];
  res.json({
    message: "routine Monitors deleted successfully",
    data: deletedroutineMonitors,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/Vaccinemonitors", (req, res) => {
  const newVaccinemonitors = req.body;

  newVaccinemonitors.date = new Date().toLocaleDateString(); // Adding the current date
  newVaccinemonitors.ReportedBy = "Admin";
  Vaccinemonitors.push(newVaccinemonitors);
  res
    .status(201)
    .json({
      message: "routine Monitors collected successfully",
      data: newVaccinemonitors,
    });
});

app.get("/Vaccinemonitors", (req, res) => {
  res.json(Vaccinemonitors);
});

// Edit Milk Data Endpoint (if needed)
app.put("/Vaccinemonitors/:id", (req, res) => {
  const { id } = req.params;
  const updatedVaccinemonitors = req.body;
  const index = Vaccinemonitors.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Vaccine monitors not found" });
  }
  Vaccinemonitors[index] = updatedVaccinemonitors;
  res.json({
    message: "Vaccine monitors  data updated successfully",
    data: updatedVaccinemonitors,
  });
});

// Delete Milk Data Endpoint (if needed)
app.delete("/Vaccinemonitors/:id", (req, res) => {
  const { id } = req.params;
  const index = Vaccinemonitors.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Vaccine monitors data not found" });
  }

  const deletedVaccinemonitors = Vaccinemonitors.splice(index, 1)[0];
  res.json({
    message: "Vaccine monitors deleted successfully",
    data: deletedVaccinemonitors,
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/stalls", (req, res) => {
  const newstalls = req.body;

  newstalls.date = new Date().toLocaleDateString(); // Adding the current date
  stalls.push(newstalls);
  res
    .status(201)
    .json({
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
  const { username, ...newCow } = req.body;
  newCow.date = new Date(); //
  newCow.CreatedBy = username; // Using username as is
  cows.push(newCow);
  res.status(201).json({ message: "cow added successfully", data: newCow });
});

app.get("/cows", (req, res) => {
  res.json(cows);
});

// Edit stall Data Endpoint (if needed)
app.put("/cows/:id", (req, res) => {
  const { id } = req.params;
  const updatedcows = req.body;
  const index = cows.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "cows not found" });
  }
  cows[index] = updatedcows;
  res.json({ message: "cows  data updated successfully", data: updatedcows });
});

// Delete stall Data Endpoint (if needed)
app.delete("/cows/:id", (req, res) => {
  const { id } = req.params;
  const index = cows.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "cows data not found" });
  }

  const deletedcows = cows.splice(index, 1)[0];
  res.json({ message: "cows deleted successfully", data: deletedcows });
});

app.put("/cows/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = cows.findIndex((cow) => cow.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "cow not found" });
  }

  // Toggle stall status
  cows[index].animalStatus = !cows[index].animalStatus;
  res.json({
    message: "cow animalStatus toggled successfully",
    cow: cows[index],
  });
});

("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

app.post("/calfs", (req, res) => {
  const { username, ...newCalf } = req.body;
  newCalf.date = new Date();
  newCalf.CreatedBy = username;

  calfs.push(newCalf);
  res.status(201).json({ message: "Calf added successfully", data: newCalf });
});

app.get("/calfs", (req, res) => {
  res.json(calfs);
});

app.put("/calfs/:id", (req, res) => {
  const { id } = req.params;
  const updatedCalf = req.body;
  const index = calfs.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Calf not found" });
  }
  calfs[index] = updatedCalf;
  res.json({ message: "Calf data updated successfully", data: updatedCalf });
});

app.delete("/calfs/:id", (req, res) => {
  const { id } = req.params;
  const index = calfs.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Calf data not found" });
  }

  const deletedCalf = calfs.splice(index, 1)[0];
  res.json({ message: "Calf deleted successfully", data: deletedCalf });
});

app.put("/calfs/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const index = calfs.findIndex((calf) => calf.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Calf not found" });
  }

  calfs[index].status = !calfs[index].status;
  res.json({ message: "Calf status toggled successfully", calf: calfs[index] });
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
app.post("/sales", (req, res) => {
  const { username, ...newSale } = req.body;

  sales.push(newSale);
  res.status(201).json({ message: "Sale added successfully", data: newSale });
});

app.get("/sales", (req, res) => {
  res.json(sales);
});

app.put("/sales/:id", (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;
  const index = sales.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Sale not found" });
  }
  sales[index] = updatedSale;
  res.json({ message: "Sale data updated successfully", data: updatedSale });
});

app.delete("/sales/:id", (req, res) => {
  const { id } = req.params;
  const index = sales.findIndex((data) => data.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Sale data not found" });
  }

  const deletedSale = sales.splice(index, 1)[0];
  res.json({ message: "Sale deleted successfully", data: deletedSale });
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
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${OTP}`
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









app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
