import { useState } from "react";
import styles from "./AddDeliveryForm.module.css";

function AddDeliveryForm({ onAdd }) {
  const [formData, setFormData] = useState({
    recipient: "",
    address: "",
    carrier: "",
    status: "Pending",
    estimatedDelivery: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.recipient ||
      !formData.address ||
      !formData.carrier ||
      !formData.estimatedDelivery
    ) {
      alert("Please fill in all fields");
      return;
    }
    onAdd(formData);
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
      <input
        className={styles.input}
        type="text"
        name="recipient"
        placeholder="Recipient Name"
        value={formData.recipient}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        type="text"
        name="address"
        placeholder="Delivery Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        type="text"
        name="carrier"
        placeholder="Carrier (FedEx, UPS, USPS)"
        value={formData.carrier}
        onChange={handleChange}
      />
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
      <input
        className={styles.input}
        type="date"
        name="estimatedDelivery"
        value={formData.estimatedDelivery}
        onChange={handleChange}
      />
      <button className={styles.submitButton} type="submit">
        Add Delivery
      </button>
    </form>
  );
}

export default AddDeliveryForm;
