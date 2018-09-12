import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import {
  ADD_BLOCK
} from '../mutation-types'

export default function createWebSocketPlugin (url) {
  const socket = new SockJS(url)
  const stompClient = Stomp.over(socket, { debug: false })

  return store => {
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe("/topic/blocks", tick => {
          store.commit(ADD_BLOCK, JSON.parse(tick.body))
        })
      }
    )
  }
}
