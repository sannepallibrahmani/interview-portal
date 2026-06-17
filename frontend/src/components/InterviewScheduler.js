import React, {
  useState
} from "react";

import Modal from "react-modal";

import DatePicker from "react-datepicker";

import api from "../services/api";

Modal.setAppElement("#root");

function InterviewScheduler({
  isOpen,
  onClose,
  candidateId,
  onSuccess
}) {
  const [selectedDate,
    setSelectedDate] =
    useState(
      new Date()
    );

  const [loading,
    setLoading] =
    useState(false);

  const scheduleInterview =
    async () => {
      try {
        setLoading(true);

        await api.put(
          `/recruiter/status/${candidateId}`,
          {
            status:
              "Interview Scheduled",

            interviewDate:
              selectedDate.toISOString()
          }
        );

        alert(
          "Interview scheduled successfully!"
        );

        if (
          onSuccess
        ) {
          onSuccess();
        }

        onClose();
      } catch (
        error
      ) {
        console.log(
          error
        );

        alert(
          "Failed to schedule interview"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <Modal
      isOpen={
        isOpen
      }
      onRequestClose={
        onClose
      }
      overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      className="bg-zinc-900 text-white p-8 rounded-3xl w-[550px] border border-zinc-700 outline-none"
    >

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-orange-500">

          Schedule Interview

        </h2>

        <p className="text-zinc-400 mt-2">

          Select date and time for the interview.

        </p>

      </div>

      <div className="mb-8">

        <label className="block mb-3 text-zinc-300">

          Interview Date & Time

        </label>

        <DatePicker
          selected={
            selectedDate
          }

          onChange={(
            date
          ) =>
            setSelectedDate(
              date
            )
          }

          showTimeSelect

          dateFormat="MMMM d, yyyy h:mm aa"

          className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl outline-none"

          minDate={
            new Date()
          }
        />

      </div>

      <div className="flex justify-end gap-4">

        <button
          onClick={
            onClose
          }
          className="px-5 py-3 rounded-2xl bg-zinc-700 hover:bg-zinc-600 transition"
        >

          Cancel

        </button>

        <button
          onClick={
            scheduleInterview
          }
          disabled={
            loading
          }
          className="pro-btn"
        >

          {loading
            ? "Scheduling..."
            : "Schedule"}

        </button>

      </div>

    </Modal>
  );
}

export default InterviewScheduler;