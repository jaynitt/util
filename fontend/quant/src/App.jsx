
import Home from "../pages/home"
import Login from '../pages/login'
import Event from '../pages/event'
import Projects from '../pages/project'
import Team from '../pages/team'      
import Gallery from '../pages/gallery'
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router"

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace/>}/>
      <Route path='/login' element={<Login/>}/>
     <Route path='/home' element={<Home/>}/>
     <Route path='/events' element={<Event/>}/>
     <Route path='/projects' element={<Projects/>}/>
      <Route path='/team' element={<Team/>}/>
      <Route path='/gallery' element={<Gallery/>}/>
      
    </Routes>
   </Router>
  )
}

export default App
