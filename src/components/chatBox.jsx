import React, { useRef, useState } from "react";
import "./chatbox.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ReactComponent as SendIcon } from "../Assets/send.svg";
import Loader from "../Loaders/Loader";
import InfoCard from "../InfoCard/InfoCard";
import DynamicTextRenderer from "../Dynamic Text render/RenderText";
const ChatBox = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const handleSend = async (e) => {
    setLoading(true);
    const obj = { user: true, text: search };
    setResult((prev) => [...prev, obj]);
    setSearch("");
    try {
      const key = process.env.REACT_APP_AI_KEY;
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const result = await model.generateContent(search);
      const resultObj = { user: false, text: result.response.text() };
      setResult((prev) => [...prev, resultObj]);
      setSearch("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend(event);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-full flex gap-y-3 flex-col justify-between md:pb-4 pb-2 items-center  bg-transparent">
      <span className="max-h-14 font-manrope font-semibold text-xl text-white pt-3 md:pt-1">
        <div class="nine">
          <h1>
            Temp-Gpt<span>{"( For Quick AI Search )"}</span>
          </h1>
        </div>
      </span>
      <div className="w-full h-[80%] md:h-[80%] flex flex-col justify-between border-[1px] glassMorph px-1 md:px-4 pb-3 md:pb-3 rounded-md border-white text-white">
        <div className="w-full flex flex-col gap-y-4 overflow-y-auto pt-4">
          {result.length > 0 ? (
            result.map((item, index) => {
              return (
                <span
                  className={`${
                    item.user ? "justify-end text-right" : "justify-start"
                  } w-full h-auto flex font-mono font-medium text-xs md:text-lg`}
                  key={index}
                >
                  <span
                    className={`${
                      !item.user && "md:py-3 py-1"
                    } max-w-[90%] md:max-w-[80%] w-auto font-manrope md:px-4 py-2 px-2 rounded-lg bg-[#f0faff] text-[#516b85]`}
                  >
                    {item.user ? (
                      item.text
                    ) : (
                      <DynamicTextRenderer response={item.text} />
                    )}
                  </span>
                </span>
              );
            })
          ) : (
            <center>
              <InfoCard />
            </center>
          )}
        </div>
      </div>
      <div
        ref={searchRef}
        className="w-full  flex flex-row md:flex-row justify-center gap-x-2 md:gap-x-8"
      >
        <div class="input__container">
          <div class="shadow__input"></div>
          <button class="input__button__shadow">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              height="20px"
              width="20px"
            >
              <path
                d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                fill-rule="evenodd"
                fill="#17202A"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            value={search}
            ref={searchRef}
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            name="text"
            class="input__search w-full text-black"
            placeholder="What do you want to search?"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          class=" size-14 bg-[#8147fc] text-white flex justify-center items-center rounded-full"
        >
          {!loading ? <SendIcon /> : <Loader />}
        </button>
      </div>
      {/* {result.length > 1 && (
        <button
          onClick={() => {
            if (searchRef.current) {
              searchRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              searchRef.current.focus();
            }
          }}
          className="size-10 bg-[#8147fc] rounded-full absolute bottom-20 right-4 flex justify-center items-center"
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height="20px"
            width="20px"
          >
            <path
              d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
              fill-rule="evenodd"
              fill="#17202A"
            ></path>
          </svg>
        </button>
      )} */}
    </div>
  );
};

export default ChatBox;
