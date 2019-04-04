const { Pool } = require('pg')
const server = require('./server')

const dbClient = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT
})

dbClient.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err.stack)
  } else {
    console.log('Connected to database')
  }
})

server(dbClient, 3000)
  .then(data => {
    console.log('The server is listening on port: ' + data.port)
  })
  .catch(err => {
    console.error(err.stack)
  })
