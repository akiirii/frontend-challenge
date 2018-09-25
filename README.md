# Tasks admin

At Fliit, we provide a Console for customers to manage delivery tasks. We need a feature that allows a customer to create a task in a web interface.

### Acceptance Criterias

1. We would like to have a web form with the following fields

```
  - Delivery At (eg: “2018-03-02 20:00”)
  - Recipient Name
  - Recipient Street
  - Recipient City
  - Recipient State
  - Recipient Country
  - Recipient Zipcode
  - Recipient Phone
```

2. All the fields should be required
3. When submitted, the form should make an http request to the backend
4. If the request to the backend was successful, the user should be redirected to a list page with a success notification
5. If the request was not successful the form should show an error message
6. The country field should be one of the allowed countries (the /countries endpoint of the back lists the allowed countries).

#### Please also provide:
- Basic documentation on how to setup local environment and run the service locally
- Use Git and remind to commit in a way that we can follow your progress. Doesn't need to be a public repository, in case it's private just send us the code with .git folder included.

#### Bonus points
- Unit tests
- Knowledge of application flow.
- Knowledge of modern best practices/coding patterns.
- Demonstration of good state management.
- Friendly design

### Setup
Feel free to use any framework you are confortable with.
We prepared an initial app with `Vue.js` and a `Node.js` backend, which are technologies that we use here at fliit.

> The backend is able to create tasks in memory.

- `$ yarn setup` install the dependencies
- `$ yarn start` run both client and server applications

### Backend request samples

**Creating a task**

```bash
curl -X POST -v -d '{"delivery_at":"2017-01-01", "recipient":{"name":"User","zipcode":"10249","street":"Test 23","city":"Berlin","state":"Berlin","country":"germany","phone":"+49 176 22222222"}}' -H "Content-Type: application/json" http://localhost:5000/tasks
```

**Listing tasks**

```bash
curl http://localhost:5000/tasks
```

**Listing allowed countries**

````bash
curl http://localhost:5000/countries
````

