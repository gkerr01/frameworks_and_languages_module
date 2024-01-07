Technical Report
================

This report is a comprehensive review of the research I did on programming languages and frameworks. The main goal is to demonstrate a deep understanding of frameworks, including their fundamental principles, programming uses, and particular benefits for software testing. By analysing frameworks, explaining their functions and highlighting their importance in the field of software testing, we can demonstrate that these technological elements are essential to the process of developing software. 


Critique of Server/Client prototype
---------------------

### Overview of Client prototype
The client prototype is a simple web client for the FreeCycle platform, enabling straightforward item creation, management, and listing, along with user authentication. It uses JavaScript to manage functionalities such as parsing URL parameters for the API endpoints, handling item operations, and facilitating a user-friendly interface. It uses css for a simple and straightforward styling approach to maintain readability and ease of understanding.

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

The server prototype is a basic http server that implements python. The server parses HTTP requests, handles errors, and generates HTTP responses. It listens on a specified port, executes a provided app function and responds to incoming HTTP requests.


### (Multiple hhtp requests )

 while True:
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
These previous implementations should not be used due to its simplicity, potential security vulnerabilities, incomplete features, hardcoded values and limited functionality. They also lack scalability, maintainability, making them unsuitable for real-world applications where reliability and security are paramount.

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

These endpoints are particularly useful as they allow developers to handle different types of client requests based on the intended action from these defined routing methods like app.get() and app.post() are correspond to specific HTTP methods (GET, POST, etc.). They also provide a clear and structured way to organize different functionalities or resources based on the URL.  (Using Express Routing, no date)



### (Route parameter)

app.get('/item/:itemId', (req, res) => {
  // Access the captured value using req.params.itemId
  const itemId = req.params.itemId;
  // ... (code for handling the GET request with a dynamic parameter)
});

// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

(Using Express Routing, no date)

In Express, the route parameter :itemId captures dynamic values from the URL. Accessed through req.params.itemId, it enables customable handling of GET requests, allowing dynamic data retrieval and processing based on the specified parameter value. These route parameters improve the readability of URLs, and meaningful identifiers are incorporated into paths to provide readable human-friendly code. Furthermore, route handlers allow for modular and reusable code by effectively handling multiple instances of a resource by using captured parameter values found in req.params. 



### (Middleware)

app.use(cors());

// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

In the provided Code snippet above, CORS middleware app.use(cors()), is used to manage cross-origin requests. This enhances server security by specifying which origins can access its resources, promoting secure and controlled cross-origin interactions. This means that CORS headers are set for all incoming requests, allowing cross-origin resource sharing universally by using app.use(cors()). Using Express Cors (no date)

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


### (Python 3.12:)

During the course of my assessment 1, python had updated itself when it came to passing the pytests within the assessment. This updates in particular was a workaround for potential issues with the previous Python updates, particularly in the handling of date strings.
This meant that i had to hard code into my server a way round for the test to pass into the string below.

    date_from: req.body.date_from || new Date().toISOString().replace('Z',""), 

// https://supreme-guide-x44p9gvjrqgcvgxj.github.dev//workspaces/frameworks_and_languages_module/server/server.js

The code snippet above is the route handler for handling POST requests to the "/item" endpoint. Specifically, it's responsible for creating a new item based on the data provided in the request body. i had to use the .replace('Z', "") to remove the 'Z' character at the end of the ISO string. 
The .replace('Z', "") in the date handling addresses compatibility issues arising from Python 3.12 when trying to run the pytests. It ensures seamless integration by formatting date strings consistently, resolving potential discrepancies and ensuring the server processes dates correctly. Using Python 3.12 (Oct. 2, 2023).




Vue and Bulma Client Framework Features
-------------------------

### (Vue Data Bindings)

I used v-model directives to establish two-way data bindings between my form input fields and the data properties (items.user_id, items.lat, etc.). This ensures that changes in the form fields are reflected in the data and vice versa.

<div class="columns is-3-mobile is-1-desktop">
  <div class="column">
    <!-- Form for Creating Items -->
    <form @submit.prevent="createItem">
      <!-- Input Fields -->
      <div class="field">
        <label class="label">User ID</label>
        <div class="control">
          <!-- v-model used here -->
          <input v-model="items.user_id" class="input" name="user_id" placeholder="User ID">
        </div>
      </div>
    </form>
  </div>
</div>

//  https://supreme-guide-x44p9gvjrqgcvgxj.github.dev/workspaces/frameworks_and_languages_module/client/index.html


In each input field (User ID, Latitude, Longitude, Image, Keywords, and Description), i have used v-model to bind the input value to the corresponding property in the items object. This two-way data binding simplifies the synchronization between the UI and the data model, enhancing the overall user experience. Using Vue V-Model (no Date).


### (Fetch)

In Vue.js applications, the  fetch API is used for making HTTP requests to interact with a server-side API. It replaces XMLHttpRequest with a more powerful and flexible feature set. Using Vue Fetch (no Date). Using fetch in Vue.js ensures modern browser support, leverages Promises for clean asynchronous code, maintains a consistent API design, and seamlessly integrates with Vue methods, simplifying asynchronous operations and enhancing code readability. This is shown below from my assessment 1.

 fetch(`${urlAPI}/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

//  https://supreme-guide-x44p9gvjrqgcvgxj.github.dev/workspaces/frameworks_and_languages_module/client/index.html


### (Grid System)

Within my implementation of Bulma I Used a grid system to structure the layout of the web application.

<div class="columns is-3-mobile is-1-desktop">
  <div class="column">
    <!-- Form for Creating Items -->
    <form @submit.prevent="createItem">
      <!-- Input Fields -->
      <div class="field">
        <label class="label">User ID</label>
        <div class="control">
          <!-- v-model used here -->
          <input v-model="items.user_id" class="input" name="user_id" placeholder="User ID">
        </div>
      </div>
    </form>
  </div>
</div>

//  https://supreme-guide-x44p9gvjrqgcvgxj.github.dev/workspaces/frameworks_and_languages_module/client/index.html

The outermost div with the class columns represents a grid container. In Bulma, this class is used to create a horizontal grid where you can place columns. The is-3-mobile and is-1-desktop classes are part of Bulma's responsive design and determine the column width based on the screen size.
is-3-mobile: The column takes up 3 units on mobile devices.
is-1-desktop: The column takes up 1 unit on desktop devices.

By utilizing Bulma's grid system, a responsive layout is made that adapts to different screen sizes. The use of the columns classes means that the content is organized in a structured manner, and the responsiveness is handled by Bulma's predefined classes. This grid system creates a visually appealing and consistent layout across various devices which would not be structured without a framework. Using Bulma Columns (no Date).



Client Language Features
------------------------

### (Menu Script)


In the mobile menu script, I've used JavaScript to select the burger icon and navbar menu elements. When the burger icon is clicked, it toggles the 'is-active' class on the navbar menu, enabling mobile menu visibility.  Using Bulma Navbar (No Date).

<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
</a>
 
<!-- Mobile Menu Script -->
<script>
    const burgerIcon = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    burgerIcon.addEventListener('click', () => {
        navbarMenu.classList.toggle('is-active');
    });
</script>

//  https://supreme-guide-x44p9gvjrqgcvgxj.github.dev/workspaces/frameworks_and_languages_module/client/index.html


The mobile menu script enhances user experience by toggling menu visibility, providing seamless navigation. It solves the problem of limited screen space on mobile devices, ensuring users can easily access and interact with the menu, improving overall usability and accessibility.

### (External Stylesheet Link)

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

//  https://supreme-guide-x44p9gvjrqgcvgxj.github.dev/workspaces/frameworks_and_languages_module/client/index.html


The snippet above utilizes the <link> HTML tag to include an external stylesheet in the HTML document. This tag to the Bulma CSS framework, version 0.9.4, in particular specifies the relationship as a stylesheet, ensuring consistent styling and responsive design across the website.
External stylesheet links provide consistent, easily maintained design across pages. They reduce page size  and enable global application of styles. This ensures efficient, scalable, and collaborative development workflows.


Conclusions
-----------

In conclusion, the client and server prototypes emphasises how important frameworks are to modern software development. These frameworks deliver structured, scalable, and secure solutions, adhering to best practices and significantly enhancing development efficiency. They follow best practices and increase development efficiency while promoting security and dependability. In essence, frameworks provide a solid foundation for building resilient and secure software applications.


Therefore, selecting the right frameworks is crucial for robust and scalable software development. Adopting established frameworks like Express for server-side development and Vue.js with Bulma for the client-side offers numerous advantages. Express simplifies server implementation by providing a structured, modular, and scalable architecture, enhancing security through middleware like CORS, and promoting best practices in routing and error handling. Its active community support ensures ongoing updates and improvements, contributing to reliability.

On the client side, Vue.js facilitates seamless two-way data binding, making UI updates efficient and responsive. Coupled with Bulma's grid system and styling capabilities, it ensures a visually appealing and consistently structured user interface across devices. Vue.js and Bulma collectively enhance development speed, maintainability, and code readability. Additionally, the use of external stylesheets and CDN links ensures standardized styling and improves page loading performance. In summary, these chosen frameworks provide a well-balanced blend of efficiency, security, and maintainability, laying a strong foundation for developing reliable and scalable software applications.


### Bibliography

Using Express Routing (no date). Available at: https://expressjs.com/en/guide/routing.html (Accessed: 4 January 2024).

Using Express Cors (no date). Available at: https://expressjs.com/en/resources/middleware/cors.html (Accessed: 4 January 2024).

Using nodejs Modules (no date). Available at: https://nodejs.org/dist/latest-v4.x/docs/api/modules.html#modules_modules (Accessed: 4 January 2024).

Using Python 3.12 (Oct. 2, 2023). Available at: https://www.python.org/downloads/release/python-3120/?ref=upstract.com (Accessed: 4 January 2024).

Using Vue V-Model (no Date). Available at: https://vuejs.org/guide/components/v-model.html (Accessed: 5 January 2024).

Using Vue Fetch (no Date). Available at: https://www.koderhq.com/tutorial/vue/http-fetch/#fetch-api (Accessed: 5 January 2024).

Using Bulma Columns (no Date). Available at: https://bulma.io/documentation/columns/ (Accessed: 5 January 2024).

Using Bulma Navbar (No Date). Available at: https://bulma.io/documentation/components/navbar/ (Accessed: 5 January 2024).