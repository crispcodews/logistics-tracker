import { useState, useEffect } from "react";
import { getDeliveries, addDelivery, deleteDelivery } from "./mockApi";
import DeliveryCard from "./components/DeliveryCard";
import AddDeliveryForm from "./components/AddDeliveryForm";
import styles from "./App.module.css";

function App() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const data = await getDeliveries();
      setDeliveries(data);
    } catch (err) {
      setError("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleAdd = async (newDelivery) => {
    try {
      const added = await addDelivery(newDelivery);
      setDeliveries([...deliveries, added]);
    } catch (err) {
      setError("Failed to add delivery");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id);
      setDeliveries(deliveries.filter((d) => d.id !== id));
    } catch (err) {
      setError("Failed to delete delivery");
    }
  };

  if (loading) return <p>Loading deliveries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Logistics Tracker</h1>
      <AddDeliveryForm onAdd={handleAdd} />
      <p className={styles.totalCount}>Total deliveries: {deliveries.length}</p>
      {deliveries.map((delivery) => (
        <DeliveryCard
          key={delivery.id}
          delivery={delivery}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;
