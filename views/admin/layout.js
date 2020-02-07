module.exports = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>NodeStore</title>
    </head>
    <body>
      ${content}
    </body>
  </html>
  `
};
