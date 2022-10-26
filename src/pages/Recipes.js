import React from 'react';
import { string } from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Drinks from './Drinks';
import Meals from './Meals';

export default function Recipes({ title }) {
  return (
    <>
      <Header title={ title } />

      <main>
        {title === 'Meals' ? <Meals /> : <Drinks />}
      </main>

      <Footer />

    </>
  );
}

Recipes.propTypes = {
  title: string.isRequired,
};
