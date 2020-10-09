import React from 'react'
import Head from 'next/head'
import { useIntl } from '../components/Provider'
import Layout from '../components/Layout'
import { messages } from "../components/messages"

export default function Home() {
  const intl = useIntl()

  return (
    <Layout>
      <Head>
        <meta name="description" content={intl.formatMessage(messages.description)} />
      </Head>
      <p>
        {intl.formatMessage(messages.greeting)}
      </p>
    </Layout>
  )
}