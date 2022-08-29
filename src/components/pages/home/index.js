import React from 'react';
import { Link } from 'react-router-dom';
import MainSlider from '../../main-slider';
import MovieList from '../../movie-list';
import { BiChevronRight } from 'react-icons/bi';

import { category, movieType, tvType } from '../../../api/tmdbAPI';

import './_home.scss';

const HomePage = () => {
  return (
    <>
      <MainSlider />
      <div className='movies-box'>
        <div className='movies-header'>
          <div className='movies-title'>Trending movies</div>
          <Link className='movies-link' to='/movie'>
            <span>See more</span> <BiChevronRight />
          </Link>
        </div>

        <MovieList category={category.movie} type={movieType.popular} />
      </div>

      <div className='movies-box'>
        <div className='movies-header'>
          <div className='movies-title'>Popular series</div>
          <Link className='movies-link' to='/movie'>
            <span>See more</span> <BiChevronRight />
          </Link>
        </div>

        <MovieList category={category.tv} type={tvType.popular} />
      </div>

      <div className='movies-box'>
        <div className='movies-header'>
          <div className='movies-title'>Top rated</div>
          <Link className='movies-link' to='/movie'>
            <span>See more</span> <BiChevronRight />
          </Link>
        </div>

        <MovieList category={category.movie} type={movieType.top_rated} />
      </div>

      <div className='movies-box'>
        <div className='movies-header'>
          <div className='movies-title'>Featured series</div>
          <Link className='movies-link' to='/movie'>
            <span>See more</span> <BiChevronRight />
          </Link>
        </div>

        <MovieList category={category.tv} type={tvType.top_rated} />
      </div>
    </>
  );
};

export default HomePage;
