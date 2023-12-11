// Import necessary modules
const express = require('express')
const cors = require('cors')

// Create an Express application
const app = express()
// Specify the port for the server to listen on
const port = 8000

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON requests
app.use(express.json())


// Initial items data
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

// Route for the root endpoint
app.get('/', (req, res) => {
 
  res.status(200)
  res.send('Hello server')

})

// Route for handling POST 
app.post('/item', (req, res) => {
  // Define the required fields for creating a new item
  const requiredFields = ["user_id", "keywords", "description", "lat", "lon"]

  // Check if all required fields are present in the request body
  const missingFields = requiredFields.filter(field => !(field in req.body))

  // If any required field is missing, respond with a 405 status and a message
  if (missingFields.length > 0) {
    return res.status(405).json({ message: `Missing Fields` })
  }

  // Assuming validation is successful, create a new item
  const newItem = {
    id: Object.keys(items).length + 1,
    user_id: req.body.user_id,
    keywords: req.body.keywords || [],
    description: req.body.description || "",
    lat: req.body.lat || null,
    lon: req.body.lon || null,
    date_from: req.body.date_from || new Date().toISOString().replace('Z',""), // replaced  Z with an empty string as python has updated to 3.12 halfway though the module 
  }

  items[newItem.id] = newItem
  console.log("Posted")
  console.log(newItem)
  res.status(201).json(newItem)
})

// Route for getting a specific item by ID
app.get('/item/:itemId', (req, res) => {
  // Extract itemId from request parameters
  const itemId = parseInt(req.params.itemId)

  // Check if the item with the specified ID exists
  if (items[itemId]) {
    res.status(200).json(items[itemId])
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})




// Route for getting all items
app.get('/items', (req, res) => {
  // Retrieve all items from the items collection
  const allItems = Object.values(items)

  res.status(200).json(allItems)
})

// Route for deleting an item by ID
app.delete('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId)

  // Check if the item with the specified ID exists
  if (items[itemId]) {
    
    // Delete the item
    delete items[itemId]
    // Respond with a 204 status code (No Content) for successful deletion
    res.status(204).send()
  } else {
    // Respond with a 404 status code if the item is not found
    res.status(404).json({ message: 'Item not found' })
  }
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
