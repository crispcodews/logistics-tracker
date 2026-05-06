import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo row — emoji sits beside the text and tagline group */}
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📦</span>

          {/* Text group — name and tagline stacked so tagline aligns under name */}
          <div className={styles.logoTextGroup}>
            <span className={styles.logoText}>Logistics Tracker</span>
            <p className={styles.tagline}>
              Manage and track your deliveries in real time
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
