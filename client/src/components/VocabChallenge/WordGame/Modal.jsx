import { forwardRef, useImperativeHandle, useState } from "react";

function Modal({ gameStatus, handleGameReset, solution }, ref) {
  const [openModal, setOpenModal] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setOpenModal(true),
  }));

  const onClose = () => {
    setOpenModal(false);
    handleGameReset();
  };

  if (!openModal) return null;

  return (
    <div className="backdrop" style={{  top:"500px", bottom:"-700px"}}>
      <div className="modal">
        <p>{gameStatus}</p>
        <p>The word was: {solution.toUpperCase()}</p>
        <button onClick={onClose} className=" top-10 bg-[#77a832] rounded-md  text-black"> Play Again </button>
      </div>
    </div>
  );
}

export default forwardRef(Modal);