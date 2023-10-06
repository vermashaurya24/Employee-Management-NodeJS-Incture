const express = require("express");
const router = express.Router();

const {getAllEmployees,addNewEmployee,updateSalary, updateAddress, updateDesignation} = require("../controllers/employees")

router.post("/new-employee", addNewEmployee)

router.get("/get-all-employees", getAllEmployees);

router.put("/update-salary", updateSalary).put("/update-address", updateAddress).put("/update-designation", updateDesignation)

module.exports = router;