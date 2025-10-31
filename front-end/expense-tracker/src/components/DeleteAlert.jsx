import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="space-y-4 text-center">
      <p className="text-gray-700 dark:text-gray-300 text-base">{content}</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
