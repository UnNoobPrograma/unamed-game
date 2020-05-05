import React, { useRef } from "react";

export default function Login({ state, dispatch }) {
  const nameInput = useRef(null);

  const { players, socket } = state;

  if (players.filter((player) => player.id === socket).length > 0) {
    return false;
  }

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <>
      <div>Connection id: {socket}</div>
      <input type="text" ref={nameInput} />
      <button
        onClick={() => {
          const name = nameInput.current.value;

          dispatch({
            type: "START",
            payload: {
              name,
              id: socket,
            },
          });
        }}
      />
    </>
  );
}
