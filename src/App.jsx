import { useState, useEffect } from "react";
import { getDeliveries, addDelivery, deleteDelivery } from "./mockApi";
import DeliveryCard from "./components/DeliveryCard";
import AddDeliveryForm from "./components/AddDeliveryForm";
import FilterSort from "./components/FilterSort";
import Header from "./components/Header";
import styles from "./App.module.css";

function App() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("default");

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

  const getFilteredAndSorted = () => {
    let result = [...deliveries];

    if (filterStatus !== "All") {
      result = result.filter((d) => d.status === filterStatus);
    }

    if (sortBy === "date-asc") {
      result.sort(
        (a, b) => new Date(a.estimatedDelivery) - new Date(b.estimatedDelivery)
      );
    } else if (sortBy === "date-desc") {
      result.sort(
        (a, b) => new Date(b.estimatedDelivery) - new Date(a.estimatedDelivery)
      );
    } else if (sortBy === "recipient-asc") {
      result.sort((a, b) => a.recipient.localeCompare(b.recipient));
    } else if (sortBy === "recipient-desc") {
      result.sort((a, b) => b.recipient.localeCompare(a.recipient));
    }

    return result;
  };

  if (loading) return <p>Loading deliveries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* App header with logo and tagline */}
      <Header />

      <div className={styles.container}>
        <div className={styles.layout}>

          {/* Left panel — add delivery form */}
          <div className={styles.leftPanel}>
            <AddDeliveryForm onAdd={handleAdd} />
          </div>

          {/* Right panel — filters, delivery count and cards */}
          <div className={styles.rightPanel}>
            <FilterSort
              onFilterChange={setFilterStatus}
              onSortChange={setSortBy}
            />
            <p className={styles.totalCount}>
              Showing {getFilteredAndSorted().length} of {deliveries.length} deliveries
            </p>
            {getFilteredAndSorted().map((delivery) => (
              <DeliveryCard
                key={delivery.id}
                delivery={delivery}
                onDelete={handleDelete}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default App;