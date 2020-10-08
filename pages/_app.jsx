import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { polyfill } from '../polyfills';
import App from 'next/app';

function MyApp({ Component, pageProps, locale, messages }) {
  return (
    <IntlProvider locale={locale} defaultLocale="en-GB" messages={messages}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}

/**
 * Get the messages and also do locale negotiation. A multi-lingual user
 * can specify locale prefs like ['ja', 'en-GB', 'en'] which is interpreted as
 * Japanese, then British English, then English
 * @param locales list of requested locales
 * @returns {[string, Promise]} A tuple containing the negotiated locale
 * and the promise of fetching the translated messages
 */
function getMessages(locales = ['en-GB']) {
  if (!Array.isArray(locales)) {
    locales = [locales];
  }
  let langBundle;
  let locale;
  for (let i = 0; i < locales.length && !locale; i++) {
    locale = locales[i];
    switch (locale) {
      case 'fr':
        langBundle = import('../compiled-lang/fr.json');
        break;
      case 'en':
        langBundle = import('../compiled-lang/en.json');
        break;
      case 'zh-Hans-CN':
        langBundle = import('../compiled-lang/zh-Hans-CN.json');
        break;
      case 'zh-Hant-HK':
        langBundle = import('../compiled-lang/zh-Hant-HK.json');
        break;
      default:
        break;
      // Add more languages
    }
  }
  if (!langBundle) {
    return ['en-GB', import('../compiled-lang/en-GB.json')];
  }
  return [locale, langBundle];
}

const getInitialProps = async appContext => {
  const {
    ctx: { req },
  } = appContext;
  const requestedLocales =
    (req)?.locale ||
    (typeof navigator !== 'undefined' && navigator.languages) ||
    // IE11
    (typeof navigator !== 'undefined' && (navigator).userLanguage) ||
    (typeof window !== 'undefined' && (window).LOCALE) ||
    'en-GB';

  const [supportedLocale, messagePromise] = getMessages(requestedLocales);

  const [, messages, appProps] = await Promise.all([
    polyfill(supportedLocale),
    messagePromise,
    App.getInitialProps(appContext),
  ]);

  return {
    ...(appProps),
    locale: supportedLocale,
    messages: messages.default,
  };
};

MyApp.getInitialProps = getInitialProps;

export default MyApp;
