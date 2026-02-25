import { useParams } from "react-router-dom"
import ChatWorkspace from "../components/ChatWorkspace"

export default function ChatRoom() {
  const { chatId } = useParams();
  return <ChatWorkspace forcedChatId={chatId} />
}