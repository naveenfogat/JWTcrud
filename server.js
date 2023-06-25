const express = require("express");
const app = express();
let dotenv = require("dotenv").config();
const errorHandler=require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection");


let port = process.env.PORT || 5000;

connectDb();


app.use(express.json())

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
