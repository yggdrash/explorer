import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import {
  ADD_BLOCK,
  SET_IS_CONNECTED,
} from '../mutation-types'

export default function createWebSocketPlugin (url) {
  const socket = new SockJS(url)
  const stompClient = Stomp.over(socket, { debug: false })

  return store => {
    stompClient.connect(
      {},
      () => {
        store.commit(SET_IS_CONNECTED, true)
        stompClient.subscribe("/topic/blocks", tick => {
          store.commit(ADD_BLOCK, JSON.parse(tick.body))
        })
      },
      error => {
        console.error(error)
        store.commit(SET_IS_CONNECTED, false)
      }
    )
  }
}
