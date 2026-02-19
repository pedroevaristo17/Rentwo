import { createContext, useReducer, useEffect } from "react";
import { loadState, saveState } from "./Storage";
import  roommatesMock  from "../data/roommates"


// 1️⃣ Criamos o contexto
export const AppContext = createContext();

// 2️⃣ Estado inicial do app
const initialState = {
  profile: {
    city: "",
    budgetMax: 0,
  },
  roommates: roommatesMock,
  swipeIndex: 0,
  likesRoommates: [],
  dislikesRoommates: [],
};

// 3️⃣ Reducer (onde o estado muda)
function appReducer(state, action) {
  switch (action.type) {
    case "PROFILE_UPDATE":
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case "SWIPE_LIKE": {
      const currentRoommate = state.roommates[state.swipeIndex];

      if (!currentRoommate) return state;

      const id = currentRoommate.id;

      return {
        ...state,
        swipeIndex: state.swipeIndex + 1,
        likesRoommates: state.likesRoommates.includes(id)
          ? state.likesRoommates
          : [...state.likesRoommates, id],
        dislikesRoommates: state.dislikesRoommates.filter(
          (rid) => rid !== id
        ),
      };
    }

    case "SWIPE_NOPE": {
      const currentRoommate = state.roommates[state.swipeIndex];

      if (!currentRoommate) return state;

      const id = currentRoommate.id;

      return {
        ...state,
        swipeIndex: state.swipeIndex + 1,
        dislikesRoommates: state.dislikesRoommates.includes(id)
          ? state.dislikesRoommates
          : [...state.dislikesRoommates, id],
        likesRoommates: state.likesRoommates.filter(
          (rid) => rid !== id
        ),
      };
    }

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
