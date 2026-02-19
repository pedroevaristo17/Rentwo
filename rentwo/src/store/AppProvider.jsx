import { createContext, useReducer } from "react";

// 1️⃣ Criamos o contexto
export const AppContext = createContext();

// 2️⃣ Estado inicial do app
const initialState = {
  profile: {
    city: "",
    budgetMax: 0,
  },
  likesRoommates: [],
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

    default:
      return state;
  }
}

// 4️⃣ Provider (envolve o app)
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
