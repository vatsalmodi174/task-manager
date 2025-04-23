
import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Landingpage from './Pages/LandingPage/LandingPage'
import DashboardPage from './Pages/dashboardpage/dashboardpage'
import Addtaskpage from './Pages/Addtaskpage/Addtaskpage'

function App() {
 

  return (
    <>
       <Routes>
       <Route path='/' element={<Landingpage></Landingpage>} />
       <Route path='/dashboard' element={<DashboardPage></DashboardPage>} />
       <Route path='/Add' element={<Addtaskpage></Addtaskpage>} />
       <Route path="/edit/:id" element={<Addtaskpage></Addtaskpage>} />



       </Routes>
    </>
  )
}

export default App
