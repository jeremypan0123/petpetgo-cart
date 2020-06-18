import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Style dependencies */}
          <link
            href="https://unpkg.com/normalize.css@^7.0.0"
            rel="stylesheet"
          />
          {/* Blueprint stylesheets */}
          <link
            href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
