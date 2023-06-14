const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql2')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


const employeeRoute = require('./src/routers/employee')
const departmentRoute = require('./src/routers/department')

app.use('/api', employeeRoute)
app.use('/api', departmentRoute)

const port = 3000
app.listen(port, () => console.log(`Start Server Port: ${port}`));
