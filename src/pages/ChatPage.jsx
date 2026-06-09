import { useEffect, useState } from "react";

function ChatPage() {
  const defaultUsers = [
    { id: 1, name: "Abrar", status: "Online", unread: 0 },
    { id: 2, name: "Rahul", status: "Online", unread: 0 },
    { id: 3, name: "Priya", status: "Offline", unread: 0 },
    { id: 4, name: "Sneha", status: "Online", unread: 0 },
  ];

  const defaultChats = {
    Abrar: [
      { id: 1, text: "Hello Abrar!", sender: "other", time: "10:00 AM" },
      { id: 2, text: "Hi, welcome to chat app.", sender: "me", time: "10:02 AM" },
    ],
    Rahul: [
      { id: 1, text: "Send me React project.", sender: "other", time: "10:05 AM" },
      { id: 2, text: "Okay Rahul, sending.", sender: "me", time: "10:06 AM" },
    ],
    Priya: [
      { id: 1, text: "Thank you!", sender: "other", time: "10:10 AM" },
    ],
    Sneha: [
      { id: 1, text: "Amazing UI 🔥", sender: "other", time: "10:15 AM" },
    ],
  };

  const [users, setUsers] = useState(defaultUsers);
  const [activeUser, setActiveUser] = useState(defaultUsers[0]);
  const [allChats, setAllChats] = useState(defaultChats);
  const [message, setMessage] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem("chatUsers");
    const savedChats = localStorage.getItem("allChats");

    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);

      if (parsedUsers.length > 0) {
        setUsers(parsedUsers);
        setActiveUser(parsedUsers[0]);
      }
    }

    if (savedChats) {
      setAllChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("allChats", JSON.stringify(allChats));
  }, [allChats]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = () => {
    if (message.trim() === "" || !activeUser) return;

    const myMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: getCurrentTime(),
    };

    setAllChats({
      ...allChats,
      [activeUser.name]: [...(allChats[activeUser.name] || []), myMessage],
    });

    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const smartReplies = [
        "Hi! How are you?",
        "I received your message. I will check and reply soon.",
        "That sounds good! Please tell me more.",
        "Okay, I understand your point.",
        "Great! Let's continue with this.",
        "Thanks for the update.",
        "Yes, I am available. What do you need?",
        "Sure, I will help you with that.",
        "Nice work! Keep going.",
        "Can you explain this in more detail?",
        "Perfect, this looks good to me.",
        "No problem, we can continue.",
        "I am doing well, how about you?",
        "Please share the next update.",
      ];

      const randomReply =
        smartReplies[Math.floor(Math.random() * smartReplies.length)];

      const autoReply = {
        id: Date.now() + 1,
        text: `${activeUser.name}: ${randomReply}`,
        sender: "other",
        time: getCurrentTime(),
      };

      setAllChats((previousChats) => ({
        ...previousChats,
        [activeUser.name]: [
          ...(previousChats[activeUser.name] || []),
          autoReply,
        ],
      }));

      setIsTyping(false);
    }, 1200);
  };

  const addNewChat = () => {
    if (newUserName.trim() === "") {
      alert("Please enter user name");
      return;
    }

    const alreadyExists = users.find(
      (user) => user.name.toLowerCase() === newUserName.toLowerCase()
    );

    if (alreadyExists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: newUserName,
      status: "Online",
      unread: 0,
    };

    setUsers([...users, newUser]);

    setAllChats({
      ...allChats,
      [newUserName]: [
        {
          id: Date.now() + 1,
          text: `New chat started with ${newUserName}`,
          sender: "other",
          time: getCurrentTime(),
        },
      ],
    });

    setActiveUser(newUser);
    setNewUserName("");
  };

  const clearCurrentChat = () => {
    if (!activeUser) return;

    setAllChats({
      ...allChats,
      [activeUser.name]: [],
    });

    setShowMenu(false);
  };

  const deleteCurrentChat = () => {
    if (!activeUser) return;

    const updatedUsers = users.filter((user) => user.id !== activeUser.id);

    const updatedChats = { ...allChats };
    delete updatedChats[activeUser.name];

    setUsers(updatedUsers);
    setAllChats(updatedChats);
    setActiveUser(updatedUsers[0] || null);
    setShowMenu(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const activeMessages = activeUser ? allChats[activeUser.name] || [] : [];

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>Real-Time Chat Application</h1>
        <p>Auto reply, new chat, localStorage and separate conversations</p>
      </div>

      <div className="chat-app-layout">
        <div className="chat-sidebar">
          <div className="sidebar-title">
            <h2>Messages</h2>
            <span>{users.length} chats</span>
          </div>

          <input
            className="chat-search"
            placeholder="Search user..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />

          <div className="new-chat-box">
            <input
              type="text"
              placeholder="Add new chat..."
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addNewChat();
              }}
            />

            <button onClick={addNewChat}>Add</button>
          </div>

          {filteredUsers.map((user) => (
            <div
              className={
                activeUser?.id === user.id
                  ? "chat-user active-chat-user"
                  : "chat-user"
              }
              key={user.id}
              onClick={() => {
                setActiveUser(user);
                setShowMenu(false);
              }}
            >
              <div className="avatar">
                {user.name.charAt(0).toUpperCase()}
                <span
                  className={
                    user.status === "Online"
                      ? "status-dot green-dot"
                      : "status-dot gray-dot"
                  }
                ></span>
              </div>

              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{allChats[user.name]?.slice(-1)[0]?.text || "No messages"}</p>
              </div>

              {user.unread > 0 && <span className="unread">{user.unread}</span>}
            </div>
          ))}
        </div>

        <div className="chat-main">
          {activeUser ? (
            <>
              <div className="chat-topbar">
                <div className="avatar large-avatar">
                  {activeUser.name.charAt(0).toUpperCase()}
                  <span
                    className={
                      activeUser.status === "Online"
                        ? "status-dot green-dot"
                        : "status-dot gray-dot"
                    }
                  ></span>
                </div>

                <div>
                  <h2>{activeUser.name}</h2>
                  <p className={activeUser.status === "Online" ? "online" : "offline"}>
                    {isTyping ? "Typing..." : activeUser.status}
                  </p>
                </div>

                <div className="chat-actions">
                  <button>📞</button>
                  <button>🎥</button>

                  <div className="chat-menu-wrapper">
                    <button onClick={() => setShowMenu(!showMenu)}>⋮</button>

                    {showMenu && (
                      <div className="chat-dropdown">
                        <button onClick={clearCurrentChat}>Clear Chat</button>
                        <button onClick={deleteCurrentChat}>Delete Chat</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="chat-messages">
                <div className="chat-date">Today</div>

                {activeMessages.length === 0 ? (
                  <div className="typing-bubble">No messages yet</div>
                ) : (
                  activeMessages.map((msg) => (
                    <div
                      className={
                        msg.sender === "me"
                          ? "chat-message me"
                          : "chat-message other"
                      }
                      key={msg.id}
                    >
                      <p>{msg.text}</p>
                      <span>{msg.time}</span>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="typing-bubble">
                    {activeUser.name} is typing...
                  </div>
                )}
              </div>

              <div className="chat-send-box">
                <button className="icon-btn">😊</button>

                <input
                  type="text"
                  placeholder={`Message ${activeUser.name}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />

                <button className="send-btn" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <h2>No chat selected</h2>
              <p>Please add a new chat to start conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;