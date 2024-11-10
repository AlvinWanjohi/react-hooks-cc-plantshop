import { useState, useEffect } from "react";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlant, setNewPlant] = useState({ name: "", image: "", price: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants([...plants, data]);
        setNewPlant({ name: "", image: "", price: 0 });
      });
  };

  const toggleStock = (id, inStock) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !inStock }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      });
  };

  const updatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      });
  };

  const deletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlants(plants.filter((plant) => plant.id !== id));
      });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Our Plants</h1>
      <div className="searchbar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newPlant.name}
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPlant.image}
          onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newPlant.price}
          onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
        />
        <button type="submit">Add Plant</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {filteredPlants.map((plant) => (
            <div key={plant.id}>
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>Price: ${plant.price}</p>
              <button onClick={() => toggleStock(plant.id, plant.inStock)}>
                {plant.inStock ? "In Stock" : "Sold Out"}
              </button>
              <button onClick={() => deletePlant(plant.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantList;
