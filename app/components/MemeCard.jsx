import Image from "next/image";
import React from "react";

const MemeCard = ({ meme }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md mb-3 mx-1">
      <Image
        src={meme.url}
        alt={meme.name}
        priority={true}
        width={meme.width}
        height={meme.height}
        className="rounded-t-lg"
      />
      <div className="flex items-center justify-between p-4 bg-gray-900 text-gray-300">
        <p className="text-sm font-semibold">{meme.name}</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow transition">
          Create Meme
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
