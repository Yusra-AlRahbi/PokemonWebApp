import './App.css'
import { Route,Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from '../theme';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';



function App() {

  return (
    <>
     <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route exact path='/'  element={<Home/>}/>
        <Route exact path='/pokemon/:id' element={<PokemonDetails/>}/>
     </Routes>

    </ThemeProvider>
    </>
  )
}

export default App
