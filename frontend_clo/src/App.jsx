import React ,{ useState,  } from 'react'
import './index.css'
import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'

import { Navbar, Home, Hero, ManageGrades, CLO, Activity,Footer,AddStudents, Info } from './components'
function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return (
    <div dir="rtl"> <Navbar /> 
     <BrowserRouter>
    <ScrollToTop />
    <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/options/:id" element={<Hero />} />
          <Route path="/addstudents/:id" element={<AddStudents />} />
          <Route path="/managegrades/:id" element={<ManageGrades />} />
          <Route path="/clo/:id" element={<CLO />} />
          <Route path="/info/:id" element={<Info />} />
          <Route path="/activity/:id" element={<Activity />} />

          </Routes>
    
   
<Footer />
</BrowserRouter>
    </div>
  )
}

export default App
