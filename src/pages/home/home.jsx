import React from 'react';
import Swiper from '../../components/swiper/swiper.jsx'; // Poprawnie importujemy komponent Swiper
import '../../components/swiper/_swiper.scss'; // Importujemy odpowiedni plik SCSS z stylami

const Home = () => {
    return (
        <div>
            <Swiper />
        </div>
    );
};

export default Home;

