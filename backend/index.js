const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // For managing environment variables

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Image Storage Engine with size and type restrictions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and GIF images are allowed!"));
    }
  },
}).single("product");

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Upload Endpoint with error handling
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      success: true,
      image_url: `${req.file.filename}`,
    });
  });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// ADD NEW PRODUCT
app.post("/addproduct", async (req, res) => {
  try {
    // Validate request data
    const { name, image, category, old_price, new_price } = req.body;
    if (!name || !image || !category || !old_price || !new_price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate product ID
    const lastProduct = await Product.findOne({}, {}, { sort: { id: -1 } });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    // Create a new Product instance
    const newProduct = new Product({
      name,
      id,
      image,
      category,
      old_price,
      new_price,
    });

    // Save the Product to the database
    const savedProduct = await newProduct.save();

    // Send a success response
    res.json({
      success: true,
      message: "Product added successfully!",
      addProduct: savedProduct, // Include the saved product details for confirmation
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API FOR REMOVING A PRODUCT
app.post("/removeproduct", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("Product removed:", deletedProduct);
    res.json({
      success: true,
      message: "Product removed successfully!",
      removedProduct: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API FOR GET ALL PRODUCTS
app.get("/allproducts", async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (allProducts.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json({
      success: true,
      products: allProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Schema creating for User model
const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  // Check for existing user
  let check = await Users.findOne({ email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "Existing user found with the same email address",
    });
  }

  // Create an empty cart object
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = new Users({
    name,
    email,
    password: hashedPassword,
    cartData: cart,
  });

  try {
    await user.save();
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
});

// Creating endpoint for user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT on successful login
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
//======================= New Collection =======================//
app.get('/newcollections', async(req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-9);
  console.log("NewCollections Fetched");
  res.send(newcollection)
});

//======================= Popular =======================//
app.get('/popularinwoman', async(req,res)=>{
  let products = await Product.find({category: "women"});
  let popular_in_women = products.slice(0,6);
  console.log("Popular in women Fetched");
  res.send(popular_in_women)
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Server Start
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
