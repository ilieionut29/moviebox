import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdAutoGraph } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';

import tmdbAPI, { category } from '../../api/tmdbAPI';
import { apiConfig } from '../../api/axiosClient';

import './_movie-list.scss';

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await tmdbAPI.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbAPI.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbAPI.similar(props.category, props.id);
      }

      setItems(response.results);
    };
    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className='movie-list'>
      <Swiper
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          515: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {items.map((item, i) => {
          const link = '/' + category[props.category] + '/' + item.id;
          const bg = apiConfig.w500Image(
            item.poster_path || item.backdrop_path
          );
          const popularity = (item.popularity / 100).toFixed(1);

          return (
            <SwiperSlide key={i}>
              <Link to={link} className='movie-card'>
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
                  {item.original_language},{' '}
                  {item.release_date
                    ? item.release_date.substring(0, 4)
                    : item.first_air_date.substring(0, 4)}
                </div>
                <h3 className='movie-name'>{item.title || item.name}</h3>
                <div className='movie-rate'>
                  <div className='note'>
                    <div className='imdb'>IMDb</div>
                    {(item.vote_average * 10).toFixed(1)} / 100
                  </div>
                  <div
                    className={`liked ${
                      popularity > 55.0 ? 'popular' : 'ununpopular'
                    }`}
                  >
                    {popularity}% <MdAutoGraph />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
