// import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'
import React from 'react'
import App from 'next/app'
import IntlProvider from "../components/Provider"

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }
    return { pageProps }
  }
  // const locale = typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("Language") ? sessionStorage.getItem("Language") : 'en';
  // const messages = getMessages(locale);
  // const intl = createIntl(
  //   {
  //     locale,
  //     messages,
  //   },
  //   cache
  // )
  render() {
    const { Component, pageProps } = this.props
    return (
      <IntlProvider>
        <Component {...pageProps} />
      </IntlProvider>
    )
  }

}

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   let pageProps = {}

//   const { req } = ctx
//   // const locale = req?.locale ?? 'en'
//   // const messages = req?.messages ?? {}

//   if (Component.getInitialProps) {
//     Object.assign(pageProps, await Component.getInitialProps(ctx))
//   }

//   return { pageProps }
// }

export default MyApp