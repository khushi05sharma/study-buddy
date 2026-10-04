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
        <details> // This section can be expanded/collapsed
          <summary className="muted-text">
            View sources ({sources.length})
          </summary> // summary is the clickable heading for the "details" element
          <ul className="source-list">
            {sources.map(
              (
                source,
                i, // i = current index
              ) => (
                <li key={i}>
                  <span className="muted-text">
                    Match score: {source.score.toFixed(2)} // Keep exactly 2 digits after the decimal point.
                  </span>
                  <p>{source.chunkText}</p> // What piece of my notes did the RAG system use?
                </li>
              ),
            )}
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
