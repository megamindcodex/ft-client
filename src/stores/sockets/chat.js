import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useChatStore = defineStore('chatStore', () => {
  // create a new Manager instance
  const socketEndpoint = import.meta.env.VITE_webSocket_URL

  const manager = new io.Manager(socketEndpoint, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  })
  const socket = manager.socket('/chat')

  const connect_to_chat_socket = async (userName) => {
    // if (socket.active) {
      socket.emit("join", userName)
      console.log(`${userName} connected to the chat namespace`)

      return { success: true }
    // }
  }

  socket.on("handshake", (data) => {
    console.log(`${data.userName}: ${data.socketId}`)
  })



  return { connect_to_chat_socket }
})
