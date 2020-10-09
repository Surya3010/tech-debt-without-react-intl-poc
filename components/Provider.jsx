import React, { createContext, useContext } from 'react';
import en from '../lang/en.json';
import fr from '../lang/fr.json';

function getMessages(language) {
    let langBundle;
    switch (language) {
        case 'fr':
            langBundle = fr;
            break;
        case 'en':
            langBundle = en;
            break;
        default:
            langBundle = en;
            break;
        // Add more languages
    }
    return { formatMessage: data => langBundle[data.id] }
}

export const IntlContext = createContext(getMessages('en'))


export const useIntl = () => useContext(IntlContext)

const IntlProvider = (props) => {
    const requestedLocales = (typeof window !== 'undefined' && sessionStorage.getItem("Language")) ?
        sessionStorage.getItem("Language") : 'en';
    return (

        <IntlContext.Provider value={getMessages(requestedLocales)}><div>{props.children}</div> </IntlContext.Provider>
    );
}
export default IntlProvider

