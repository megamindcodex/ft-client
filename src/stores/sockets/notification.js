import { defineStore, storeToRefs } from "pinia";
import { io } from 'socket.io-client'
import { ref, computed, watchEffect, watch } from "vue";
import apiClient from "@/api/apiConfig";
import { useTransferStore } from "../transferStore";
import { useCookies } from "@/composables/useCookies";
import { useUserStore } from "../userStore";

export const useNotificationStore = defineStore("notificationStore", () => {

    // const notifications = ref([])

    const { getCookie } = useCookies()

    const accessToken = ref(null)

    const userStore = useUserStore()
    const { getUserData } = userStore
    const { notifications } = storeToRefs(userStore)

    // const transferStore = useTransferStore()
    // const { get_user_transactions } = transferStore

    const display = ref(false)
    const newNotifications = ref([])
    const notifyQueue = ref([])
    const notifyDump = ref([])




    const socketEndpoint = import.meta.env.VITE_webSocket_URL

    const manager = new io.Manager(socketEndpoint, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    })
    const socket = manager.socket('/notification')

    socket.on("handshake", (userName) => {
        console.log(`${userName} received handshake`)
    })

    socket.on("credit-alert", async (notifyData) => {
        await getUserData()
        await filter_new_notifications()
        console.log(notifyData.message)
    })

    socket.on("testing", (socketId) => {
        console.log(`testing socket with: ${socketId}`)
    })


    const connect_to_notification_socket = async (userName) => {
        try {
            // console.log(socket)
            socket.timeout(5000).emit("join", userName, (err, response) => {
                if (err) {
                    console.error("couldn't Acknowledge notification namespace request", err)
                } else {
                    console.log(response.message)
                }
            })
        } catch (err) {
            console.error("Error connecting to notification socket", err)
        }
    }

    const filter_new_notifications = async () => {
        try {

            if (!notifications.value || notifications.value.length < 1) {
                return console.error("notifications variable is empty or undefined")
            }
            newNotifications.value = notifications.value.filter(notification => notification.newMessage === true);

            console.log(notifications.value)

            if (notifications.value.length > 0) {
                // console.log("new notifications: ", newNotifications.value)

            }

            run_notify_process()

        } catch (err) {
            console.error("Error checking notification update", err)
        }
    }

    const run_notify_process = async () => {

        if (newNotifications.value.length === 0) {
            console.error("new notifications is empty");
            return;
        }

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        for (const [index, element] of newNotifications.value.entries()) {
            try {
                // Ensure that notifyQueue.value is not modified unexpectedly elsewhere


                notifyQueue.value.push(element);
                notifyDump.value.push(element)
                await delay(3000);  // Delay between processing elements
                if (notifyQueue.value.length === 1) {
                    remove_notification_item(element)
                    await delay(300)
                }

                // console.log(element);
            } catch (error) {
                console.error(`Error processing element at index ${index}:`, error);
            }
        }

        console.log(notifyDump.value)
        update_user_Notifications()
        console.log('Processing complete');
    };



    // const add_notification_item = async (element, index) => {
    //     notifyQueue.value.push(element);
    // }

    const remove_notification_item = async (element) => {
        const index = notifyQueue.value.indexOf(element);
        notifyQueue.value.splice(index, 1);
        // if (index !== -1) {
        //     console.log(index)
        //     notifyQueue.value.splice(index, 1); // Remove the item at the found index

        // }
    }

    const clear_newNotifications = () => {
        newNotifications.value = []
        notifyQueue.value = []
        console.log("cleard all new notifications: ", newNotifications.value)
    }

    const update_user_Notifications = async () => {
        try {
            accessToken.value = await getCookie()
            if (!accessToken.value) {
                console.error("Access token required")
                return { success: false, error: "Access token required" }
            }

            // Set the Authorization header with the access token
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            }

            if (notifyDump.value.length === 0) {
                console.log("notifyDump is empty", err)
                return
            }
            const notificationIds = notifyDump.value.map(item => item.subjectId)
            // console.log(notificationIds)
            const res = await apiClient.put("/api/update_notifications", notificationIds, config)

            if (res.status === 200) {
                console.log("user notification updated successfully")
            }
        } catch (err) {
            console.error("Error updating user notifications", err)
        }
    }





    return { newNotifications, notifyQueue, connect_to_notification_socket, filter_new_notifications, remove_notification_item }
})