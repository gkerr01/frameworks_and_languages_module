const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })