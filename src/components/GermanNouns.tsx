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
  const [nouns, setNouns] = useState<IGermanNoun[]>([]);
  const [choice, setChoice] = useState("hide");

  useEffect(() => {
    (async () => {
      const response = (await axios.get(germanNounsUrl)).data;
      setNouns(response);
    })();
  }, []);
  const handleArticleButton = (articleName: string) => {
    const selectedNoun = nouns.filter((noun) => noun.article === articleName);

    const reorderedNouns = selectedNoun.concat(
      nouns.filter((noun) => noun.article !== articleName)
    );
    if (articleName === "hide") {
      (async () => {
        setNouns((await axios.get(germanNounsUrl)).data);
      })();
    }
    setNouns(reorderedNouns);
    setChoice(articleName);
  };

  return (
    <div className="germanNouns">
      <h1>German Article Practice</h1>
      <span>There are {nouns.length} nouns.</span>
      <hr />
      <div className="buttonsRow">
        <button className="derBnt" onClick={() => handleArticleButton("der")}>
          Der
        </button>
        <button className="dieBnt" onClick={() => handleArticleButton("die")}>
          Die
        </button>
        <button className="dasBnt" onClick={() => handleArticleButton("das")}>
          Das
        </button>
        <button className="hideBnt" onClick={() => handleArticleButton("hide")}>
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
