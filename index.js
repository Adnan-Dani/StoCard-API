const express = require('express');
const app = express();
require('dotenv').config()
 

app.use(express.urlencoded({extended: false})); 
 
require('./startup/cors')(app);
// require('./startup/db')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`);
})