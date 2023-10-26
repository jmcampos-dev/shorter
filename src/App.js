import "./App.css";
import "./index.css";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import getLink from "./api/request.jsx";

function App() {
  const [input, setInput] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState("disabled");

  const handleKeyDown = (event) => {
    validURL(event.target.value);
    setInput(event.target.value);
  };

  const validURL = (string) => {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm
    );
    let isValidURL = !!pattern.test(string);
    if (isValidURL !== true) {
      setDisable("disabled");
    } else {
      setDisable("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getShortLink();
    setCopied(false);
  };

  const getShortLink = async () => {
    const formatStr = input.toString().toLowerCase().trim();
    // const ourURL = `https://api.shrtco.de/v2/shorten`;
    const shortenedLink = await getLink(formatStr);
    setLoading(false);
    setLink(shortenedLink.secureShortURL);
  };

  const copyToClipoard = () => {
    setCopied(true);
  };
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Shorter</h1>
        <p className="subtitle">
          🌈 Short your long url to share with your friends
        </p>
        <form className="url-form" onSubmit={handleSubmit}>
          <input
            className="input-form"
            value={input}
            onChange={handleKeyDown}
          />
          <button className="button-form" disabled={disable}>
            {loading ? (
              <div className="loadingio-spinner-rolling-2jiq7p5fv63">
                <div className="ldio-5jgw7s1nnh9">
                  <div></div>
                </div>
              </div>
            ) : (
              <svg
                className="background-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="#ffffff"
                stroke="#0E1A27"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline fill="none" points="30,10 80,50 30,90 " />
              </svg>
            )}
          </button>
        </form>
        <div
          className={link ? "visible link-container" : "hidden link-container"}
        >
          <div className="link-content">
            <p className="link-text">{link}</p>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="#ffffff"
                stroke="#0E1A27"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline fill="none" points="10,60 40,85 85,15 " />
              </svg>
            ) : (
              <div className="link-svg-container">
                <CopyToClipboard text={link}>
                  <span onClick={copyToClipoard}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cursor-pointer"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </span>
                </CopyToClipboard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
