
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import AboutMe from '../../components/AboutMe/AboutMe'
import NavBar from '../../components/NavBar/NavBar'
import UserEdit from '../../components/UserEdit/UserEdit'
// import NotificationsList from '../../components/NotificationsList/NotificationsList
import ProDetails from '../../components/ProDetails/ProDetails'
// import ChatBox from '../../components/ChatBox/ChatBox'
import SearchBar from '../../components/SearchBar/SearchBar'
import UserListings from '../../components/UserListings/UserListings'


import * as educationAPI from '../../utilities/education-api'
import * as experienceAPI from '../../utilities/experience-api'
import * as skillAPI from '../../utilities/skill-api'
import * as usersAPI from '../../utilities/users-api'
import styles from './ProfilePage.module.scss'
import ChatBox from '../../components/ChatBox/ChatBox'

export default function ProfilePage({ user, setUser }) {
    const { userId } = useParams();
    const [userListings, setUserListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = () => {
        return !searchInput ? userListings : userListings.filter(userListing => userListing.name.toLowerCase().includes(searchInput.toLowerCase().trim()))
    }

    useEffect(() => {
        async function fetchUsers() {
            const users = await usersAPI.getAllUsers();
            setUserListings(users);
            setIsLoading(false);
        }
        fetchUsers();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // console.log("Number of user listings:", userListings.length);

    return (
        <main className={styles.ProfilePage}>
            <NavBar
                user={user}
                setUser={setUser}
            />
            <AboutMe
                user={user}
                setUser={setUser}
            />
            <ProDetails
                user={user}
                setUser={setUser}
            />

            <UserEdit
                user={user}
                setUser={setUser}
            />

            <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                userListings={userListings}
            />
            <UserListings userListings={handleSearch()} />

            {/* <ChatBox /> */}
        </main>
    )
}
