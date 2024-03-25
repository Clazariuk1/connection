import styles from './UserItem.module.scss'

export default function userListing({ userItem }) {
    return (
        <div className={styles.userItemCard}>
            <div className={styles.userItemPic}>
                <img className={styles.userItemPicFile} src="" />
            </div>

        <div key={ userItem._id }className={styles.userItem}>
            <h2 className={styles.userData}>{userItem.name}</h2>
            <div className={styles.userData}>Email: {userItem.email}</div>
            </div>
        </div>
    );
}

// className="user-listing"

// userItem isn't correctly returning atm.
