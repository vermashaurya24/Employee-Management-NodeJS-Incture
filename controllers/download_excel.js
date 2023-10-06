const db = require("../db/connectDB");
const XlsxPopulate = require('xlsx-populate');

const downloadExcel = (req, res) => {
    const sql = "select * from employee_table";

    db.query(sql, async (error, results) => {
        if(error) {
            console.log("Database error");
            return res.status(500).json({message: "Error fetching data"});
        }

        XlsxPopulate.fromBlankAsync().then(workbook => {
            const sheet = workbook.sheet(0);
            results.forEach((row, rowIndex) => {
              Object.keys(row).forEach((colName, colIndex) => {
                sheet.cell(rowIndex + 1, colIndex + 1).value(row[colName]);
              });
            });
            
            workbook.outputAsync()
              .then(buffer => {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
                res.send(buffer);
              })
              .catch(error => {
                console.error(error);
                return res.status(500).send('Error generating Excel file');
              });
          });

    });
};

module.exports = downloadExcel;