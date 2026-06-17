import React, {
  useState
} from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

function InterviewModal({
  isOpen,
  onClose,
  onSave
}) {
  const [date, setDate] =
    useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-zinc-900 p-8 rounded-3xl max-w-lg mx-auto mt-32 text-white"
      overlayClassName="fixed inset-0 bg-black/70"
    >

      <h2 className="text-3xl mb-5">
        Schedule Interview
      </h2>

      <input
        type="datetime-local"
        className="input-dark mb-5"
        value={date}
        onChange={(e) =>
          setDate(
            e.target.value
          )
        }
      />

      <div className="flex gap-4">

        <button
          className="primary-btn"
          onClick={() =>
            onSave(date)
          }
        >
          Save
        </button>

        <button
          className="bg-red-500 px-4 py-2 rounded-xl"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </Modal>
  );
}

export default InterviewModal;