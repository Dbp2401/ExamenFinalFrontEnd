import { useState } from "preact/hooks";

export default function AddFavoriteButton({ name }: { name: string }) {
  const [added, setAdded] = useState(false);
  function addToFavorites() {
    const cookies = document.cookie
      .split("; ")
      .find((r) => r.startsWith("favorites="));
    const value = cookies ? cookies.split("=")[1] : "";
    const list = value ? value.split(",") : [];
    if (!list.includes(name)) {
      list.push(name);
      document.cookie = `favorites=${list.join(",")}; path=/;`;
      alert("Añadido a favoritos");
      setAdded(true);
    } else {
      alert("Ya estaba añadido");
    }
  }
  return (
    <button type="button" onClick={addToFavorites} disabled={added}>
      {added ? "Añadido" : "Añadir a favoritos"}
    </button>
  );
}
