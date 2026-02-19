import { useContext } from "react";
import { AppContext } from "../store/AppProvider";

export default function Profile() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      <h1>Perfil</h1>
      <p>Cidade: {state.profile.city}</p>
      <p>Budget: {state.profile.budgetMax}</p>

      <button
        onClick={() =>
          dispatch({
            type: "PROFILE_UPDATE",
            payload: { city: "Maceió", budgetMax: 1500 },
          })
        }
      >
        Atualizar Perfil
      </button>
    </div>
  );
}
