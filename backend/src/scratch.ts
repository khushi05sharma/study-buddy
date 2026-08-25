import { chunkText } from "./services/chunking";

const sampleText = `
useEffect allows you to synchronize a component with an external system.
It runs after the component renders. You can control when it re-runs by
passing a dependency array. If you pass an empty array, it runs only once,
similar to componentDidMount in class components. If you omit the array
entirely, it runs after every render.
`;

const result = chunkText(sampleText, {
  chunkSize: 150,
  chunkOverlap: 30,
});

console.log(JSON.stringify(result, null, 2));
