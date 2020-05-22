import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import mermaid from 'mermaid';
import Editor from 'react-simple-code-editor';

// import debounce from 'debounce';

// @ts-ignore
mermaid.parseError = function(err:any,hash:any) {
  console.error(err);
};

function App() {
  const mermaidContainer = useRef<HTMLDivElement>(null);

  const [diagram, setDiagram] = useState(`graph TB
  a-->b
  b-->a`)

  useEffect(() => {
    if (mermaidContainer.current !== null) {
      try {
        mermaid.parse(diagram)

        mermaidContainer.current.innerHTML = '';
        mermaid.render('digram', diagram, (svg:string) => {
          if (mermaidContainer.current !== null)
          mermaidContainer.current.innerHTML = svg;
        })
      } catch (err) {
        console.error(err);
      }
    } 
  }, [diagram]);


  return (
    <div className="App">
      <Editor
        value={diagram}
        onValueChange={setDiagram}
        highlight={code => code}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />

      <div ref={mermaidContainer} />

    </div>
  );
}

export default App;
