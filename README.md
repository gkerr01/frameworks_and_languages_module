Freecycle
Table of Contents
Overview
Getting Started
Features
Usage
API Endpoints
Dependencies
Contributing
License
Overview
HTML (Bulma and Vue.js):
Navigation Bar: Responsive design with logo, brand title, and mobile menu toggle.
Vue App Container: Main content enclosed with Vue.js integration.
Form Section: Allows users to input data for creating items.
Message and Item Display: Displays messages and lists fetched items with details.
Express (JavaScript) Server:
Express Server: Listens on port 8000, enables CORS, and parses JSON requests.
Routes:
/item: Handles POST requests for creating new items.
/item/:itemId: Handles GET requests for a specific item by ID.
/items: Handles GET requests to retrieve all items.
/item/:itemId: Handles DELETE requests to delete an item by ID.
POST /item: Validates and creates a new item, responds with the created item.
GET /item/:itemId: Retrieves a specific item by ID, responds with the item or 404 if not found.
GET /items: Retrieves all items, responds with an array of items.
DELETE /item/:itemId: Deletes a specific item by ID, responds with 204 on success or 404 if not found.
Overall:
HTML integrates Vue.js for interactivity.
Express server provides API endpoints for item creation, retrieval, and deletion.
Ensure proper connection between the server and front-end scripts for expected functionality.
Getting Started
Make run: Runs the server and client together, installing necessary dependencies.
make test_your_client_with_example_server: Tests your client with an example server.
make test_your_server_with_example_client: Tests your server with an example client.
pytest test_api.py --pdb: Runs server tests with a debugger.
Usage
Curl commands for the server:

bash
Copy code
curl -v -X POST http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234", "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nails set. In Canterbury", "lat": 51.2798438, "lon": 1.0830275}'
curl -X GET http://localhost:8000/items
curl -X GET http://localhost:8000/item/1 | jq
curl -X DELETE http://localhost:8000/item/1
API Endpoints
GET /: Home endpoint
POST /item: Create a new item
GET /item/:itemId: Get details of a specific item
GET /items: Get a list of all items
DELETE /item/:itemId: Delete a specific item
Dependencies
Express.j