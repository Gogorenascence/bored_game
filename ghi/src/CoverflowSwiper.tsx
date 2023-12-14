import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
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
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            className="swiper-container"
            loop={true}
            slidesPerView={'auto'}
            slidesPerGroup={1}
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
            initialSlide={1}
            autoplay={{
                delay: 3000,
            }}
        >
        {/* {games.map((game) => (
            <SwiperSlide key={game.id} className="swiper-slide">
                <img src={game.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${game.id}`)}/>
            </SwiperSlide>
        ))} */}
            <SwiperSlide className="swiper-slide">
                <img src={games[0]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[0].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[1]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[1].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[2]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[2].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[3]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[3].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[4]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[4].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[5]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[5].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[6]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[6].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[7]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[7].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[8]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[8].id}`)}/>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <img src={games[9]?.picture_url[1]} alt="game-image"
                onClick={() => navigate(`game/${games[9].id}`)}/>
            </SwiperSlide>
        </Swiper>
    );
};

export default Coverflow;