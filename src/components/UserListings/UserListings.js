import React from 'react';
import UserItem from '../UserItem/UserItem';
import styles from './UserListings.module.scss'

export default function UserListings({ userListings }) {
    // Check if userListings is not an array or is empty
    if (!Array.isArray(userListings) || userListings.length === 0) {
        return (
            <main>
                <p>No user listings available.</p>
            </main>
        );
    }

    // Map over jobListings to display each job item
    const displayUsers = userListings.map(searchedUser =>
        <UserItem
            key={searchedUser._id}
            UserItem={searchedUser}
        />
    );

    return (
        <main className={styles.userListings}>
            {displayUsers}
        </main>
    );
}
