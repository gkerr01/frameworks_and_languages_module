Technical Report
================

This report is a comprehensive review of the research we did on programming languages and frameworks. The main goal is to demonstrate a deep understanding of frameworks, including their fundamental principles, programming uses, and particular benefits for software testing. By analysing frameworks, explaining their functions and highlighting their importance in the field of software testing, we can demonstrate that these technological elements are essential to the process of developing software. 


Critique of Server/Client prototype
---------------------

### Overview of Client prototype
The client prototype is a simple web client for the FreeCycle platform, enabling straightforward item creation, management, and listing, along with user authentication. It uses  JavaScript to manage functionalities such as parsing URL parameters for the API endpoints, handling item operations, and facilitating a user-friendly interface. it uses css for a simple and straightforward styling approach to maintain readability and ease of understanding.

### (duplicate IDs for HTML elements)

		<form>
			<label for="create_postcode">Postcode</label><input id="create_postcode" type="text" name="postcode"/>
			<button data-action="lookup_postcode">Lookup</button>
			<label for="create_lat">lat</label><input id="create_lat" type="text" name="lat"/>
			<label for="create_lon">lon</label><input id="create_lon" type="text" name="lon"/>
			<label for="create_image">image</label><input id="create_image" type="text" name="image" value="http://placekitten.com/100/100"/>
			<label for="create_keywords">keywords</label><input id="create_keywords" type="text" name="keywords"/>
			<label for="create_description">description</label><textarea id="create_description" type="text" name="description"></textarea>
			<input type="submit" id="action_create" data-action="create_item">
		</form>

One critique I have is around the duplicate IDs for HTML elements. For example, there are multiple HTML elements with the same ID attribute, such as "create_lat," and "create_lon," that are in the snippet of code above. These IDs should be unique within an HTML document to ensure proper functionality and styling. In order to prevent possible problems, it is more beneficial to use classes or separate IDs for distinct elements.

### Overview of Server prototype

The server prototype is a basic http server that implements python. The server parses HTTP requests, handles errors, and generates HTTP responses. It listens on a specified port, executes a provided app function, and responds to incoming HTTP requests.


### (Multiple hhtp requests )

while  True:
    s.listen()
    try:
        conn, addr = s.accept()
    except KeyboardInterrupt as ex:
        break
    with conn:
        data = conn.recv(65535)
        try:
            request = parse_request(data)
        except InvalidHTTPRequest as ex:
            log.exception("InvalidHTTPRequest")
            continue

        while int(request.get('content-length', 0)) > len(request['body']):
            request['body'] += conn.recv(65535).decode('utf8')

        try:
            response = func_app(request)
        except Exception as ex:
            log.error(request)
            traceback.print_exc()
            response = {'code': 500, 'body': f'<PRE>{traceback.format_exc()}</PRE>'}

        log.info(f"{addr} - {request.get('path')} - {response.get('code')} {response.get('Content-length')}")
        conn.send(encode_response(response))


Within the code above, there is an issue that the server is not designed to handle multiple HTTP requests concurrently. this is because it uses a simple loop to wait for and process incoming connections one at a time. This could lead to poor performance, especially under high loads.
 
### Recommendation
These previous implementations should not be used due to its simplicity, potential security vulnerabilities, incomplete features, hardcoded values and limited functionality. They also  lack scalability, maintainability, and adherence to best practices, making them unsuitable for real-world applications where reliability and security are paramount.

To overcome these limitations and drawbacks, it would be best to adopt established frameworks. Frameworks provide structured development, enhance security through community-driven updates, ensure scalability, and promote best practices, leading to robust, maintainable, and secure applications.


Express Server Framework Features
-------------------------

### (Endpoints)

app.get('/', (req, res) => {
  res.status(200).send('Hello server');
});
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js
GET /: above from my server responds with "Hello server." Primarily used for basic server connectivity testing. Returns a 200 status code.

app.post('/item', (req, res) => {
  // ... (code for handling the POST request)
});
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js
POST /item: above from my server creates a new item with specified fields (user_id, keywords, description, lat, lon). Validates input, responds with 201 on success, 405 on missing fields.

app.get('/item/:itemId', (req, res) => {
  // ... (code for handling the GET request )
});
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js
GET /item/:itemId:above from my server retrieves details of the item with the specified ID. Returns 200 with the item data if found, or 404 if the item doesn't exist.

app.get('/items', (req, res) => {
  // ... (code for handling the GET request for all items)
});
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js
GET /items: above from my server retrieves all items. Returns a 200 status with an array containing details of all stored items on the server.

app.delete('/item/:itemId', (req, res) => {
  // ... (code for handling the DELETE request )
});
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js
DELETE /item/:itemId: above from my server deletes the item with the specified ID. Responds with 204 (No Content) on successful deletion, or 404 if the item is not found.

These endpoints are particularly useful as  they allow developers to handle different types of client requests based on the intended action from these defined routing methods like app.get() and app.post(), are correspond to specific HTTP methods (GET, POST, etc.). They also provide a clear and structured way to organize different functionalities or resources based on the URL.  (Using Express Routing, no date)



### (Route parameter)

app.get('/item/:itemId', (req, res) => {
  // Access the captured value using req.params.itemId
  const itemId = req.params.itemId;
  // ... (code for handling the GET request with a dynamic parameter)
});
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

(Using Express Routing, no date)

In Express, the route parameter :itemId captures dynamic values from the URL. Accessed through req.params.itemId, it enables tailored handling of GET requests, facilitating dynamic data retrieval and processing based on the specified parameter value. 
Route parameters improve the readability of URLs, and meaningful identifiers are incorporated into paths to provide readable human-friendly code. Furthermore, route handlers facilitate modular and reusable code by effectively handling multiple instances of a resource by using captured parameter values found in req.params. 



### (Middleware)

app.use(cors());
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

In the provided Code snippet above, CORS middleware app.use(cors()), is implemented to manage cross-origin requests. This enhances server security by specifying which origins can access its resources, promoting secure and controlled cross-origin interactions. This means that CORS headers are set for all incoming requests, allowing cross-origin resource sharing universally by using app.use(cors()). Using Express Cors (no date)

app.use(express.json()); 
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

In the example in my code above app.use(express.json()), enables the server to parse incoming JSON requests. This allows for seamless handling of JSON data, simplifying data processing and interaction with client applications through standardized JSON format.

Express middleware (express.json() and cors()) collectively streamline server operations. express.json() automates JSON request parsing, ensuring consistency, while cors() allows for secure cross-origin resource sharing, improving accessibility with minor performance considerations.


Server Language Features
-----------------------

### (Modules)

In JavaScript, particularly when using Node.js for server-side development, modules are a way to organize and encapsulate code. Here's an expansion on how modules are used in the provided code.

const express = require('express');
const cors = require('cors');

// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

The primary purpose of require is to load external modules and the modules can be installed using npm (Node Package Manager) which was implemented into my makefile when i containerised. Using Nodejs Modules (no date).
Node.js modules organize code, promote reusability, and enhance maintainability. Benefits include better code structure, improved collaboration, and efficient debugging. 


### (name of Feature 2)

During the course of my assessment 1, python had updated itself when it came to passing the pytests within the assessment. This updates in particular was a workaround for potential issues with Python 3.12 updates, particularly in the handling of date strings.
This meant that i had to hard code into my server a way round for the test to pass into the string below.

    date_from: req.body.date_from || new Date().toISOString().replace('Z',""), 
// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

The code snippet above is the route handler for handling POST requests to the "/item" endpoint. Specifically, it's responsible for creating a new item based on the data provided in the request body. i had to use the .replace('Z', "") to remove the 'Z' character at the end of the ISO string. 
The .replace('Z', "") in the date handling addresses compatibility issues arising from Python 3.12 updates when trying to run the pytests. It ensures seamless integration by formatting date strings consistently, resolving potential discrepancies and ensuring the server processes dates correctly.


(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)



### Bibliography

Using Express Routing (no date). Available at: https://expressjs.com/en/guide/routing.html (Accessed: 4 January 2024).

Using Express Cors (no date). Available at: https://expressjs.com/en/resources/middleware/cors.html (Accessed: 4 January 2024).

Using nodejs Modules (no date). Available at: https://nodejs.org/dist/latest-v4.x/docs/api/modules.html#modules_modules (Accessed: 4 January 2024).