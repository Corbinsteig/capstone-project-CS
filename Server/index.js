const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const {getAccounts, createAccount} = require('./controller')
app.get('/', getAccounts)
app.post('/', createAccount)
app.listen(4004, () => {console.log('Listening on port 4004')})