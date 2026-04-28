import styles from "./FilterSort.module.css";

function FilterSort({ onFilterChange, onSortChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <label className={styles.label}>Filter by Status</label>
        <select
          className={styles.select}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Sort by</label>
        <select
          className={styles.select}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="date-asc">Date (Earliest First)</option>
          <option value="date-desc">Date (Latest First)</option>
          <option value="recipient-asc">Recipient (A-Z)</option>
          <option value="recipient-desc">Recipient (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;
