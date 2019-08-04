import VNT from 'vnt'
import abi from './abi.json'
import { message } from 'antd'

const rpc = process.env.REACT_APP_RPC

const vnt = new VNT()

vnt.setProvider(new vnt.providers.HttpProvider(rpc))

const voteContract = vnt.core.contract(abi).at("0x0000000000000000000000000000000000000009");

// const initFetch = (method, params) => {
//   return {
//     method: 'post',
//     headers: new Headers({
//         'Content-Type': 'application/json',
//     }),
//     body: JSON.stringify({
//       jsonrpc: '2.0',
//       method: method,
//       params: params || [],
//       id: 1
//     })
//   }
// }

export const getAllCandidates = () => {
  // return fetch(rpc,initFetch('core_getAllCandidates'))
  return Promise.resolve({result:[
    {
        "owner": "0x122369F04f32269598789998de33e3d56E2C507a",
        "name": "node0",
        "registered": true,
        "website": "www.node0.com",
        "url": "/ip4/127.0.0.1/tcp/5210/ipfs/1kHcch6yuBCgC5nPPSK3Yp7Es4c4eenxAeK167pYwUvNjRo",
        "voteCount": "0xaef33",
        "binder": "0x34cc5438c9ae5f46aba04d3edccea8c37b1886b6",
        "beneficiary": "0x0000000000000000000000000000000000000003",
        "bind": true
    },
    {
        "owner": "0x3DcF0b3787C31B2bdF62d5bC9128A79c2bb18829",
        "name": "node1",
        "registered": true,
        "website": "www.node1.com",
        "url": "/ip4/127.0.0.1/tcp/5211/ipfs/1kHJFKr2bzUnMr1NbeyYbYJa3RXT18cEu7cNDrHWjg8XYKB",
        "voteCount": "0xaef33",
        "binder": "0x34cc5438c9ae5f46aba04d3edccea8c37b1886b6",
        "beneficiary": "0x0000000000000000000000000000000000000004",
        "bind": false
    }]})
}

export const getCoinbase = () => {
  return new Promise(resolve => {
    window.vnt.core.getCoinbase((err, result) => {
      if (err) {
        console.log(err)//eslint-disable-line
        message.error(err)
      }
      if (result) {
        resolve(result)
      }
    })
  })
}

export const bindCandidate = (payload, callback) => {
  const { candidate, beneficiary, addr } = payload
  const data = voteContract.$bindCandidate.sendTransaction(candidate,beneficiary,{ from: addr, value:1e25 })
  console.log(data) //eslint-disable-line
  sendTx({...payload, data}, callback)
}

export const unBindCandidate = payload => {
  const { candidate, beneficiary, addr } = payload
  const data = voteContract.unbindCandidate.sendTransaction(candidate,beneficiary,{from: addr})
  console.log(data) //eslint-disable-line
  sendTx({...payload, data}, callback)
}

//发送交易
const sendTx = (payload, callback) => {
  const { addr, data } = payload
  const tx = {
    from: addr,
    to: '0x0000000000000000000000000000000000000009',
    data: data,
    value: 1e25
  }
  const gasPrice = getGasPrice()
  const gas = getGas(tx)
  window.vnt.core.sendTransaction({
    ...tx,
    gasPrice,
    gas
  }, callback)
}

// 估算油价
const getGasPrice = () => {
  return new Promise(resolve => {
    window.vnt.core.getGasPrice((err, res) => {
      if(err) {
        message.error(err)
      }
      resolve(res)
    })
  })
}
// 估算耗油量
const getGas = tx => {
  return new Promise(resolve => {
    window.vnt.core.estimateGas(
      // {
      //   from: sendAddr.addr,
      //   to: '0x0000000000000000000000000000000000000009',
      //   data: data,
      //   value: funcName === txActions.stake ? inputData : 0
      // },
      tx,
      (err, res) => {
        if(err) {
          message.error(err)
        }
        resolve(res)
      }
    )
  })
}
