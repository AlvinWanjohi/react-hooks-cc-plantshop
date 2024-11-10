import { useState, useEffect } from "react";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: "",
  }); // State to manage new plant details

  // Array with estimated prices and stock status
  useEffect(() => {
    const plantData = [
      { id: 1, name: "Aloe", image: "/images/aloe.jpg", price: 15.99, inStock: true },
      { id: 2, name: "ZZ Plant", image: "/images/zz-plant.jpg", price: 25.98, inStock: true },
      { id: 3, name: "Pilea peperomioides", image: "/images/pilea.jpg", price: 18.50, inStock: true },
      { id: 4, name: "Pothos", image: "/images/pothos.jpg", price: 12.99, inStock: true },
      { id: 5, name: "Jade", image: "/images/jade.jpg", price: 22.75, inStock: true },
      { id: 6, name: "Monstera Deliciosa", image: "/images/monstera.jpg", price: 39.99, inStock: true },
      { id: 7, name: "Fiddle Leaf Fig", image: "/images/fiddle-leaf-fig.jpg", price: 50.00, inStock: true },
      { id: 8, name: "Boston Fern", image: "/images/Boston Fern.jpg", price: 32.99, inStock: true },
      { id: 9, name: "Dracaena Sanderiana", image: "/images/Dracaena Sanderiana.jpg", price: 79.99, inStock: true },
      { id: 10, name: "Dracaena trifasciata", image: "/images/Dracaena trifasciata.jpg", price: 39.50, inStock: true },
      { id: 11, name: "gi-plants-spider-plant", image: "/images/gi-plants-spider-plant.jpg", price: 50.00, inStock: true },
      { id: 12, name: "Money-tree", image: "/images/Money-tree.jpg", price: 50.00, inStock: true },
      { id: 13, name: "peace-lily", image: "/images/peace-lily.jpg", price: 47.00, inStock: true },
      { id: 14, name: "rosemary", image: "/images/rosemary.jpg", price: 50.00, inStock: true },
      { id: 15, name: "Rubber-plants", image: "/images/Rubber-plant.jpg", price: 20.99, inStock: true },
      { id: 16, name: "Umbrellatreeplant", image: "/images/Umbrellatreeplant.jpg", price: 99.99, inStock: true },
    ];

    setTimeout(() => {
      setPlants(plantData);
      setLoading(false);
    }, 2000);
  }, []);

  // Function to toggle stock status
  const toggleStock = (id) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  };

  // Function to handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle adding new plant
  const handleAddPlant = () => {
    const newPlantData = {
      ...newPlant,
      id: plants.length + 1, // Adding a unique ID for the new plant
      price: parseFloat(newPlant.price),
      inStock: true,
    };
    setPlants((prevPlants) => [...prevPlants, newPlantData]);
    setNewPlant({ name: "", image: "", price: "" }); // Reset input fields
  };

  // Filtered plants based on search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* New Plant Search Form */}
      <div
        className="search-form"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          id="plantName"
          placeholder="Plant Name"
          style={{ padding: "8px", width: "200px", fontSize: "1rem" }}
          value={newPlant.name}
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        />
        <input
          type="text"
          id="plantImage"
          placeholder="Image URL"
          style={{ padding: "8px", width: "250px", fontSize: "1rem" }}
          value={newPlant.image}
          onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
        />
        <input
          type="number"
          id="plantPrice"
          placeholder="Price"
          style={{ padding: "8px", width: "150px", fontSize: "1rem" }}
          value={newPlant.price}
          onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
        />
        <button
          onClick={handleAddPlant}
          style={{
            padding: "8px 16px",
            backgroundColor: "#39b93d",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Add Plant
        </button>
      </div>

      {/* Search Bar */}
      <div className="searchbar" style={{ marginBottom: "20px" }}>
        <label htmlFor="search">Search for a plant:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
          style={{ padding: "8px", width: "300px", fontSize: "1rem" }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <div
                className="card"
                key={plant.id}
                style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}
              >
                <img src={plant.image} alt={plant.name} style={{ width: "100%" }} />
                <h3>{plant.name}</h3>
                <p>Price: ${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => toggleStock(plant.id)}
                  className={plant.inStock ? "in-stock" : "sold-out"}
                  style={{
                    backgroundColor: plant.inStock ? "green" : "red",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  {plant.inStock ? "In Stock" : "Sold Out"}
                </button>
              </div>
            ))
          ) : (
            <p>No plants found matching your search</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlantList;
