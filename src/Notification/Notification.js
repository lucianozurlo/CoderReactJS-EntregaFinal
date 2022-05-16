import './Notification.css'
import { createContext, useState, useContext } from 'react'

const Notification = ({ message, severity }) => {
    const notificationStyles = {
        position: 'absolute',
        top: 100,
        fontWeight: 500,
        right: 15,
        width: 'auto',
        height: 'auto',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 10
    }

    if (message === '') {
        return null
    }

    const config = true
        ? {
            style: notificationStyles,
            className: `${severity === 'success' ? 'Success' : 'Error'}`
        }
        : {}

    return (
        <div {...config}>
            {message}
        </div>
    )
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const setNotification = (sev, msg) => {
        setMessage(msg)
        setSeverity(sev)
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    return (
        <NotificationContext.Provider value={{ setNotification }}>
            <Notification message={message} severity={severity} />
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}