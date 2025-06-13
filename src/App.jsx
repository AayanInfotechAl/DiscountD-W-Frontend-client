import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
