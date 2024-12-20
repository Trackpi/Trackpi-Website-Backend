const express = require("express")
const cors = require('cors')
require('./config/connection')
adminRoute=require('./routes/adminRouter')
const app =express()
app.use(express.json())
app.use(cors())
app.use(adminRoute)




app.listen(3001,()=>{
    console.log("server is running");
})