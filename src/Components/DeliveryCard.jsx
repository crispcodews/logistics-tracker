import styles from './DeliveryCard.module.css'

function DeliveryCard({ delivery, onDelete }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3>{DeliveryCard.recipient}</h3>
                <button className={styles.deleteButton} onClick={() => onDelete(delivery.id)}>Delete</button> 
            </div>
            <p><strong>Tracking ID:</strong> {delivery.id}</p>
            <p><strong>Address:</strong> {delivery.address}</p>
            <p><strong>Carrier:</strong> {delivery.carrier}</p>
           <p><strong>Status:</strong> {delivery.status}</p>
           <p><strong>Est. Delivery:</strong>{delivery.estimatedDelivery}</p>
        </div>
    )
}

export default DeliveryCard