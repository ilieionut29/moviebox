import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

import tmdbAPI from '../../api/tmdbAPI';
import { apiConfig } from '../../api/axiosClient';
import { movieType, tvType, category } from '../../api/tmdbAPI';

import './_movies-page.scss';

const MoviesPages = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbAPI.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbAPI.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbAPI.search(props.category, { params });
      }
      // console.log(response);
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbAPI.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbAPI.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbAPI.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <div className='movie-grid'>
      <div className='movie-grid-content'>
        {items.map((item, i) => {
          const bg = apiConfig.w500Image(
            item.poster_path || item.backdrop_path
          );
          const link = '/' + category[props.category] + '/' + item.id;
          let relaseDate;

          if (item.release_date) {
            relaseDate = item.release_date.substring(0, 4);
          } else if (item.first_air_date) {
            relaseDate = item.first_air_date.substring(0, 4);
          } else {
            relaseDate = ' unknown ';
          }

          return (
            <Link to={link} className='movie-card' key={i}>
              <div className='movie-bk-box'>
                <div
                  className='movie-bk'
                  style={{ backgroundImage: `url(${bg})` }}
                ></div>
                <div className='movie-play'>
                  <FaPlay />
                </div>
              </div>
              <div className='movie-info'>
                {item.original_language},{relaseDate}
              </div>
              <h3 className='movie-name'>{item.title || item.name}</h3>
            </Link>
          );
        })}
      </div>
      {page < totalPage ? (
        <button className='show-more' onClick={loadMore}>
          Show more
        </button>
      ) : null}
    </div>
  );
};

export default MoviesPages;
