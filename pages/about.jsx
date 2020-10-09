import React from 'react'
import { useIntl } from '../components/Provider'
import { messages } from "../components/messages"
import Layout from '../components/Layout'

export default function About() {
  const intl = useIntl()
  return (
    <Layout>
      <p>
        {intl.formatMessage(messages.description)}
      </p>
    </Layout>
  )
}
