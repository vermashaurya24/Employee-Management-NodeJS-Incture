const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const employeeRouter = require("./routes/employees");

const downloadRouter = require("./routes/download");

app.use(express.json());

app.use(cors());

app.use("/employees", employeeRouter);

app.use("/download", downloadRouter);

app.get("*", (req, res) => {
    res.status(404).json({message:"Path does not exist"});
});

app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000...");
});