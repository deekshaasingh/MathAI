import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    if (!activeChatId) {
      const newChat = {
        id: Date.now(),
        title: input,
        messages: [{ sender: "user", text: input }],
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    } else {
      setChats(
        chats.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, { sender: "user", text: input }] }
            : chat
        )
      );
    }

    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === (activeChatId || prevChats[0].id)
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { sender: "bot", text: "This is a dummy reply until backend is ready by my boyfriend." },
                ],
              }
            : chat
        )
      );
    }, 600);

    setInput("");
  };

  const deleteChat = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-72 bg-gray-900 text-white p-5 flex flex-col shadow-lg">
          <button
            onClick={() => {
              setActiveChatId(null);
              setChats(chats);
            }}
            className="bg-blue-600 w-full py-2 mb-4 rounded-lg hover:bg-blue-500 transition"
          >
            + New Chat
          </button>

          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md w-full mb-4 text-black focus:outline-none"
          />

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition ${
                    chat.id === activeChatId ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <span className="truncate">{chat.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="ml-2 text-red-400 hover:text-red-600"
                    aria-label="Delete chat"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No chats found</p>
            )}
          </div>
        </aside>
      )}

      <main className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <section className="flex-1 p-6 overflow-y-auto">
          {activeChatId ? (
            chats
              .find((chat) => chat.id === activeChatId)
              ?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg max-w-xl ${
                    msg.sender === "user"
                      ? "bg-blue-100 self-end ml-auto text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))
          ) : (
            <div className="text-gray-500 text-center mt-20 text-lg">
              Start a new conversation ;)
            </div>
          )}
        </section>

        <footer className="p-4 bg-white border-t flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded-lg focus:outline-none"
            placeholder="Type your math question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Send
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Home;
