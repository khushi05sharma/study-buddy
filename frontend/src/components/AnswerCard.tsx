import type { Source } from "../types";

interface AnswerCardProps {
  answer: string;
  sources: Source[];
}

function AnswerCard({ answer, sources }: AnswerCardProps) {
  return (
    <div className="card answer-card">
      <h2>🤖 Answer</h2>
      <p>{answer}</p>

      {sources.length > 0 && (
        <details>
          <summary className="muted-text">
            View sources ({sources.length})
          </summary>
          <ul className="source-list">
            {sources.map((source, i) => (
              <li key={i}>
                <span className="muted-text">
                  Match score: {source.score.toFixed(2)}
                </span>
                <p>{source.chunkText}</p>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default AnswerCard;
