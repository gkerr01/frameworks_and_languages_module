const express = require('express')

const app = express()
const port = 8000


app.use(express.json());


items = {
  1: {
      "id": 1,
      "user_id": "user1234",
      "keywords": ["hammer", "nails", "tools"],
      "description": "A hammer and nails set",
      "lat": 1,
      "lon": 1,
      "date_from": "2021-11-22T08:22:39.067408",
  }
}

app.get('/', (req, res) => {
 
  res.status(200)
  res.send('Hello server')

})

app.post('/item', (req, res) => {
  console.log("Post")
  console.log(req.body)
  res.status(201).json()
  
})


  /*
  if(Object.keys(req.body).sort().toString != "id") {
    return  res.status(405).json("Missing Fields")
  }
  
  items.push(req.body)
  
  res.status(201).json()
  */


/*

app.get('/items', (req, res) => {
 
  res.status(200).json(items)
})

app.get('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = items.find(item => item.id === itemId);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
})

app.post('/item', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  console.log("post item")
  console.log(req.body)
  res.status(201).json(newItem);
})

app.delete('/item/:itemId', (req, res) => {
  res.status(204).json()
})

*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})