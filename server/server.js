const express = require('express')
const app = express()
const port = 8000

const items = [
  {
    id: 0,
    user_id: "user1234",
    keywords: ["hammer", "nails", "tools"],
    description: "A hammer and nails set",
    image: "https://placekitten.com/200/300",
    lat: 51.2798438,
    lon: 1.0830275,
    date_from: "2023-10-23T16:53:10.722Z",
    date_to: "2023-10-23T16:53:10.722Z"
  }
]


app.get('/items', (req, res) => {
  res.json(items);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})