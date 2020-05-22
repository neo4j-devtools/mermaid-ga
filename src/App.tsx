import React, { useRef, useState, useEffect } from 'react';
import mermaid from 'mermaid';
import Editor from 'react-simple-code-editor';
import { Box, Card } from 'rebass'
import { ThemeProvider } from 'theme-ui'
// @ts-ignore
import preset from '@rebass/preset'

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
    <ThemeProvider theme={preset}>
      <Box
        sx={{
          display: 'grid',
          gridGap: 4,
          gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
          background: 'slategray',
          height: '100vh',
          padding: '1em'
        }}>
          <Card>
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
          </Card>
          <Card>
            <div ref={mermaidContainer} />
          </Card>
        </Box>
    </ThemeProvider>
  );
}

export default App;
