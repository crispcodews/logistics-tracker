import styles from "./DeliveryCard.module.css";

function DeliveryCard({ delivery, onDelete }) {
  // Returns the correct CSS class for the status badge
  // based on the delivery's current status
  const getStatusClass = (status) => {
    if (status === "Pending") return styles.statusPending;
    if (status === "In Transit") return styles.statusInTransit;
    if (status === "Delivered") return styles.statusDelivered;
    return "";
  };

  return (
    <div className={styles.card}>
      {/* Card header - recipient name and delete button */}
      <div className={styles.cardHeader}>
        <h3>{delivery.recipient}</h3>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(delivery.id)}
        >
          Delete
        </button>
      </div>

      {/* Card body - delivery details in two column grid */}
      <div className={styles.info}>
        <p>
          <strong>Tracking ID:</strong> {delivery.id}
        </p>
        <p>
          <strong>Carrier:</strong> {delivery.carrier}
        </p>

        {/* Address spans full width to prevent awkward wrapping */}
        <p className={styles.fullWidth}>
          <strong>Address:</strong> {delivery.address}
        </p>
        <p>
          <strong>Est. Delivery:</strong> {delivery.estimatedDelivery}
        </p>

        {/* Status badge - color changes based on delivery status */}
        <p>
          <strong>Status:</strong>
          <span
            className={`${styles.statusBadge} ${getStatusClass(
              delivery.status
            )}`}
          >
            {delivery.status}
          </span>
        </p>
      </div>
    </div>
  );
}

export default DeliveryCard;
