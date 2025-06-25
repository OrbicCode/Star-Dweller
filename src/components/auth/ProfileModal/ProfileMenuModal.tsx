import styles from './ProfileMenuModal.module.css';

interface ProfileMenuModalProps {
  onProfileClick: () => void;
}

export default function ProfileMenuModal({
  onProfileClick,
}: ProfileMenuModalProps) {
  return (
    <div className={styles.modalContainer}>
      <nav>
        <ul>
          <li onClick={onProfileClick} className={styles.signoutForm}>
            <form action='/auth/signout' method='POST'>
              <button type='submit' onClick={onProfileClick}>
                Sign Out
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
}
