import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../../movie-list';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';

import tmdbAPI from '../../../api/tmdbAPI';
import { apiConfig } from '../../../api/axiosClient';

import './_details.scss';

const Details = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbAPI.detail(category, id, { params: {} });
      setItem(response);
    };

    const getCredits = async () => {
      const res = await tmdbAPI.credits(category, id);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
    getDetail();
    // console.log(item);
  }, [category, id, item]);

  return (
    <>
      {item && (
        <>
          <div
            className='detail-banner'
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className='detail-movie'>
            <div className='detail-movie-box'>
              <div className='detail-movie-poster'>
                <div
                  className='img'
                  style={{
                    backgroundImage: `url(${apiConfig.originalImage(
                      item.poster_path || item.backdrop_path
                    )})`,
                  }}
                ></div>
              </div>
              <div className='detail-movie-info'>
                <div className='title'>{item.title || item.name}</div>
                <p className='overview'>{item.overview}</p>
                <div className='genres'>
                  {item.genres &&
                    item.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className='genres-item'>
                        {genre.name}
                      </span>
                    ))}
                </div>
                <div className='actors'>
                  <h2 className='actors-title'>Actors</h2>
                  <div className='actors-box'>
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
                      {casts.map((item, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div key={i} className='actors-item'>
                              <img
                                src={apiConfig.w500Image(item.profile_path)}
                                alt='actor-img'
                                className='actors-img'
                              />
                              <p className='actors-name'>{item.name}</p>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='section-similar'>
            <div className='section-similar-title'>
              <h2>Similar</h2>
            </div>
            <MovieList category={category} type='similar' id={item.id} />
          </div>
        </>
      )}
    </>
  );
};

export default Details;
