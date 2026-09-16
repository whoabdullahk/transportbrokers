fetch('https://transportbrokersinc.com/track-order')
  .then(r => r.text())
  .then(html => {
    const m = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
    if (m) {
      console.log('Found JS:', m[1]);
      return fetch('https://transportbrokersinc.com' + m[1]);
    }
    throw new Error('JS not found');
  })
  .then(r => r.text())
  .then(js => {
    console.log('Contains Render URL:', js.includes('transportbrokers.onrender.com'));
    console.log('Contains localhost:', js.includes('localhost:5000'));
  })
  .catch(console.error);
