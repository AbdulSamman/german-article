import axios from "axios";
import { useEffect, useState } from "react";

const germanNounsUrl =
  "https://edwardtanguay.vercel.app/share/germanNouns.json";

interface IGermanNoun {
  article: string;
  singular: string;
  plural: string;
}

export const GermanNouns = () => {
  const [nouns, setNouns] = useState([]);
  const [choice, setChoice] = useState("hide");

  useEffect(() => {
    (async () => {
      const response = (await axios.get(germanNounsUrl)).data;
      setNouns(response);
    })();
  }, []);

  return (
    <div className="germanNouns">
      <h1>German Article Practice</h1>
      <span>There are {nouns.length} nouns.</span>
      <hr />
      <div className="buttonsRow">
        <button className="derBnt" onClick={() => setChoice("der")}>
          Der
        </button>
        <button className="dieBnt" onClick={() => setChoice("die")}>
          Die
        </button>
        <button className="dasBnt" onClick={() => setChoice("das")}>
          Das
        </button>
        <button className="hideBnt" onClick={() => setChoice("hide")}>
          Hide
        </button>
      </div>
      <div className="nouns">
        {nouns.map((noun: IGermanNoun, index) => {
          return (
            <div
              key={index}
              className={`noun ${choice === noun.article && choice}`}
              style={{
                color: noun.article == choice ? "#fff" : "#aaa",
              }}>
              {choice === noun.article && <>{noun.article}</>} {noun.singular}
            </div>
          );
        })}
      </div>
    </div>
  );
};
