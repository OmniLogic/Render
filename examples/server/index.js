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
    let { data } = await client.fetch({ url: req.url });
    client.setCache(data);

    const markup = ReactDOM.renderToString(
      <html>
        <head>
          <title>Showcase example</title>
          <meta
            name="viewport"
            content="user-scalable=0,initial-scale=1,minimum-scale=1,maximum-scale=1,width=device-width,height=device-height"
          />
          <link rel="stylesheet" href="static/style.css" />
        </head>
        <body>
          <div id="app">
            <OmnilogicProvider client={client}>
              <ShowcaseContainer name={process.env.SHOWCASE} />
            </OmnilogicProvider>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: `window.__OMNILOGIC_STATE__=${client.extractCache()};`
            }}
          />
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
