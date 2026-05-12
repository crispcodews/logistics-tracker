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
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Recipient Name</label>
        <input
          className={styles.input}
          type="text"
          name="recipient"
          placeholder="e.g. John Smith"
          value={formData.recipient}
          onChange={handleChange}
        />
      </div>

      {/* Delivery address input */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Delivery Address</label>
        <input
          className={styles.input}
          type="text"
          name="address"
          placeholder="e.g. 123 Main St, Dallas, TX"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      {/* Carrier name input */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Carrier</label>
        <input
          className={styles.input}
          type="text"
          name="carrier"
          placeholder="e.g. FedEx, UPS, USPS"
          value={formData.carrier}
          onChange={handleChange}
        />
      </div>

      {/* Status dropdown — defaults to Pending */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Status</label>
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
      </div>

      {/* Estimated delivery date picker */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Estimated Delivery Date</label>
        <input
          className={styles.input}
          type="date"
          name="estimatedDelivery"
          value={formData.estimatedDelivery}
          onChange={handleChange}
        />
      </div>

      {/* Submit button — triggers handleSubmit */}
      <button className={styles.submitButton} type="submit">
        Add Delivery
      </button>
    </form>
  )
}

export default AddDeliveryForm;
