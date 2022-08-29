import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

import HomePage from './components/pages/home';
import Catalog from './components/pages/catalog';
import Details from './components/pages/details';

import './web/css/_index.scss';
import 'swiper/css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className='content'>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/:category' element={<Catalog />} />
          <Route path='/:category/:id' element={<Details />} />
          <Route path='/:category/search/:keyword' element={<Catalog />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
