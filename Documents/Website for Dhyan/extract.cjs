const fs = require('fs');

function convertHtmlToReact(htmlFile, componentName) {
  const content = fs.readFileSync(htmlFile, 'utf8');

  // Extract CSS
  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  let cssContent = styleMatch ? styleMatch[1] : '';

  // Process specific variables out of :root for component-scoped CSS Custom Properties
  cssContent = cssContent.replace(/:root\s*\{([\s\S]*?)\}/, (match, p1) => {
    return `#${componentName.toLowerCase()}-page {\n${p1}\n}`;
  });

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) {
    console.error("No <body> found in " + htmlFile);
    return;
  }

  let bodyHtml = bodyMatch[1];
  
  // Remove script tags entirely
  bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/g, '');
  
  // Convert class -> className
  bodyHtml = bodyHtml.replace(/class="/g, 'className="');
  
  // Convert style="..."
  bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, p1) => {
    let styles = p1.split(';').filter(Boolean).map(s => {
      let parts = s.split(':');
      if (parts.length < 2) return '';
      let k = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      let v = parts.slice(1).join(':').trim();
      return `"${k}": "${v}"`;
    }).filter(Boolean);
    
    if (styles.length === 0) return '';
    return `style={{${styles.join(', ')}}}`;
  });

  // Fix unclosed tags
  bodyHtml = bodyHtml.replace(/<img(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<img${p1} />`;
  });
  bodyHtml = bodyHtml.replace(/<br>/g, '<br />');
  bodyHtml = bodyHtml.replace(/<hr>/g, '<hr />');
  bodyHtml = bodyHtml.replace(/<source(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<source${p1} />`;
  });

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
    // Port GSAP or setup scripts here manually if needed
  }, []);

  return (
    <div id="${componentName.toLowerCase()}-page" dangerouslySetInnerHTML={{ __html: \`
      ${bodyHtml.replace(/`/g, '\\`')}
    \` }}>
    </div>
  );
}
`;

  // Wait! dangerouslySetInnerHTML with class="" is unsafe if we already replaced class=" to className="!
  // If we just dump it in dangerouslySetInnerHTML, we shouldn't convert class to className, AND it's much safer!
  const vanillaBody = bodyMatch[1].replace(/<script[\s\S]*?<\/script>/g, '');
  const vanillaHtmlJsx = `import React, { useEffect } from 'react';
import './${componentName}.scss';

export default function ${componentName}() {
  useEffect(() => {
    // Component mounted, setup logic can run here
  }, []);

  return (
    <div id="${componentName.toLowerCase()}-page" dangerouslySetInnerHTML={{ __html: \`
      ${vanillaBody.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}
    \` }} />
  );
}
`;

  fs.writeFileSync(jsxPath, vanillaHtmlJsx);
  console.log(`Generated ${componentName}.jsx and .scss`);
}

convertHtmlToReact('about.html', 'About');
convertHtmlToReact('projects.html', 'Projects');
convertHtmlToReact('d4a1.html', 'Home');
