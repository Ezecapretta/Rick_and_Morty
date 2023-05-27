import style from './Card.module.css'
import {Link } from 'react-router-dom';
import {addFav, removeFav} from '../../redux/action'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'

const Card = ({id ,name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites}) => {
   let statusColor = '';
   if (status === 'Alive') {
      statusColor = '#42c1b6';
   } else if (status === 'Dead') {
      statusColor = '#eb4d4b';
   }

   const [isFav, setIsFav] = useState(false)

   const handleFavorite = () => {
      isFav ? removeFav(id) : addFav({id ,name, status, species, gender, origin, image, onClose})
      setIsFav(!isFav)
   }
   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites, id]);
   return (
      <div className={style.card}>
         <button className={style.cardClose} onClick={()=>{onClose(id)}}>X</button>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         <Link to={`/detail/${id}`}>
            <div className={style.centerImage}>
               <img className={style.cardImage} src={image} alt=""/>
            </div>
            {statusColor && (
               <div
                  className={style.cardStatus}
                  style={{ backgroundColor: statusColor }}
               >
                  {status}
               </div>
            )}
            <div className={style.cardDetails}>
               <h2 className={style.cardName}>{name}</h2>
               <div className={style.cardInfo}>
                  <span className={style.cardInfoLabel}>Species:</span>
                  <span className={style.cardInfoValue}>{species}</span>
               </div>
               <div className={style.cardInfo}>
                  <span className={style.cardInfoLabel}>Gender:</span>
                  <span className={style.cardInfoValue}>{gender}</span>
               </div>
               <div className={style.cardInfo}>
                  <span className={style.cardInfoLabel}>Origin:</span>
                  <span className={style.cardInfoValue}>{origin}</span>
               </div>
            </div>
         </Link>
      </div>
   )
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}
const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)