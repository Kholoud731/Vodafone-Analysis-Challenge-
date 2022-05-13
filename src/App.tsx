import React from "react";
import Home from "./components/Home";
import { Provider } from "react-redux"
import { store } from "./store/rootStore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowMonth from './components/ShowMonth'



const App: React.FC = ()=> {
  return (
    <React.StrictMode>
          <Provider store={store}>
             <Router>
              <Routes>
                  <Route path="/"  element={<Home/>} />
                  <Route path="/show/:str" element={<ShowMonth/>} />
              </Routes>
            </Router>
          </Provider>
    </React.StrictMode>


  );
}

export default App;
