import React from 'react'
import moment from 'moment'

const Notifications = ({notifications}) =>{
    return(
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Progress</span>
                    <ul className="notifications">
                        { notifications && notifications.map(notification => {
                            console.log(notification)
                            return (
                                <li key={notification.id}>
                                    <span className="pink-text">{notification.content}</span>
                                    <div className="grey-text notification-date">
                                        {moment(notification.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications