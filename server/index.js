require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.use("/user", require("./routes/userRoute"));
app.use("/class", require("./routes/classRoute"));
app.use("/entry", require("./routes/entryRoute"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);
})
