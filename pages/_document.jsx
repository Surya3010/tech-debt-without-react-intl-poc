import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { req } = ctx;
    const initialProps = await Document.getInitialProps(ctx);
    const locale = (req).locale;
    return {
      ...initialProps,
      locale,
      lang: locale ? locale.split('-')[0] : undefined,
      nonce: (req).nonce,
    };
  }

  render() {
    let scriptEl;
    if (this.props.locale) {
      scriptEl = (
        <script
          nonce={this.props.nonce}
          dangerouslySetInnerHTML={{
            __html: `window.LOCALE="${this.props.locale}"`,
          }}
        ></script>
      );
    }

    return (
      <Html lang={this.props.lang}>
        <Head />
        <body>
          {scriptEl}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
