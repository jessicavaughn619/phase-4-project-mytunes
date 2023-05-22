import React from 'react';
import ArtistCard from './ArtistCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "../stylesheets/MusicList.scss";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
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
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{clickable: true }}
        scrollbar={{draggable: true }}>
            {allArtists}
        </Swiper>
    </div>
  )
}

export default MusicList;
