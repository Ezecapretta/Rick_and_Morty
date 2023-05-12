import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import logo from '../../assets/logo.png'

const Nav = ({onSearch}) => {
    return(
        <div className={style.nav}>
            <div className={style.logoContainer}>
                <NavLink to={'/landingPage'}>
                    <img src={logo} alt="Rick and Morty Logo" className={style.logo}/>
                </NavLink>
            </div>
            <NavLink to={'/about'} className={style.navLink}>
                <button className={style.navButton}>About</button>
            </NavLink>
            <NavLink to={'/home'} className={style.navLink}>
                <button className={style.navButton}>Home</button>
            </NavLink>
            <NavLink to={'/favorite'} className={style.navLink}>
                <button className={style.navButton}>Favorites</button>
            </NavLink>
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}

export default Nav