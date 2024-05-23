const express = require('express')
const bodyParser = require("body-parser");
const router = require('./router');

const app = express()

require('dotenv').config();
const port = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))