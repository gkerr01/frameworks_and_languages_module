const express = require('express')
const app = express()
const port = 8000

app.use(express.json());


const items = [
  {
    id: 0,
    user_id: "user12345",
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

app.get('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);

  const item = items.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
})

app.post('/item', (req, res) => {
  const newItem = req.body;
  console.log("post item")
  console.log(req.body)
  res.status(201).json(newItem);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})