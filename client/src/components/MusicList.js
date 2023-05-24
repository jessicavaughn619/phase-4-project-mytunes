import React from 'react';
import ArtistCard from './ArtistCard';
import SongCard from './SongCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode, Mousewheel } from 'swiper';
import "../stylesheets/MusicList.scss";
import 'swiper/scss';
import 'swiper/scss/scrollbar';

const MusicList = ({ artists }) => {

  const allArtists = artists.map((artist) => (
    <SwiperSlide>
      <ArtistCard
          key={artist.id}
          artist={artist}
      />
    </SwiperSlide>))

  return (
    <div id="musiclist-container-wrapper">
        <h2>Artists</h2>
        <Swiper
        modules={[Scrollbar, FreeMode, Mousewheel]}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        mousewheel={true}
        scrollbar={{draggable: true }}>
            {allArtists}
        </Swiper>
        <h2>Genres</h2>
        <Swiper
        modules={[Scrollbar, FreeMode, Mousewheel]}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        mousewheel={true}
        scrollbar={{draggable: true }}>
            Genres go here!
        </Swiper>
        <h2>Songs</h2>
        <Swiper
        modules={[Scrollbar, FreeMode, Mousewheel]}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        mousewheel={true}
        scrollbar={{draggable: true }}>
            Songs go here!
        </Swiper>
    </div>
  )
}

export default MusicList;
