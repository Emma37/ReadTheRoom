import "./App.css";

import Main from "./Main";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
