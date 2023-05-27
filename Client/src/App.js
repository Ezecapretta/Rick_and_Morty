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

function App() {
  const [characters, setCharacters] = useState([]);
  const {pathname} = useLocation();

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);


//   function login(userData) {
//     const { email, password } = userData;
//     const URL = 'http://localhost:3001/rickandmorty/login/';
//     axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
//         const { access } = data;
//         setAccess(access);
//         access && navigate('/home');
//     });
// }

  const login = async (userdata) => {
    try {
      const {email, password} = userdata;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const response = await axios.get(URL + `?email=${email}&password=${password}`)
      const {access} = response.data
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    !access && navigate('/');
  }, [access,navigate]);
  

  // const onSearch = (id) => {
  //   axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
  //     if (data.name) {
  //         setCharacters((characters) => [...characters, data]);
  //     } else {
  //         window.alert('¡No hay personajes con este ID!');
  //     }
  //   });
  // };
  const onSearch = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`)
      const data = response.data;
      if (data.name){
        setCharacters((characters) => [...characters, data]);
      }
    } catch (error) {
      alert('¡No hay personajes con este ID!');
    }
  }
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
