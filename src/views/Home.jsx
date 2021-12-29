import { Component } from 'react'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { MovesList } from '../cmps/MovesList'

export class Home extends Component {

  state = {
    user: null,
    userWorth: null,
    currBtcVal: null,
    marketPrices: null,
  }
  
  componentDidMount() {
    this.loadUser()
    this.getGraphStats()
  }
  
  loadUser = () => {
    const user = userService.loadUser()
    this.setState({ user })
  }

  getGraphStats = async () => {
    const priceValues = await bitcoinService.getMarketPrice()
    const marketPrices = priceValues.map(price => price.y)
    this.setState({ marketPrices })
  }

  getUserWorth = async () => {
    // const btcPrices = await bitcoinService.getUserWorth(this.state.user.coins)
    // console.log(btcPrices);
    // const { userWorth, price } = btcPrices
    // this.setState({ userWorth, currBtcVal: price })
  }

  render() {
    const { user, marketPrices, userWorth, currBtcVal } = this.state

    if (!user) return <div className="loader">Loading...</div>
    return (
      <div className="home-page">
        <div className="overview-container">
          <div className="user-container">
            Hi, {user.name.substring(0, user.name.indexOf(' '))}
          </div>
          <div className="user-details-overview">
            <div className="user-balance">
              <span className="muted-text">Current Balance</span>
              <span className="balance-amount-btc">BTC: {user.coins}</span>
              <span className="balance-amount-usd">USD: <span className="muted-text">{userWorth}</span></span>
            </div>
            <div className="btc-worth-rate">
              Current BTC-USD {currBtcVal}
            </div>
          </div>
        </div>
        <div className="main-graph-container">
          { marketPrices ? 
            <Sparklines data={marketPrices} limit={100} height={100} margin={10}>
              <SparklinesLine style={{ stroke: "black", fill: "none" }} />
              <SparklinesSpots />
            </Sparklines>
            : <div className="loader">Loading</div>  
          }
        </div>
        <div className="user-moves">
          <MovesList user={user} />
        </div>
      </div>
    )
  }
}
