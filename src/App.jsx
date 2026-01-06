import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Toast from "./components/toastMessage/Toast";


function App() {
  return (
    <Router>
      <Toast />
      <AppRoutes />
    </Router>
  );
}
export default App;
