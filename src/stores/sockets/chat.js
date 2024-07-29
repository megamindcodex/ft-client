import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useChatStore = defineStore('chatStore', () => {
  // create a new Manager instance
  const socketEndpoint = import.meta.env.VITE_webSocket_URL
  let manager
  let socket

  const connect_to_chat_socket = async (userName) => {
    manager = new io.Manager(socketEndpoint, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })
    socket = manager.socket('/chat')
    if (socket.active) {
      console.log(`${userName} connected to the chat namespace`)
      return { success: true }
    }
  }

  return { connect_to_chat_socket }
})
