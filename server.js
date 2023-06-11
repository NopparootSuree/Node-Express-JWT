const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { InitDatabase } = require('./src/config/dataabse')

testConnection();

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const port = 3000
InitDatabase()
app.listen(port, () => console.log(`Start Server Port: ${port}`));
