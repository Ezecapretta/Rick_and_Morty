import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav'
import { useState, useEffect  } from 'react';
import axios from 'axios'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Favorites from './components/Favorites/Favorites';
import Forms from "./components/Form/Form";
const EMAIL = 'caprettaeze@gmail.com';
const PASSWORD = 'asd123';

function App() {
  const [characters, setCharacters] = useState([]);
  const {pathname} = useLocation();

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);


  function login(userData) {
     if (userData.password === PASSWORD && userData.email === EMAIL) {
        setAccess(true);
        navigate('/home');
     }
  };

  useEffect(() => {
    !access && navigate('/');
  }, [access,navigate]);
  

  const onSearch = (id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
          setCharacters((characters) => [...characters, data]);
      } else {
          window.alert('¡No hay personajes con este ID!');
      }
    });
  };
  const onClose = (id) => {
    const filteredCharacters = characters.filter((char) => Number(char.id) !== Number(id));
    setCharacters(filteredCharacters);
  };
  
  return (
    <>
      {pathname !== '/' && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Forms login={login}/>}/>
        <Route path='/landingPage' element={<LandingPage/>}/>
        <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/favorite' element={<Favorites/>}/>
      </Routes>
    </>
  );
}

export default App;
