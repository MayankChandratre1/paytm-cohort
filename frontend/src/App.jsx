import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Auth from "./Routes/Auth"
import Home from "./Routes/Home"
import SendMoney from "./Routes/SendMoney"
import Profile from "./Routes/Profile"

function App() {

  return (
    <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} /> {/* Associate HomePage with the root route */}
           <Route path="/signup" element={<Auth />} /> {/* Associate HomePage with the root route */}
           <Route path="/send" element={<SendMoney />} /> {/* Associate HomePage with the root route */}
           <Route path="/profile" element={<Profile />} /> {/* Associate HomePage with the root route */}
           {/* Other routes */}
         </Routes>
    </BrowserRouter>
  )
}

export default App
