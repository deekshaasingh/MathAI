import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle sending message
  const handleSend = () => {
    if (!input.trim()) return;

    if (!activeChatId) {
      // Create new chat
      const newChat = {
        id: Date.now(),
        title: input,
        messages: [{ sender: "user", text: input }],
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    } else {
      // Add to existing chat
      setChats(
        chats.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, { sender: "user", text: input }] }
            : chat
        )
      );
    }

    // Dummy bot reply
    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === (activeChatId || prevChats[0].id)
            ? { ...chat, messages: [...chat.messages, { sender: "bot", text: "🤖 This is a dummy reply until backend is ready." }] }
            : chat
        )
      );
    }, 600);

    setInput("");
  };

  // Delete a chat
  const deleteChat = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  // Filter chats for search
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
          <button
            onClick={() => {
              setActiveChatId(null);
              setChats(chats);
            }}
            className="bg-blue-600 w-full py-2 mb-4 rounded-lg hover:bg-blue-500"
          >
            + New Chat
          </button>

          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md w-full mb-4 text-black"
          />

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
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
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No chats found</p>
            )}
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Chat area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {activeChatId ? (
            chats
              .find((chat) => chat.id === activeChatId)
              ?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-md ${
                    msg.sender === "user" ? "bg-blue-200 self-end ml-auto" : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Start a new conversation ✨
            </p>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex items-center border-t">
          <input
            type="text"
            className="flex-1 border p-2 rounded-lg mr-2"
            placeholder="Type your math question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
