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
      setAdded(true);
    } else {
      const eliminated = list.find((p) => p.startsWith(name));
      const pos = list.indexOf(String(eliminated));
      list.splice(pos, 1);
      document.cookie = `favorites=${list.join(",")}; path=/;`;
      setAdded(false);
    }
  }
  return (
    <span onClick={addToFavorites}>
      {
        added
          ? "★Quitar de favoritos"
          : "★Añadir a favoritos" /*deberia hacerse con middleware, pero no me da tiempo*/
      }
    </span>
  );
}
