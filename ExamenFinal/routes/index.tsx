import { Handlers } from "$fresh/server.ts";
import FavButton from "../islands/FavButton.tsx";

export type character = {
  id: string;
  name: string;
  image: string;
  house: string;
  alive: boolean;
};

export type DataProps = {
  data: character[];
};

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    const data = await response.json();
    return ctx.render(data);
  },
};

const home = (data: DataProps) => {
  return (
    <div class="grid">
      {data.data.map((c) => (
        <div class="card">
          <a href={`/character/${c.id}`}>
            {c.image ? <img src={c.image}></img> : <img src="image.png"></img>}
          </a>
          <a href={`/character/${c.id}`}>{c.name}</a>
          <FavButton name={c!.name} />
        </div>
      ))}
    </div>
  );
};
export default home;
