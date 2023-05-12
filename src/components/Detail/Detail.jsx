import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import style from './Detail.module.css';

const Detail = () => {
    const {id} = useParams();
    const [character, setCharacter] = useState({})
    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            } else {
                window.alert('No hay personajes con ese ID');
            }
        });
        return setCharacter({});
    }, [id]);
    return(
    <div className={style.detailContainer}>
      <img src={character.image} alt="" className={style.detailImg} />
      <div className={style.detailInfo}>
        <h1 className={style.detailTitle}>{character.name}</h1>
        <div className={style.detailDescription}>
          <p className={style.detailDescriptionRow}>
            <span className={style.detailInfoTitle}>Species:</span>{' '}
            <span className={style.detailInfoValue}>{character.species}</span>
          </p>
          <p className={style.detailDescriptionRow}>
            <span className={style.detailInfoTitle}>Gender:</span>{' '}
            <span className={style.detailInfoValue}>{character.gender}</span>
          </p>
          <p className={style.detailDescriptionRow}>
            <span className={style.detailInfoTitle}>Origin:</span>{' '}
            <span className={style.detailInfoValueOri}>{character.origin?.name}</span>
          </p>
          <p className={style.detailDescriptionRow}>
            <span className={style.detailInfoTitle}>Status:</span>{' '}
            <span className={style.detailInfoValue}>{character.status}</span>
          </p>
        </div>
      </div>
    </div>
    )
};

export default Detail