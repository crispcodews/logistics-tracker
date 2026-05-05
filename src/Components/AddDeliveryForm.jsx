import { useState } from "react";
import styles from "./AddDeliveryForm.module.css";

function AddDeliveryForm({ onAdd }) {
  // Local state for all fields
  // Status defaults to "Pending" since new deliveries haven't shipped yet
  const [formData, setFormData] = useState({
    recipient: "",
    address: "",
    carrier: "",
    status: "Pending",
    estimatedDelivery: "",
  });

  // Handles change to any input field
  // Uses computed property [e.target.name] to update correct field
  // without needing a seperate handler for each input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  // Validates required fields, calls, onAdd, then resets the form
  const handleSubmit = (e) => {
    // Prevents the browser from refreshing the page on submit
    e.preventDefault();

    // Basic validation - all fields are required
    if (
      !formData.recipient ||
      !formData.address ||
      !formData.carrier ||
      !formData.estimatedDelivery
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Pass the new delivery up to App.jsx
    onAdd(formData);

    // Reset form back to empty state after successful submit
    setFormData({
      recipient: "",
      address: "",
      carrier: "",
      status: "Pending",
      estimatedDelivery: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add New Delivery</h2>
      {/* Recipient name input */}
      <input
        className={styles.input}
        type="text"
        name="recipient"
        placeholder="Recipient Name"
        value={formData.recipient}
        onChange={handleChange}
      />

      {/* Delivery address input */}
      <input
        className={styles.input}
        type="text"
        name="address"
        placeholder="Delivery Address"
        value={formData.address}
        onChange={handleChange}
      />

      {/* Carrier name input */}
      <input
        className={styles.input}
        type="text"
        name="carrier"
        placeholder="Carrier (FedEx, UPS, USPS)"
        value={formData.carrier}
        onChange={handleChange}
      />

      {/* Status dropdown - defaults to Pending */}
      <select
        className={styles.input}
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>

      {/* Estimated delivery date picker */}
      <input
        className={styles.input}
        type="date"
        name="estimatedDelivery"
        value={formData.estimatedDelivery}
        onChange={handleChange}
      />

      {/* Submit button - triggers handleSubmit */}
      <button className={styles.submitButton} type="submit">
        Add Delivery
      </button>
    </form>
  );
}

export default AddDeliveryForm;
