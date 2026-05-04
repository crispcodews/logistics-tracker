import { useState, useEffect } from "react";
import { getDeliveries, addDelivery, deleteDelivery } from "./mockApi";
import DeliveryCard from "./components/DeliveryCard";
import AddDeliveryForm from "./components/AddDeliveryForm";
import FilterSort from "./components/FilterSort";
import Header from "./components/Header";
import styles from "./App.module.css";

function App() {
  // State for storing the list of deliveries from the API
  const [deliveries, setDeliveries] = useState([]);
  // State for tracking whether data is still loading
  const [loading, setLoading] = useState(true);
  // State for storing any error messages from API calls
  const [error, setError] = useState(null);
  // State for currently selected filter status (default shows all)
  const [filterStatus, setFilterStatus] = useState("All");
  // State for currently selected sort option
  const [sortBy, setSortBy] = useState("default");

  // Fetches all deliveries from the mock API and updates state
  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const data = await getDeliveries();
      setDeliveries(data);
    } catch (err) {
      setError("Failed to load deliveries");
    } finally {
      // Always runs - turns off loading spinner whether success or failure
      setLoading(false);
    }
  };

  // Runs once when the component first mounts - loads initial delivery data
  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Handles adding a new delivery - calls API then updates local state
  const handleAdd = async (newDelivery) => {
    try {
      const added = await addDelivery(newDelivery);
      // Spread existing deliveries and append new one
      setDeliveries([...deliveries, added]);
    } catch (err) {
      setError("Failed to add delivery");
    }
  };

  // Handles deleting a delivery - calls API then filters it out of state
  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id);
      // Keep all deliveries except the one that was deleted
      setDeliveries(deliveries.filter((d) => d.id !== id));
    } catch (err) {
      setError("Failed to delete delivery");
    }
  };

  // Returns a filtered and sorted copy of deliveries based on current state
  // Does not mutate the original deliveries array
  const getFilteredAndSorted = () => {
    let result = [...deliveries];

    // Apply status filter if not set to "All"
    if (filterStatus !== "All") {
      result = result.filter((d) => d.status === filterStatus);
    }

    // Apply sort based on selected option
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

  // Show loading text while fetching data
  if (loading) return <p>Loading deliveries...</p>;
  // Show error message if something went wrong
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
              Showing {getFilteredAndSorted().length} of {deliveries.length}{" "}
              deliveries
            </p>

            {/* Show empty state if no deliveries match the filter */}
            {getFilteredAndSorted().length === 0 ? (
              <div className={styles.emptyState}>
                <p>📭 No deliveries found</p>
                <span>Try changing your filter or add a new delivery</span>
              </div>
            ) : (
              getFilteredAndSorted().map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  delivery={delivery}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
