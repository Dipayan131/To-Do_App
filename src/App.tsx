import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import { OldTask } from "./oldTasks/OldTask";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/oldtask" element={<OldTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
