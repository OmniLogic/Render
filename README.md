# Omnilogic Render

## Instalation

`npm i omnilogic-render --save`

or

`yarn add omnilogic-render`

## Compatibility

| Dependency | Version |
| ---------- | ------- |
| React      | 16.3+   |
| React DOM  | 16.3+   |

## Usage

### Client-side

```
import { OmnilogicClient, ShowcaseContainer, OmnilogicProvider } from 'omnilogic-render';

// Get cache from window (SSR)
const client = new OmnilogicClient({
  token: process.env.TOKEN,
  cache: window.__OMNILOGIC_STATE__
});

class App extends React.Component {
  render() {
    return (
      <OmnilogicProvider client={client}>
        {/* Place the showcase component anywhere in your template */}
        <ShowcaseContainer name={process.env.SHOWCASE} />
      </OmnilogicProvider>
    );
  }
}
```

### Server-side

Express example:

```
import { OmnilogicClient, OmnilogicProvider, ShowcaseContainer } from 'omnilogic-render';

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
