const express = require("express");
const router = express.Router();

const downloadExcel = require("../controllers/download_excel");

router.get("/download-excel", downloadExcel);

module.exports = router;