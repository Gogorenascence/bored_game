import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { Game } from "./Games/GameInterface";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

const Coverflow: React.FC<{ games: Game[]}> = ({ games }) => {

    const navigate = useNavigate()

    return (
        <Swiper
            init={true} 
            className="swiper-container"
            loop={true}
            slidesPerView={"auto"}
            effect={"coverflow"}
            pagination={{ clickable: true }}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 50, 
                slideShadows: true,
                stretch: 0, 
                depth: 100,
                modifier: 1,
            }}
            navigation
            initialSlide={0}
            autoplay={{
                delay: 2000,
            }}
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        >
        {games.map((game) => (
            <SwiperSlide key={game.id} className="swiper-slide">
                <img src={game.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${game.id}`)}/>
            </SwiperSlide>
        ))}
        </Swiper>
    );
};

export default Coverflow;