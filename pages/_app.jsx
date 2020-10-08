import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

function getMessages(language) {
  let langBundle;
  switch (language) {
    case 'fr':
      langBundle = import('../lang/fr.json');
      break;
    case 'en':
      langBundle = import('../lang/en.json');
      break;
    default:
      langBundle = import('../lang/en.json');
      break;
    // Add more languages
  }
  return langBundle
}


function MyApp({ Component, pageProps }) {
  const locale = typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("Language") ? sessionStorage.getItem("Language") : 'en';
  const messages = getMessages(locale);
  const intl = createIntl(
    {
      locale,
      messages,
    },
    cache
  )
  return (
    <RawIntlProvider value={intl}>
      <Component {...pageProps} />
    </RawIntlProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}

  const { req } = ctx
  // const locale = req?.locale ?? 'en'
  // const messages = req?.messages ?? {}

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx))
  }

  return { pageProps }
}

export default MyApp