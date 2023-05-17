require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
//middleware
app.use(express.json())
app.use(cors())
const tokenVerification = require('./middleware/tokenVerification')

// routes
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

app.get("/api/users/",tokenVerification)
app.delete("/api/users", tokenVerification)
app.get("/api/users/user", tokenVerification)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)


const connection = require('./db')
connection()


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))