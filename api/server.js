
require('dotenv').config();
const server = require('./src/httpserver');

server.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`)
})