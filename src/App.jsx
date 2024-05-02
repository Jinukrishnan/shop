import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {BrowserRouter,Routes,Route}from'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'
import Details from './pages/Details'
import Cart from './pages/Cart'
function App() {

  const [search,setSearch]=useState("")

  return (
    <>
    <BrowserRouter>
    <Nav setSearch={setSearch} />
          <Routes>
              <Route path='/' element={<Home search={search}/>}  />
              <Route  path='/details/:id' Component={Details}/>
              <Route path='/cart' Component={Cart}/>
          </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
