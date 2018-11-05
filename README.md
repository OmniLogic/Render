# Oppuz Showcase

## Instalation

`npm i oppuz-showcase --save`

or

`yarn add oppuz-showcase`

## Usage

### Client-side

```
import React from 'react';
import ReactDOM from 'react-dom';

import ShowcaseContainer, { ShowcaseContext, OppuzClient } from 'oppuz-showcase';

const client = new OppuzClient({
  token: process.env.TOKEN,
  cache: window.__OMNI_STATE__
});

class App extends React.Component {
  render() {
    return (
      <ShowcaseContext.Provider value={client}>
        <ShowcaseContainer name={process.env.SHOWCASE} />
      </ShowcaseContext.Provider>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
```

### Server-side

Express example:

```
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';

import ShowcaseContainer, { ShowcaseContext, OppuzClient } from 'oppuz-showcase';

const app = express();

...

app.get('/', async (req, res) => {
  const client = new OppuzClient({
    token: process.env.TOKEN
  });
  try {
    let { data } = await client.fetch({ url: req.url });
    client.setCache(data);

    const markup = ReactDOM.renderToString(
      <html>
        <head>
        </head>
        <body>
          <div id="app">
            <ShowcaseContext.Provider value={client}>
              <ShowcaseContainer name={process.env.SHOWCASE} />
            </ShowcaseContext.Provider>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: `window.__OMNI_STATE__=${client.extractCache()};`
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
...
```

## Examples

To run the examples, first create a `.env` file, inside the `examples` folder, with two variables, `TOKEN` and `SHOWCASE`. Than run the following commands:

### Client-side

`yarn start`

### Server-side

`yarn build-all`

`node dist/server/index.js`

## Development

### Library

`yarn start`
