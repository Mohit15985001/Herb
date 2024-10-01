const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const cors = require('cors');
const twilio = require('twilio');

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
app.post('/submit', (req, res) => {
    const { Name, Address, primaryPhone,secondaryPhone } =  req.body;
    const data = {
        Name: Name,
        Address: Address,
        primaryPhone: primaryPhone,
        secondaryPhone: secondaryPhone
    };
    console.log(data);

    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        from: 'whatsapp:+14155238886', // Twilio WhatsApp Sandbox number
        body: `
        You have received an order from ${Name}.
        Here are the order details:
        
        Name: ${Name || "(Name not provided)"}
        Address: ${Address || "(Address not provided)"}
        Primary Phone: ${primaryPhone || "(Primary phone not provided)"}
        Secondary Phone: ${secondaryPhone || "NA"}
        
        Thank you for your order! 
        `, // Custom dynamic body message
        to: 'whatsapp:+917737265211' // Recipient's WhatsApp number
    })
    .then(message => console.log("Message SID:", message.sid, "Message sent successfully", message))
    .catch(err => console.error("Error occurred:", err));







    // const data = {
    //     Name,
    //     Address,
    //     primaryPhone,
    //     secondaryPhone
    // };

    // Convert the data to a JSON string
    // const jsonString = JSON.stringify(data, null, 2);

    // // Write the data to the file
    // fs.writeFile('data.json', jsonString, err => {
    //     if (err) {
    //         console.log('Error writing file', err);
    //     } else {
    //         console.log('Successfully wrote file');
    //     }
    // });


    // Define the Excel file path
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
