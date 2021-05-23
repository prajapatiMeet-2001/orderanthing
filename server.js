const express = require('express')
var db = require('./db');
const routes = require('./routes/index'); // import the routes
const adminroute = require('./routes/admin'); // import the routes
const deliveryroute = require('./routes/delivery') // import the routes
const app = express()
app.use(express.json());

const port = 3000

//to use the routes
app.use('/', routes); 
app.use('/admin/',adminroute)
app.use('/delivery/',deliveryroute)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  });