// Copyright © 2026 Christopher Snow
import { useId, useState } from "react";
import { sampleRateStrings as t } from "./sample-rate.strings";
import "./sample-rate.css";

export function SampleRateReasoning() {
  type Choice = (typeof t.reasoningOptions)[number]["id"];
  const name = useId();
  const [choice, setChoice] = useState<Choice | "">("");
  const [submitted, setSubmitted] = useState<Choice | "">("");
  return (
    <div className="notebook-diagram sample-rate-reasoning">
      <h3>{t.reasoningHeading}</h3>
      <p>{t.reasoningPrompt}</p>
      <fieldset>
        <legend>{t.reasoningQuestion}</legend>
        {t.reasoningOptions.map(({ id, label }) => (
          <label key={id}>
            <input
              type="radio"
              name={name}
              value={id}
              checked={choice === id}
              onChange={() => {
                setChoice(id);
                setSubmitted("");
              }}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        disabled={!choice}
        onClick={() => setSubmitted(choice)}
      >
        {t.reasoningReveal}
      </button>
      <p role="status">{submitted ? t.reasoningFeedback(submitted) : ""}</p>
    </div>
  );
}
