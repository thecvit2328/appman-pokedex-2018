import react, { Component } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'
import _ from 'lodash'


const pt10 = {
  marginTop: '10px'
}

class CardLists extends Component {
  state = {
    cards: [
      {
        name: 'Deoxys ex',
        imageUrl: 'https://images.pokemontcg.io/ex8/98.png',
        hp: 100,
        str: '100%',
        weak: '50%',
        happiness: 5
      },
      {
        name: 'Cubone',
        imageUrl: 'https://images.pokemontcg.io/dp6/90.png',
        hp: 100,
        str: '100%',
        weak: '50%',
        happiness: 5
      }
    ]
  }

  componentDidMount() {
    this.cardList()
  }

  cardList = () => {
    return {}
  }

  happiness = level => {
    let res = []
    for (let i = 0; i < level; i++) {
      res.push(<img src="/static/images/happy.png" key={i} height="26" />)
    }
    return res
  }

  render() {
    return (
      <Container style={pt10}>
        <Row>
          <Col>
            <Input type="text" name="email" placeholder="Find Pokémon" />
          </Col>
        </Row>
        {_.some(this.state.cards) && this.state.cards.map((row, index) => {
          return (
            <Row style={pt10} key={index}>
              <Col xs="2" sm="2">
                <img src={row.imageUrl} width="100%" />
              </Col>
              <Col xs="10" sm="10">
                <h1>{row.name}</h1>
                <Row style={pt10}>
                  <Col xs="4">HP</Col>
                  <Col xs="8">{row.hp}</Col>
                  <Col xs="4">STR</Col>
                  <Col xs="8">{row.weak}</Col>
                  <Col xs="4">WEAK</Col>
                  <Col xs="8">{row.weakƒ}</Col>
                  <Col xs="12" style={pt10}>
                    {this.happiness(row.happiness)}
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        })}
      </Container>
    )
  }
}

export default CardLists
