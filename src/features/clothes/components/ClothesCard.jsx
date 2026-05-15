import { deleteClothes } from "../api/clothesApi";
import { Link } from "react-router-dom";

function ClothesCard({ clothes, onDelete }) {
  const handleDelete = async () => {
    try {
      await deleteClothes(clothes._id);

      onDelete(clothes._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h2>{clothes.name}</h2>

      <p>{clothes.category}</p>

      <p>{clothes.color}</p>

      <button onClick={handleDelete}>
        Delete
      </button>

      <Link to={`/edit/${clothes._id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default ClothesCard;