const db = require("../db/connectDB");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const getAllEmployees = (req, res) => {
    const sql = "select * from employee_table";
    const cache_key = "employee_data";
    if(cache.get(cache_key)) {
        console.log("Cache hit: Returning cached data");
        res.json({data: cache.get(cache_key)});
    } else {
        db.query(sql, (err, results) => {
            if(err) {
                console.log("Database error", err);
            }
            else {
                cache.set(cache_key, results,120);
                res.json({data: results});
            }
        });
    }
};

const addNewEmployee = (req, res) => {
    const details = req.body;
    if(!details.employee_id || !details.employee_name || !details.salary || !details.address || !details.designation) {
        return res.status(400).json({message: "Missing details. Please provide all required employee details"});
    }
    const sql = `insert into employee_table (employee_id, employee_name, salary, address, designation) values ("${details.employee_id}", "${details.employee_name}", ${details.salary}, "${details.address}", "${details.designation}");`;
    db.query(sql, (err, results) => {
        if(err) {
            console.log("Error:", err);
        }
        else {
            res.status(201).json({message: "New employee successfully added", details});
        }
    })
};

const updateSalary = (req, res) => {
    const details = req.body;
    if(!details.new_salary || !details.employee_id)  {
        return res.status(400).json({message: "Missing details. Please provide all required employee details"});
    }
    const sql = `update employee_table set salary = ${details.new_salary} where employee_id = "${details.employee_id}";`;
    db.query(sql, (err, results) => {
        if(err) {
            return console.log("Error:", err);
        }
        else {
            res.status(200).json({message: `Salary for employee ${details.employee_id} successfully updated`});
        }
    })
};

const updateAddress = (req, res) => {
    const details = req.body;
    if(!details.employee_id || !details.new_address) {
        return res.status(400).json({message: "Missing details. Please provide all required employee details"});
    }
    const sql = `update employee_table set address = "${details.new_address}" where employee_id = "${details.employee_id}";`;
    db.query(sql, (err, results) => {
        if(err) {
            console.log("Error updating address: ", err);
        }
        else {
            res.status(200).json({message: `Address for employee ${details.employee_id} successfully updated`});
        }
    })
};

const updateDesignation = (req, res) => {
    const details = req.body;
    if(!details.employee_id || !details.new_designation) {
        return res.status(400).json({message: "Missing details. Please provide all required employee details"});
    }
    const sql = `update employee_table set designation = "${details.new_designation}" where employee_id = "${details.employee_id}";`
    db.query(sql, (err, results) => {
        if(err) {
            return console.log("Error updating designation: ", err);
        }
        else {
            res.status(200).json({message: `Designation for employee ${details.employee_id} successfully updated`});
        }
    })
};

module.exports = {getAllEmployees ,addNewEmployee, updateSalary, updateAddress, updateDesignation};