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


Server Framework Features
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


Server Language Features
-----------------------

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
