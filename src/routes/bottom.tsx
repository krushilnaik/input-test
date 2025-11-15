import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bottom")({
  component: BottomPage,
});

function BottomPage() {
  return (
    <div className="w-full mx-auto max-h-screen overflow-y-scroll">
      <ul className="flex flex-col gap-4 w-full max-w-5xl">
        <li className="glass rounded-full p-3 px-6 bg-black/50">sup</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">sup sup</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">what's the weather in chicago</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">on it bruh</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">weather's gucci</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">show me all my jira projects</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">you're not in any</li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem porro deserunt, asperiores nobis
          consectetur, saepe illo, inventore voluptates sed veritatis corrupti quia. Beatae autem nam placeat maxime
          delectus! Reprehenderit!
        </li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum aut commodi facilis labore? Deserunt,
          maxime.
        </li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo rem pariatur delectus rerum laudantium,
          doloribus qui repellat ea minus numquam, voluptatem fugiat illum officia. Mollitia neque minus magni alias
          fugiat, omnis praesentium molestiae assumenda non consequatur et, a consectetur!
        </li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo rem pariatur delectus rerum laudantium,
          doloribus qui repellat ea minus numquam, voluptatem fugiat illum officia. Mollitia neque minus magni alias
          fugiat, omnis praesentium molestiae assumenda non consequatur et, a consectetur!
        </li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo rem pariatur delectus rerum laudantium,
          doloribus qui repellat ea minus numquam, voluptatem fugiat illum officia. Mollitia neque minus magni alias
          fugiat, omnis praesentium molestiae assumenda non consequatur et, a consectetur!
        </li>
        <li className="glass rounded-full p-3 px-6 bg-black/50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo rem pariatur delectus rerum laudantium,
          doloribus qui repellat ea minus numquam, voluptatem fugiat illum officia. Mollitia neque minus magni alias
          fugiat, omnis praesentium molestiae assumenda non consequatur et, a consectetur!
        </li>
      </ul>
    </div>
  );
}
