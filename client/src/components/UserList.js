import React from "react";
import UserCard from "./UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode, Mousewheel } from 'swiper';
import "../stylesheets/UserList.scss";
import 'swiper/scss';
import 'swiper/scss/scrollbar';

function UserList({ users }) {

    const allUsers = users.map((user) => (
        <SwiperSlide>
            <UserCard
            key={user.id}
            user={user} />
        </SwiperSlide>))
    return (
        <div id="userlist-container-wrapper">
        <h2>Users</h2>
        <Swiper
        direction={"vertical"}
        modules={[Scrollbar, FreeMode, Mousewheel]}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        mousewheel={true}
        scrollbar={{draggable: true }}>
            {allUsers}
        </Swiper>
        </div>
    )
}

export default UserList;