# Fliit Admin (Frontend Challenge)

## Running the project

```
npm i nodemon -g
yarn
yarn dev
```

## Servers

The servers should start at the following addresses:

* Frontend
  * http://localhost:3000
* Backend
  * http://localhost:5000

## Backend examples

### Creating a task
```
curl -X POST -v -d '{"delivery_at":"2017-01-01", "recipient":{"name":"User","zipcode":"10249","street":"Test","street_number":23,"city":"Berlin","state":"Berlin","country":"Germany","phone":"+49 176 22222222"}}' -H "Content-Type: application/json" http://localhost:5000/tasks
```

### Listing tasks
```
curl http://localhost:5000/tasks
```
