import { useEffect, useState } from "react";

import { getAllClothes } from "../features/clothes/api/clothesApi";

import ClothesCard from "../features/clothes/components/ClothesCard";

function Dashboard() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const data = await getAllClothes();

        setClothes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, []);

  const handleDelete = (id) => {
    setClothes((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        {clothes.map((item) => (
          <ClothesCard
            key={item._id}
            clothes={item}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;