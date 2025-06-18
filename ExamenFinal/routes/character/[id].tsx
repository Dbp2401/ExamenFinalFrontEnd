import { Handlers } from "$fresh/server.ts";
import FavButton from "../../islands/FavButton.tsx";
import { character } from "../index.tsx";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    const { id } = ctx.params;
    const response = await fetch(
      `https://hp-api.onrender.com/api/character/${id}`
    );
    const data = await response.json();
    return ctx.render(data[0]);
  },
};

const characterPage = ({ data }: { data: character }) => {
  return (
    <div class="detail">
      {data.image ? (
        <img src={data.image}></img>
      ) : (
        <img src="../image.png"></img>
      )}
      <h2>{data.name}</h2>
      <FavButton name={data!.name} />
      <p>Casa: {data.house}</p>
      {data.alive ? <p>Vivo</p> : <p>Muerto</p>}
      <a href="/">Volver</a>
    </div>
  );
};
export default characterPage;
