import type { Source } from "../types";

interface AnswerCardProps {
  answer: string;
  sources: Source[];
}

function AnswerCard({ answer, sources }: AnswerCardProps) {
  return (
    <div className="card answer-card">
      <h2>Answer</h2>
      <p>{answer}</p>

      {sources.length > 0 && (
        <details>
          {/* details can be expanded/collapsed — summary is the clickable heading for the "details" element */}
          <summary className="muted-text">
            View sources ({sources.length})
          </summary>
          <ul className="source-list">
            {/*i = current index*/}
            {sources.map((source, i) => (
              <li key={i}>
                <span className="muted-text">
                  {/* tofixed(2) - Keep exactly 2 digits after the decimal point. */}
                  Match score: {source.score.toFixed(2)}
                </span>
                <p>{source.chunkText}</p>
                system use?
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default AnswerCard;

// Using an index as a key isn't always ideal.
//Usually, if the data has a stable unique ID, that's preferable.
//For these sources, though, we're displaying a small retrieved list that isn't being reordered or individually edited, so this is perfectly reasonable for our MVP.
