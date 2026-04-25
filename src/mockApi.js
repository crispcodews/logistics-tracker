const deliveries = [
    {
        id: "TRK001",
        recipient: "John Smith",
        address: "123 Main St, Dallas, TX",
        status: "In Transit",
        carrier: "Fedex",
        estimatedDelivery: "2026-04-26",
    },
    {
        id: "TRK002",
        recipient: "Sarah Johnson",
        address: "456 Oak Ave, Austin, TX",
        status: "Delivered",
        carrier: "UPS",
        estimatedDelivery: "2026-04-23",
    },
    {
        id: "TRK003",
        recipient: "Mike Davis",
        address: "789 Pine Rd, Houston, TX",
        status: "Pending",
        carrier: "USPS",
        estimatedDelivery: "2026-04-28",
    },
]

// Simulate API delay like a real API would have
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getDeliveries = async () => {
    await delay(500)
    return [...deliveries]
}

export const addDelivery = async (delivery) => {
    await delay(300)
    const newDelivery = {...delivery, id: "TRK" + Date.now() }
    deliveries.push(newDelivery)
    return newDelivery
}

export const deleteDelivery = async (id) => {
    await delay(300)
    const index = deliveries.findIndex((d) => d.id === id)
    deliveries.splice(index, 1)
    return id
}