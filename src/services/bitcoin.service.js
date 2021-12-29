import axios from "axios"
import { storageService } from './storage.service'

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransaction,
  getBtcWorth,
  getUserWorth
}


const KEY = 'BTC'

async function getRate(coins) {
  try {
    const res =  await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    console.log(res.data);
  } catch (e) {
    console.error(e)
  }
}

async function getBtcWorth() {
  try {
    const res = await axios.get('https://blockchain.info/ticker')
    return res.data
  } catch (e) {
    console.log(e)
  }
}

async function getUserWorth(coins, currency = 'USD') {
  const data = await getBtcWorth()
  const price = data[currency].last
  return {price: price.toLocaleString('en-US', { style: 'currency', currency }), userWorth: (coins * price).toLocaleString('en-US',{ style: 'currency', currency })}
}

async function getMarketPrice(timeSpan = '6months') {
  try {
    const price = storageService.load(KEY)
    if (!price) {
      const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=${timeSpan}&format=json&cors=true`)
      storageService.save(KEY, res.data.values)
      return res.data.values
    } else return price
  } catch (e) {
    console.error(e)
  }
}

async function getConfirmedTransaction() {
  try {

  } catch (e) {
    console.error(e)
  }
}
