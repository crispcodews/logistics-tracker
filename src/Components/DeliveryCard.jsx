import styles from "./DeliveryCard.module.css";

function DeliveryCard({ delivery, onDelete }) {
  const getStatusClass = (status) => {
    if (status === "Pending") return styles.statusPending;
    if (status === "In Transit") return styles.statusInTransit;
    if (status === "Delivered") return styles.statusDelivered;
    return "";
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{delivery.recipient}</h3>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(delivery.id)}
        >
          Delete
        </button>
      </div>
      <div className={styles.info}>
        <p>
          <strong>Tracking ID:</strong> {delivery.id}
        </p>
        <p>
          <strong>Carrier:</strong> {delivery.carrier}
        </p>
        <p className={styles.fullWidth}>
          <strong>Address:</strong> {delivery.address}
        </p>
        <p>
          <strong>Est. Delivery:</strong> {delivery.estimatedDelivery}
        </p>
        <p>
          <strong>Status:</strong>
          <span
            className={`${styles.statusBadge} ${getStatusClass(
              delivery.status
            )}`}>

            {delivery.status}
          </span>
        </p>
      </div>
    </div>
  );
}

export default DeliveryCard;
