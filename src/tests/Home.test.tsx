import * as ReactDOM from 'react-dom';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../components/Home';
import { store, AppState } from '../store/rootStore';
import { Provider } from 'react-redux';
import { AppActions } from "../actions/actionTypes";
import { createStore , applyMiddleware } from "redux"
import thunk, {ThunkMiddleware} from "redux-thunk"
import reducers from "../reducers"
import { setupWorker, rest } from 'msw'
import {setupServer} from "msw/node"
import { async } from 'q';


test('landing on Home page', () => {
  const history = createMemoryHistory()
  history.push('/')
  let container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(
    <Provider store={store}>
  <Router location={history.location} navigator={history}>
    <Home/>
  </Router>
    </Provider>
,container)

expect(container).toHaveTextContent("Analysis Chart")
})


// // const server = setupServer(
// //     rest.get("/api", (req,res, ctx)=>{
// //         return res(ctx.json({data}))
// //     })
// // )

// // beforeAll(()=> server.listen())
// // afterEach(()=> server.resetHandlers())
// // afterAll(()=> server.close())

// describe("trying an error fetch" ,()=>{
// //   const server = setupServer(
// //     rest.get("/api", (req,res, ctx)=>{
// //         return res(ctx.json({data}))
// //     })
// // )
//   const server = setupServer(rest.get('/books', (req, res, ctx) => {
//     return res.networkError('Failed to connect')
//   }))
//   beforeEach(()=> server.listen())
//   afterEach(()=>  server.close())
  

//   test('Recivers erro', async() => {


    
//     const history = createMemoryHistory()
//     history.push('/')
//     let container = document.createElement("div");
//     document.body.appendChild(container);
//     ReactDOM.render(
//       <Provider store = {createStore<AppState, AppActions,{},{}>(
//         reducers, 
//         applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))}>
//     <Router location={history.location} navigator={history}>
//       <Home/>
//     </Router>
//       </Provider>
  
//   ,container)
  
//   expect(container).toHaveTextContent("Analysis Chart")
  

//   })
  
// })





// import * as React from 'react';
// import Home from '../components/Home'// import redux component
// import * as ReactDOM from 'react-dom';

// // import {rest } from "msw"
// // import {setupServer} from "msw/node"
// import {render , screen, fireEvent, waitFor} from "@testing-library/react"


// test('renders without crashing', () => {
//     let container = document.createElement("div");
//     document.body.appendChild(container);
//     ReactDOM.render(<Home/> , container);
//     expect(container).toHaveTextContent("Analysis Chart")
// });

// // import * as React from 'react';
// // import * as ReactDOM from 'react-dom';
// // import App from '../App'; // import redux component
// // import {rest } from "msw"
// // import {setupServer} from "msw/node"
// // import {render , screen, fireEvent, waitFor} from "@testing-library/react"
// // // import the provider to wrap the component and the store to add it 
// // //  import create store to have a new one for each component as it's global for the whole app 

// // const server = setupServer(
// //     rest.get("/api", (req,res, ctx)=>{
// //         return res(ctx.json({data}))
// //     })
// // )

// // beforeAll(()=> server.listen())
// // afterEach(()=> server.resetHandlers())
// // afterAll(()=> server.close())

// // it('renders without crashing', async () => {
// //   const div = document.createElement('div');
// //   render(<App />);
// //   const out = await waitFor (()=> screen.getByRole("hello"))
// // });