import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';

import {
  OmnilogicClient,
  OmnilogicProvider,
  ShowcaseContainer
} from '../../dist';

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const client = new OmnilogicClient({
    token: process.env.TOKEN
  });
  try {
    // Fetch the initial data
    let { data } = await client.fetch({ url: req.url });
    //Store it in the memory cache
    client.setCache(data);

    const markup = ReactDOM.renderToString(
      <html>
        <head>
          <title>Showcase example</title>
          <link rel="stylesheet" href="static/style.css" />
        </head>
        <body>
          <div id="app">
            <OmnilogicProvider client={client}>
              {/* Place the showcase component anywhere in your template */}
              <ShowcaseContainer name={process.env.SHOWCASE} />
            </OmnilogicProvider>
          </div>

          {/* Client data hydration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__OMNILOGIC_STATE__=${client.extractCache()};`
            }}
          />

          {/* Your bundle */}
          <script src="static/index.js" />
        </body>
      </html>
    );
    res.send(markup);
  } catch (e) {
    console.error(e);
    res.error();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
