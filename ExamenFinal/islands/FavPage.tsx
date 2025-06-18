import { useEffect, useState } from "preact/hooks";
import { character } from "../routes/index.tsx";
import FavButton from "./FavButton.tsx";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("favorites="));
    const value = cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
    const names = value ? value.split(",") : [];
    if (names.length === 0) {
      setFavorites([]);
      return;
    }
    fetch("https://hp-api.onrender.com/api/characters")
      .then((r) => r.json())
      .then((d) => {
        const f = d.filter((c: character) => names.includes(c.name));
        setFavorites(f);
      });
  }, []);
  return favorites.length === 0 ? (
    <p>No hay personajes favoritos</p>
  ) : (
    <div class="grid">
      {favorites.map((c: character) => (
        <div class="card">
          {c.image ? <img src={c.image}></img> : <img src="image.png"></img>}
          <p>{c.name}</p> <FavButton name={c!.name} />
        </div>
      ))}
    </div>
  );
}
