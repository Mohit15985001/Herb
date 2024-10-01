const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('https://herb-q8yq192hg-mohitnathwanis-projects.vercel.app'+'/submit', (req, res) => {
    // const { Name, Address, primaryPhone,secondaryPhone } = req.body;
    // // Define the Excel file path
    // const filePath = './Herbb.xlsx';
    // // Check if the Excel file exists, otherwise create it
    // let workbook;
    // let worksheet;

    // if (fs.existsSync(filePath)) {

    //     workbook = XLSX.readFile(filePath);
    //     worksheet = workbook.Sheets['Sheet1'];
    // } else {

    //     workbook = XLSX.utils.book_new();
    //     worksheet = XLSX.utils.aoa_to_sheet([['Name', 'Address', 'primaryPhone','secondaryPhone']]); // Add headers
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // }

    // // Get current data in worksheet
    // const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // const date = new Date().toISOString().slice(0,10); // Format as YYYY-MM-DD
    // data.push([Name, Address, primaryPhone,secondaryPhone,date]); // Add new form data

    // // Update the worksheet with new data
    // const newWorksheet = XLSX.utils.aoa_to_sheet(data);
    // workbook.Sheets['Sheet1'] = newWorksheet;

    // // Write the workbook to the file
    // XLSX.writeFile(workbook, filePath);


    // Send a response
    res.send(`
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f0f0f0;
                    color: #333;
                }
                .container {
                    text-align: center;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Thank you for Ordering</h1>
                <p>We will get back to you shortly!</p>
            </div>
        </body>
    </html>
`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
