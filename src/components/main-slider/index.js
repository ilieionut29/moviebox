import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';

import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbAPI, { movieType } from '../../api/tmdbAPI';
import { apiConfig } from '../../api/axiosClient';

import './_main-slider.scss';

const MainSlider = () => {
  const [movieItems, setMovieItems] = useState([]);
  const navigate = useNavigate();

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 7));
      } catch {
        console.log('errot fetching movie list');
      }
    };
    getMovies();
  }, []);

  return (
    <div className='main_slider'>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true,
        }}
        loop={true}
        slidesPerView={1}
        pagination={pagination}
      >
        {movieItems.map((item) => {
          const background = apiConfig.originalImage(
            item.backdrop_path ? item.backdrop_path : item.poster_path
          );

          return (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <div
                  className={`main_slider-content ${
                    isActive ? 'active' : 'not-active'
                  }`}
                >
                  <div
                    className='main_slider-bk'
                    style={{ backgroundImage: `url(${background})` }}
                  />
                  <h2 className='title'>{item.title}</h2>
                  <div className='info'>
                    <div className='rate'>
                      <div className='imdb'>IMDb</div>
                      {(item.vote_average * 10).toFixed(1)} / 100
                    </div>
                    <div className='date'>{item.release_date}</div>
                  </div>
                  <div className='description'>{item.overview}</div>
                  <button
                    className='watch-btn'
                    onClick={() => navigate('/movie/' + item.id)}
                  >
                    <FaPlayCircle /> Watch now
                  </button>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MainSlider;
