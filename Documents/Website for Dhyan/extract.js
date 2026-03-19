const fs = require('fs');
const path = require('path');

function convertHtmlToReact(htmlFile, componentName) {
  const content = fs.readFileSync(htmlFile, 'utf8');

  // Extract CSS
  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  let cssContent = styleMatch ? styleMatch[1] : '';

  // Extract body content excluding scripts
  // We'll roughly capture inside <body>
  const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/);
  if (!bodyMatch) return;

  let bodyHtml = bodyMatch[1];
  
  // Remove script tags entirely
  bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/g, '');
  
  // Convert class -> className
  bodyHtml = bodyHtml.replace(/class="/g, 'className="');
  // Convert style="..."
  bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, p1) => {
    // Basic conversion of style string to object format is hard, 
    // we'll just let it be strings for now or manually fix, 
    // wait, React requires style objects. 
    // Let's do a basic parse for simple cases: "color:red; margin-top:0.4rem;"
    let objStr = '{' + p1.split(';').filter(Boolean).map(s => {
      let [k, v] = s.split(':');
      if (!k || !v) return '';
      k = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      return `${k}: "${v.trim()}"`;
    }).join(', ') + '}';
    if (objStr === '{}') return '';
    return `style={${objStr}}`;
  });
  
  // Fix aria-current
  // Fix unclosed img tags
  bodyHtml = bodyHtml.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
  bodyHtml = bodyHtml.replace(/<br>/g, '<br />');
  bodyHtml = bodyHtml.replace(/<hr>/g, '<hr />');

  // Any other standalone tags
  bodyHtml = bodyHtml.replace(/<source([^>]+[^\/])>/g, '<source$1 />');

  // Wrap CSS
  const scssPath = `./src/pages/${componentName}.scss`;
  const jsxPath = `./src/pages/${componentName}.jsx`;

  let finalCss = `#${componentName.toLowerCase()}-page {
  ${cssContent}
}`;

  fs.writeFileSync(scssPath, finalCss);

  const finalJsx = `import React, { useEffect } from 'react';
import './${componentName}.scss';

export default function ${componentName}() {
  useEffect(() => {
    // Add logic here manually
  }, []);

  return (
    <div id="${componentName.toLowerCase()}-page">
      ${bodyHtml}
    </div>
  );
}
`;

  fs.writeFileSync(jsxPath, finalJsx);
  console.log(`Generated ${componentName}.jsx and .scss`);
}

convertHtmlToReact('about.html', 'About');
convertHtmlToReact('projects.html', 'Projects');
convertHtmlToReact('d4a1.html', 'Home');
