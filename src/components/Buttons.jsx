import React, { useState } from "react";

const Buttons = ({ onResign, onDraw, disabled }) => {
  const [pendingAction, setPendingAction] = useState(null);

  const handleActionClick = (action) => {
    setPendingAction(action);
  };

  const handleConfirmYes = () => {
    if (pendingAction === "resign") {
      onResign();
    } else if (pendingAction === "draw") {
      onDraw();
    }
    setPendingAction(null);
  };

  const handleConfirmNo = () => {
    setPendingAction(null);
  };

  return (
    <div>
      {!pendingAction ? (
        <>
          <button
            onClick={() => handleActionClick("resign")}
            disabled={disabled}>
            Resign
          </button>
          <button onClick={() => handleActionClick("draw")} disabled={disabled}>
            Offer Draw
          </button>
        </>
      ) : (
        <div>
          <p>
            Are you sure you want to{" "}
            {pendingAction === "resign" ? "resign" : "offer a draw"}?
          </p>
          <button onClick={handleConfirmYes}>Yes</button>
          <button onClick={handleConfirmNo}>No</button>
        </div>
      )}
    </div>
  );
};

export default Buttons;
