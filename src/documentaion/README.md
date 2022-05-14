# Documentation of steps made to finalise this app

### Create typeScript React App

```sh
npx create-react-app my-app --template typescript
cd my-app
npm start
```

### Download dependencies needed to start the App

```sh
npm install redux react-redux redux-thunk redux-logger
npm install -D @types/redux @types/react-redux @types/redux-thunk
npm install axios
```
### Creating a backend server to receive a json response 

Your could find the link for the backend server herer: [Backend link](https://github.com/Kholoud731/Vodafone-Backend)
npm start to run the server and to make sure it's working properly and send a json response [http://localhost:4000/](http://localhost:4000)

### Create all the actions types with the action return types in a separate file 

in separate action folder I started to create all types needed to fetch the response from the backend 
I started only created 4 types: 

- one to request data type
- one to receive the sucess response type
- one to receive the error response if any type
- one to have the async action to call the api type

all 4 types has the same type the only difference is the typeof "type prop" of each creator.

![Screenshot](../imgs/actionstype.png)
<img src="../imgs/actionstype.png" alt="Alt text" title="Optional title">

### Create action creators on a separate file

In the same folder there’s a file to host all the functions for each action creator

- one to request data
- one to receive the sucess response 
- one to receive the error response if any
- one to have the async action to call the api 

based on the api response from the middleware I started to dispatch related action creators 

![Screenshot](../imgs/actionsfunction.png)





























