const { shouldPolyfill: shouldPolyfillGetCanonicalLocales } = require('@formatjs/intl-getcanonicallocales/should-polyfill');
const { shouldPolyfill: shouldPolyfillPluralRules } = require('@formatjs/intl-pluralrules/should-polyfill');
const { shouldPolyfill: shouldPolyfillNumberFormat } = require('@formatjs/intl-numberformat/should-polyfill');
const { shouldPolyfill: shouldPolyfillDateTimeFormat } = require('@formatjs/intl-datetimeformat/should-polyfill');
const { shouldPolyfill: shouldPolyfillRelativeTimeFormat } = require('@formatjs/intl-relativetimeformat/should-polyfill');

/**
 * Dynamically polyfill Intl API & its locale data
 * @param locale locale to polyfill
 */
async function polyfill(locale = '') {
  const dataPolyfills = [];
  // Polyfill Intl.getCanonicalLocales if necessary
  if (shouldPolyfillGetCanonicalLocales()) {
    await import(
      /* webpackChunkName: "intl-getcanonicallocales" */ '@formatjs/intl-getcanonicallocales/polyfill'
    );
  }

  // Polyfill Intl.PluralRules if necessary
  if (shouldPolyfillPluralRules()) {
    await import(
      /* webpackChunkName: "intl-pluralrules" */ '@formatjs/intl-pluralrules/polyfill'
    );
  }

  if ((Intl.PluralRules).polyfilled) {
    const lang = locale.split('-')[0];
    switch (lang) {
      default:
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-pluralrules" */ '@formatjs/intl-pluralrules/locale-data/en'
          )
        );
        break;
      case 'fr':
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-pluralrules" */ '@formatjs/intl-pluralrules/locale-data/fr'
          )
        );
        break;
    }
  }

  // Polyfill Intl.NumberFormat if necessary
  if (shouldPolyfillNumberFormat()) {
    await import(
      /* webpackChunkName: "intl-numberformat" */ '@formatjs/intl-numberformat/polyfill'
    );
  }

  if ((Intl.NumberFormat).polyfilled) {
    switch (locale) {
      default:
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-numberformat" */ '@formatjs/intl-numberformat/locale-data/en'
          )
        );
        break;
      case 'fr':
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-numberformat" */ '@formatjs/intl-numberformat/locale-data/fr'
          )
        );
        break;
    }
  }

  // Polyfill Intl.DateTimeFormat if necessary
  if (shouldPolyfillDateTimeFormat()) {
    await import(
      /* webpackChunkName: "intl-datetimeformat" */ '@formatjs/intl-datetimeformat/polyfill'
    );
  }

  if ((Intl.DateTimeFormat).polyfilled) {
    dataPolyfills.push(import('@formatjs/intl-datetimeformat/add-all-tz'));
    switch (locale) {
      default:
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-datetimeformat" */ '@formatjs/intl-datetimeformat/locale-data/en'
          )
        );
        break;
      case 'fr':
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-datetimeformat" */ '@formatjs/intl-datetimeformat/locale-data/fr'
          )
        );
        break;
    }
  }

  // Polyfill Intl.RelativeTimeFormat if necessary
  if (shouldPolyfillRelativeTimeFormat()) {
    await import(
      /* webpackChunkName: "intl-relativetimeformat" */ '@formatjs/intl-relativetimeformat/polyfill'
    );
  }

  if ((Intl).RelativeTimeFormat.polyfilled) {
    switch (locale) {
      default:
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-relativetimeformat" */ '@formatjs/intl-relativetimeformat/locale-data/en'
          )
        );
        break;
      case 'fr':
        dataPolyfills.push(
          import(
            /* webpackChunkName: "intl-relativetimeformat" */ '@formatjs/intl-relativetimeformat/locale-data/fr'
          )
        );
        break;
    }
  }

  await Promise.all(dataPolyfills);
}
module.exports = { polyfill }
