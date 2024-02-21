import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import Homepage from './pages/Homepage'
import Adminpage from './pages/Adminpage'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Loginpage/>} />
            <Route path="/signup"  element={<Signuppage/>} />
            <Route path="/home" element={<Homepage/>} />
            <Route path="/admin" element={<Adminpage/>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
