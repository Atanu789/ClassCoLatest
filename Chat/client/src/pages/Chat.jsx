import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(
    ChatContext
  );

  console.log("UserChats", userChats);

  return (
     <div >
      <PotentialChats />
      <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className="messages-box  flex-grow-0 p-3" gap={3}>
          {isUserChatsLoading && <p>Loading chats...</p>}
          {userChats?.map((chat, index) => (
            <div key={index} onClick={() => updateCurrentChat(chat)}>
              <UserChat chat={chat} user={user} />
            </div>
          ))}
        </Stack>
        {userChats?.length > 0 && <ChatBox />}
      </Stack>
    </div>
  );
};

export default Chat;
