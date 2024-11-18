# Node.js Project

## Project Overview
This project is a basic setup for a Node.js application, including development tools like ESLint for code quality and Nodemon for automatic restarts in the development environment. This setup is ideal for building Node.js applications with a focus on maintaining clean code and an efficient workflow.

## Requirements
- Node.js
- npm (Node Package Manager)
- Git

## Project Structure
- **index.js**: Entry point for the Node.js application.
- **server.js**: Contains the REST API implementation.
- **views/**: Directory containing Pug templates for rendering HTML.
  - **index.pug**: The main landing page template.
- **package.json**: Contains dependencies, scripts, and project metadata.
- **package-lock.json**: Automatically generated file that locks the versions of dependencies.
- **.eslintrc.json**: Configuration for ESLint to enforce code quality.
- **.gitignore**: Specifies files and folders to be ignored by Git.
- **README.md**: Project documentation.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/node.js-backend1.git
   cd node.js-backend1
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   node server.js
   ```

4. **Access the Application**: Open your web browser and navigate to `http://localhost:6000` to view the application.

## API Endpoints

### 1. Get All Items
- **Endpoint**: `GET /api/data`
- **Description**: Retrieves all items.
- **Response**: Returns an array of items.

### 2. Add a New Item
- **Endpoint**: `POST /api/data`
- **Description**: Adds a new item.
- **Request Body**:
  ```json
  {
      "name": "New Item"
  }
  ```
- **Response**: Returns the created item with a unique ID.

### 3. Delete an Item
- **Endpoint**: `DELETE /api/data/:id`
- **Description**: Deletes an item by ID.
- **Response**: Returns a 204 status code on success.

### 4. Update an Item
- **Endpoint**: `PUT /api/data/:id`
- **Description**: Updates an existing item by ID.
- **Request Body**:
  ```json
  {
      "name": "Updated Item"
  }
  ```
- **Response**: Returns the updated item.

### 5. Search for Items
- **Endpoint**: `GET /api/data/search`
- **Description**: Searches for items by name.
- **Query Parameters**: 
  - `name`: The name to search for.
- **Response**: Returns an array of matching items.

## Example Usage

1. **Get All Items**:
   ```bash
   curl http://localhost:6000/api/data
   ```

2. **Add a New Item**:
   ```bash
   curl -X POST http://localhost:6000/api/data -H "Content-Type: application/json" -d '{"name": "New Item"}'
   ```

3. **Search for Items**:
   ```bash
   curl http://localhost:6000/api/data/search?name=Item
   ```

## License
This project is licensed under the ISC License.
