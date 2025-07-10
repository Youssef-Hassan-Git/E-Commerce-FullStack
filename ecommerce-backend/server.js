const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const path = require("path")
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
connectDB();



app.use('/auth', require("./routes/login.route"))
app.use("/user", require("./routes/user.route"))
app.use("/products", require("./routes/product.route"))
app.use("/brands", require("./routes/brand.route"))
app.use("/categories", require("./routes/category.route"))
app.use("/subcategories", require("./routes/subcategory.route"))
app.use("/cart", require("./routes/cart.route"))
app.use("/aboutus", require("./routes/aboutus.route"))
app.use("/testimonial", require("./routes/testimonial.route"))
app.use("/faq", require("./routes/faq.route"))
app.use("/fav", require("./routes/fav.route"))
app.use("/topsales", require("./routes/topsales.route"))
app.use("/order", require("./routes/order.route"))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=> console.log(`server running on port: ${PORT}`))
