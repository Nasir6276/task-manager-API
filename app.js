const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async function() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, function(req, res) {
            console.log('Server is running on port 3000');
        })
    } catch (error) {
        console.log(error);
    }
}

start()

