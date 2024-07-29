import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useNewsStore = defineStore('newsStore', () => {
  const socketEndpoint = import.meta.env.VITE_webSocket_URL
  let manager
  let socket

  const connect_to_news_socket = (userName) => {
    manager = new io.Manager(socketEndpoint, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    socket = manager.socket('/news')
    if (socket.active) {
      console.log(`${userName} connected to the news namespace`)
      return { success: true }
    }
    // console.log(`${userName} Connected to the news namespace`)
  }

  return { connect_to_news_socket }
})
