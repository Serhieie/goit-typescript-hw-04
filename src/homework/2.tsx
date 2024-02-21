import React, { useReducer } from "react";

type State = {
  isRequestInProgress: boolean;
  requestStep: "idle" | "start" | "pending" | "finished";
};

type Action =
  | { type: "START_REQUEST" }
  | { type: "PENDING_REQUEST" }
  | { type: "FINISH_REQUEST" }
  | { type: "RESET_REQUEST" };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_REQUEST":
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case "PENDING_REQUEST":
      return { ...state, requestStep: "pending" };
    case "FINISH_REQUEST":
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case "RESET_REQUEST":
      return { ...initialState };
    default:
      return state;
  }
}

export const RequestComponent: React.FC = () => {
  const [requestState, requestDispatch] = useReducer(requestReducer, initialState);

  const startRequest = () => {
    requestDispatch({ type: "START_REQUEST" });
    setTimeout(() => {
      requestDispatch({ type: "PENDING_REQUEST" });
      setTimeout(() => {
        requestDispatch({ type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  const resetRequest = (): void => {
    requestDispatch({ type: "RESET_REQUEST" });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
};

export default RequestComponent;
