import { createFileRoute } from "@tanstack/react-router";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

export const Route = createFileRoute("/bottom")({
  component: BottomPage,
});

interface Message {
  sender: "user" | "assistant";
  content: string;
}

const messages: Message[] = [
  { sender: "user", content: "sup" },
  { sender: "assistant", content: "sup sup" },
  { sender: "user", content: "what's the weather in chicago" },
  { sender: "assistant", content: "on it bruh" },
  { sender: "assistant", content: "weather's gucci" },
  { sender: "user", content: "show me all my jira projects" },
  {
    sender: "assistant",
    content: `Here are your Jira projects:

| Project Name | Key | Lead | Status |
|-------------|-----|------|--------|
| Website Redesign | WEB | John Doe | Active |
| Mobile App | MOB | Jane Smith | Active |
| API Integration | API | Bob Johnson | On Hold |
| Documentation | DOC | Alice Brown | Active |`,
  },
  {
    sender: "user",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem porro deserunt, asperiores nobis consectetur, saepe illo, inventore voluptates sed veritatis corrupti quia. Beatae autem nam placeat maxime delectus! Reprehenderit!",
  },
  {
    sender: "assistant",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum aut commodi facilis labore? Deserunt, maxime.",
  },
  {
    sender: "user",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo rem pariatur delectus rerum laudantium, doloribus qui repellat ea minus numquam, voluptatem fugiat illum officia. Mollitia neque minus magni alias fugiat, omnis praesentium molestiae assumenda non consequatur et, a consectetur!",
  },
  {
    sender: "assistant",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo rem pariatur delectus rerum laudantium, doloribus qui repellat ea minus numquam, voluptatem fugiat illum officia. Mollitia neque minus magni alias fugiat, omnis praesentium molestiae assumenda non consequatur et, a consectetur!",
  },
];

function BottomPage() {
  return (
    <div className="w-full mx-auto max-h-screen overflow-y-scroll">
      <ul className="flex flex-col gap-4 w-full max-w-5xl">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`glass rounded-3xl p-3 px-6 ${
              message.sender === "user" ? "bg-blue-500/20 ml-auto max-w-[80%]" : "bg-black/50 mr-auto max-w-[80%]"
            }`}
          >
            <MarkdownRenderer content={message.content} />
          </li>
        ))}
      </ul>
    </div>
  );
}
