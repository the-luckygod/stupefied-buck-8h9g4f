import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";
import prompts from "../helpers/prompts";
import models from "../helpers/models";
import config from "../helpers/config";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput,
        basePrompt: selectedPrompt?.basePrompt || prompts[0],
        model: selectedModel || models[0],
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="my-container">
        <div className="header">
          <div className="header-title">
            <h1>AI Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>{selectedPrompt?.subtitle}</h2>
          </div>
        </div>
        <div>
          <p className="prompt-select-label">Writer Type</p>
          <select
            className="prompt-select"
            onChange={(event) => {
              console.log(event);
              setSelectedPrompt(prompts[event?.target?.value]);
            }}
          >
            {prompts.map((prompt, i) => (
              <option key={i} value={i}>
                {prompt?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
            cols={10}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
            {!config.useDefaultModel && (
              <select
                className="prompt-select"
                value={selectedModel}
                onChange={(event) => {
                  console.log(event);
                  setSelectedModel(event?.target?.value);
                }}
              >
                {models.map((model, i) => (
                  <option key={i} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            )}
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a target="_blank" rel="noreferrer">
          <div className="badge" onClick={() => setShowFeedbackModal(true)}>
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>Submit Feedback</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
