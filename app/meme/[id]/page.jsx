"use client";
import fetchMemes from "@/app/utils/fetchMemes";
import Image from "next/image";
import Link from "next/link";
import React, { useState, use, useRef } from "react";

const SingleMeme = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState();
  const input1 = useRef();
  const input2 = useRef();

  fetchMemes().then((res) => {
    const selectedMeme = res.data.memes.find((item) => item.id === id);
    setData({ ...selectedMeme });
  });

  const generateMeme = async (e) => {
    e.preventDefault();
    if (input1.current.value.trim() && input2.current.value.trim()) {
      setLoading(true);
      const response = await fetch(
        `https://api.imgflip.com/caption_image?username=rafay10&&password=rafay413&&text0=${input1.current.value}&&text1=${input2.current.value}&&template_id=${id}`,
        {
          method: "POST",
          cache: "no-store",
        }
      );
      const data = await response.json();
      console.log(data);
      const fetchImg = await fetch(data.data.url);
      const blob = await fetchImg.blob();
      setGeneratedMeme({
        ...data.data,
        downloadUrl: URL.createObjectURL(blob),
      });
      input1.current.value = "";
      input2.current.value = "";
      setLoading(false);
    }
  };
  return (
    // <div>
    //   {data && (
    //     <div>
    //       <div>
    //         <Image
    //           priority={true}
    //           src={data.url}
    //           width={data.width}
    //           alt={data.name}
    //           height={data.height}
    //         />
    //         <h2>{data.name}</h2>
    //         <form onSubmit={generateMeme}>
    //           <input type="text" ref={input1} required className="border-2" />
    //           <input type="text" ref={input2} required className="border-2" />
    //           <button className="border-2 border-black">generate</button>
    //         </form>
    //       </div>
    //       <div>
    //         {generatedMeme && (
    //           <div className="w-[420px]">
    //             <Image
    //               alt="generated-meme"
    //               src={generatedMeme.url}
    //               width={0}
    //               height={0}
    //               sizes="100vw"
    //               style={{ width: "100%", height: "auto" }}
    //             />
    //             <a href={generatedMeme.downloadUrl} download={Date.now()}>
    //               downlod
    //             </a>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </div>

    // ChatGPT
    <div className="min-h-screen bg-gray-800 text-gray-300 p-6">
      {data && (
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <Image
              priority={true}
              src={data.url}
              width={data.width}
              alt={data.name}
              height={data.height}
              className="rounded-md"
            />
            <h2 className="text-2xl font-bold text-indigo-400 mt-4">
              {data.name}
            </h2>
          </div>
          <form onSubmit={generateMeme} className="mt-6 space-y-4">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                ref={input1}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Top Text"
              />
              <input
                type="text"
                ref={input2}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Bottom Text"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Generate
            </button>
          </form>
          {generatedMeme && (
            <div className="mt-6 text-center">
              <div className="w-full max-w-[420px] mx-auto">
                <Image
                  alt="generated-meme"
                  src={generatedMeme.url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-md w-full h-auto"
                />
              </div>
              <a
                href={generatedMeme.downloadUrl}
                download={Date.now()}
                className="mt-4 inline-block text-indigo-400 hover:underline"
              >
                Download Meme
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleMeme;
