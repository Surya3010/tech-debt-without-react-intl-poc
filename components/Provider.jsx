import * as React from 'react';

function getMessages(locale) {
    let langBundle;
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
    if (!langBundle) {
        return ['en-GB', import('../compiled-lang/en-GB.json')];
    }
}

export const IntlContext = React.createContext(getMessages('en-GB'))

export const useIntl = () => React.useContext(IntlContext)

export default function Provider(children) {
    const requestedLocales = (typeof window !== 'undefined' && sessionStorage.getItem("Language")) ?
        sessionStorage.getItem("Language") : 'en-GB';
    return (
        <IntlContext value={getMessages(requestedLocales)}>{children}</IntlContext>
    );
}

