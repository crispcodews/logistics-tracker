import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo icon and app name */}
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📦</span>
          <span className={styles.logoText}>Logistics Tracker</span>
        </div>
        {/* Tagline */}
        <p className={styles.tagline}>Manage and track deliveries</p>
      </div>
    </header>
  );
}

export default Header;
