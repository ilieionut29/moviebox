import React from 'react';
import { useParams } from 'react-router';
import MoviesPages from '../../movies-page';

import { category as cat } from '../../../api/tmdbAPI';

import catalogBg from '../../../web/assets/catalog_bg.jpeg';
import './_catalog.scss';

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <div
        className='movie-catalog-header'
        style={{ backgroundImage: `url(${catalogBg})` }}
      >
        <span>{category === cat.movie ? 'Movies list' : 'TV Series list'}</span>
      </div>
      <div className='movie-catalog'>
        <MoviesPages category={category} />
      </div>
    </>
  );
};

export default Catalog;
