import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative flex items-center mb-4">
      <button
        type="button"
        onClick={() => setShowPicker((prev) => !prev)}
        className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
      >
        <span className="text-2xl">{icon || "💰"}</span>
        <Smile className="text-gray-500 dark:text-gray-300" size={20} />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Choose Icon
        </span>
      </button>

      {showPicker && (
        <div className="absolute z-50 top-12 left-0 shadow-xl rounded-xl bg-white dark:bg-gray-800 p-2">
          <EmojiPicker
            theme="auto"
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setShowPicker(false);
            }}
            width={300}
            height={350}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;
