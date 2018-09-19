import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import {
  ADD_BLOCK,
  ADD_TX,
  SET_IS_CONNECTED,
} from '../mutation-types'
import {
  SET_CURRENT_BRANCHE
} from '../mutation-types'
export default function createWebSocketPlugin (url) {
  const socket = new SockJS(url)
  const stompClient = Stomp.over(socket, { debug: false })

  return store => {
    let selectedBranchId = '';
    store.subscribe((mutation) => {
      if (mutation.type === SET_CURRENT_BRANCHE) {
        selectedBranchId = mutation.payload.id
      }
    })
    stompClient.connect(
      {},
      () => {
        store.commit(SET_IS_CONNECTED, true)
        stompClient.subscribe("/topic/blocks", tick => {
          console.log(tick.body)
          let parsedTick = JSON.parse(tick.body)
          if (selectedBranchId === '' || selectedBranchId === parsedTick.chain) {
            store.commit(ADD_BLOCK, parsedTick)
          }
        })
        stompClient.subscribe("/topic/txs", tick => {
          let parsedTick = JSON.parse(tick.body)
          if (selectedBranchId === '' || selectedBranchId === parsedTick.chain) {
            store.commit(ADD_TX, parsedTick)
          }
        })
      },
      error => {
        console.error(error)
        store.commit(SET_IS_CONNECTED, false)
      }
    )
  }
}
