import { useReducer, useEffect } from "react";
import { loadState, saveState } from "./Storage";
import roommatesMock from "../data/roommates";
import { AppContext } from "./AppContext";


// 2️⃣ Estado inicial do app
const initialState = {
  profile: {
    city: "",
    budgetMax: 0,
    avatarUrl: ""
  },
  roommates: roommatesMock,
  swipeIndex: 0,
  likesRoommates: [],
  dislikesRoommates: [],
  chats: {},

};

// 3️⃣ Reducer (onde o estado muda)
function appReducer(state, action) {
  switch (action.type) {
    case "PROFILE_UPDATE":
      return {
        ...state,
        swipeIndex: 0,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case "SWIPE_LIKE": {
      const currentRoommate = state.roommates?.[state.swipeIndex];
      if (!currentRoommate) return state;

      const id = currentRoommate.id;

      return {
        ...state,
        swipeIndex: state.swipeIndex + 1,
        likesRoommates: state.likesRoommates.includes(id)
          ? state.likesRoommates
          : [...state.likesRoommates, id],
        dislikesRoommates: state.dislikesRoommates.filter((rid) => rid !== id),
      };
    }

    case "SWIPE_NOPE": {
      const currentRoommate = state.roommates?.[state.swipeIndex];
      if (!currentRoommate) return state;

      const id = currentRoommate.id;

      return {
        ...state,
        swipeIndex: state.swipeIndex + 1,
        dislikesRoommates: state.dislikesRoommates.includes(id)
          ? state.dislikesRoommates
          : [...state.dislikesRoommates, id],
        likesRoommates: state.likesRoommates.filter((rid) => rid !== id),
      };
    }

    case "LIKE_REMOVE": {
      const { roommateId } = action.payload;
      return {
        ...state,
        likesRoommates: state.likesRoommates.filter((id) => id !== roommateId),
      };
    }

    case "CHAT_OPEN": {
      const { otherId } = action.payload;

      const me = "me"; // usuário mock
      const chatId = [me, otherId].sort().join("_"); // id determinístico

      // se já existe, não recria
      if (state.chats[chatId]) return state;

      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            id: chatId,
            participants: [me, otherId],
            messages: [],
            createdAt: Date.now(),
          },
        },
      };
    }

    case "CHAT_SEND_MESSAGE": {
      const { chatId, text } = action.payload;
      const me = "me";

      const chat = state.chats[chatId];
      if (!chat) return state;

      const newMessage = {
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        senderId: me,
        text,
        createdAt: Date.now(),
      };



      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            ...chat,
            messages: [...chat.messages, newMessage],
          },
        },
      };
    }

    case "RESET_APP":
      return initialState;

    default:
      return state;
  }

    
}

// 4️⃣ Provider (envolve o app)
export function AppProvider({ children }) {
  const persistedState = loadState();
  const [state, dispatch] = useReducer(appReducer, persistedState || initialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
