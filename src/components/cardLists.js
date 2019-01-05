import react, { Component } from 'react'
import { Container, Row, Col, Input, Progress } from 'reactstrap'
import _ from 'lodash'
import axios from 'axios'

const pt10 = {
  marginTop: '10px'
}

class CardLists extends Component {
  state = {
    searchValue: '',
    cards: []
  }

  componentDidMount() {
    this.cardList()
  }

  cardList = async (search) => {
    const calcHP = o => (o > 100 && 100) || o
    const calcDamage = o => (o > 100 && 100) || o
    const calcWeak = o => (o > 100 && 100) || o
    const calcHappiness = (hp, damage, weak) => (hp / 10 + damage / 10 + 10 - weak) / 5
    const hasSearch = (search) ? `&name=${search}` : ''
    const res = await axios({
      method: 'get',
      url: `http://localhost:3030/api/cards?limit=200${hasSearch}`
    })

    const dataCards = res.data.cards.map(o => {
      const hp = (o.hp && calcHP(parseInt(o.hp))) || 0
      const damage =
        (o.attacks && o.attacks.length > 0 && calcDamage(o.attacks.length * 50)) || 0
      const weak =
        (o.weaknesses && o.weaknesses.length > 0 && calcWeak(o.weaknesses.length * 50)) ||
        0
      const happiness = calcHappiness(hp, damage, weak)
      return {
        name: o.name,
        imageUrl: o.imageUrl,
        hp,
        damage,
        weak,
        happiness
      }
    })

    this.setState({ cards: dataCards })
  }

  getHappiness = level => {
    let res = []
    for (let i = 0; i < level; i++) {
      res.push(<img src="/static/images/happy.png" key={i} height="26" />)
    }
    return res
  }

  handleSearch = (e) => {
    this.cardList(e.target.value)
  }

  render() {
    return (
      <Container style={pt10}>
        <Row>
          <Col>
            <Input
              type="text"
              placeholder="Find Pokémon"
              onChange={this.handleSearch.bind(this)}
              value={this.searchValue}
            />
          </Col>
        </Row>
        {_.some(this.state.cards) &&
          this.state.cards.map((row, index) => {
            return (
              <Row style={pt10} key={index}>
                <Col xs="2" sm="2">
                  <img src={row.imageUrl} width="100%" />
                </Col>
                <Col xs="10" sm="10">
                  <h1>{row.name}</h1>
                  <Row style={pt10}>
                    <Col xs="4">HP</Col>
                    <Col xs="8">
                      <Progress value={row.hp} />
                    </Col>
                    <Col xs="4">STR</Col>
                    <Col xs="8">
                      <Progress value={row.damage} />
                    </Col>
                    <Col xs="4">WEAK</Col>
                    <Col xs="8">
                      <Progress value={row.weak} />
                    </Col>
                    <Col xs="12" style={pt10}>
                      {this.getHappiness(row.happiness)}
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
