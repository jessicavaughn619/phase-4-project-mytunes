import React from "react";
import UserCard from "./UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "../stylesheets/UserList.scss";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
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
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{clickable: true }}
        scrollbar={{draggable: true }}>
            {allUsers}
        </Swiper>
        </div>
    )
}

export default UserList;