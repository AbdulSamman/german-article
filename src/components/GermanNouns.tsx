import axios from "axios";
import { useEffect, useState } from "react";

const germanNounsUrl =
  "https://edwardtanguay.vercel.app/share/germanNouns.json";

export const GermanNouns = () => {
  const [nouns, setNouns] = useState([]);

  useEffect(() => {
    (async () => {
      const response = (await axios.get(germanNounsUrl)).data;
      setNouns(response);
    })();
  }, []);

  return (
    <div>
      <h1>German Nouns</h1>
      <p>Welcome to htis site.</p>
      <span>There are {nouns.length} nouns.</span>
    </div>
  );
};
