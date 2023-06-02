import React from 'react';
import ArtistCard from './ArtistCard';
import SongCard from './SongCard';
import GenreCard from './GenreCard';
import Search from './Search';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode, Mousewheel } from 'swiper';
import "../stylesheets/MusicList.scss";
import 'swiper/scss';
import 'swiper/scss/scrollbar';

const MusicList = ({ artists, onSetArtist, isLoading, 
  onAddToPlaylist, search, onSearch }) => {

  const filteredMusic = artists.filter((artist) => (artist.name.toLowerCase().includes(search.toLowerCase())));
  
  const genres = [];
  filteredMusic.map((artist) => (genres.push(artist.genres)));
  const uniqueGenres = [...new Set(genres)];
  const filteredUniqueGenres = uniqueGenres.filter(genre => genre !== null);

  const allArtists = filteredMusic.map((artist) => (
    <SwiperSlide>
      <ArtistCard 
          key={artist.id}
          artist={artist}
          onSetArtist={onSetArtist}
      />
    </SwiperSlide>))

const allUniqueGenres = filteredUniqueGenres.map((genre) => (
  <SwiperSlide>
    <GenreCard
        key={genre}
        genre={genre}
        onSetArtist={onSetArtist}
    />
  </SwiperSlide>))

const allSongs = filteredMusic.map((artist) => (
  (artist.songs).map((song) => (
    <SwiperSlide>
      <SongCard
          key={song.id}
          song={song}
          onAddToPlaylist={onAddToPlaylist}
      />
  </SwiperSlide>
  ))))

  return (
      <div id="musiclist-container-wrapper">
      {isLoading ? <h1>Loading</h1> :
        <>
        <h2>Artists</h2>
        <Search 
        search={search}
        onSearch={onSearch}/>
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
            {allUniqueGenres}
        </Swiper>
        <h2>Songs</h2>
        <Swiper
        modules={[Scrollbar, FreeMode, Mousewheel]}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        mousewheel={true}
        scrollbar={{draggable: true }}>
            {allSongs}
        </Swiper></>
      }
    </div>
  )
}

export default MusicList;
