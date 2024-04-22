import './App.css'
//import axios from 'axios';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Welcome from './pages/Welcome';
import { ThemeContextProvider } from './contexts/ThemeContext';



const router = createBrowserRouter(
  createRoutesFromElements(<Route element={<MainLayout />} >
    <Route path='/' element={<Welcome />} />
  </Route>)
);

function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  )
}

export default App
