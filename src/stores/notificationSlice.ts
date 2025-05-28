import { StateCreator } from "zustand";

export type NotificationSliceType = {
    showNotification: boolean,
    isError: boolean,
    message: string,
    openNotification: (isError: boolean, message: string) => void,
    closeNotification: () => void
}

export const createNotificationSlice : StateCreator<NotificationSliceType> = (set) => ({
    showNotification: false,
    isError: false,
    message: '',
    openNotification: (isError: boolean, message: string) => {
        set({
        showNotification: true,
        isError,
        message
        })
    },
    closeNotification: () => {
        set({
            showNotification: false,
        })
    },
})