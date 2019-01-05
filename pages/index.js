import react, { Component } from 'react'
import Head from 'next/head'
import CardLists from '../src/components/cardLists'

class App extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>POKEDEX 2018</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet" />
        </Head>
        <CardLists />
      </div>
    )
  }
}

export default App
