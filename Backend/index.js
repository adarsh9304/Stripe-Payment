const express = require('express');
const app = express();
const cors=require('cors')

app.use(express.static('public'));
app.use(express.json());
app.use(cors())

const database=require('./config.js')
database.connect()

const routes=require('./routes.js')
app.use('/api/v1' ,routes)

app.listen(4000, () => console.log('Running on port 4000'));
