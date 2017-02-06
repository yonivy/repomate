const express = require('express')
const routes = require('./routes')

const PORT = process.env.PORT || 8080

let app = express()

routes(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))