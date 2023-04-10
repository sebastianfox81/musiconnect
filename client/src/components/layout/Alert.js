import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context'

const Alert = () => {

  const {alerts, removeAlert } = useGlobalContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(alerts.id)
    }, 5000)
    return () => clearTimeout(timeout)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="alert-wrapper">
      {alerts.map((alert) => {
        const { id, msg, type} = alert
        return (
          <div key={id} className={`alert alert-${type}`}>
          {msg}
        </div>
        )
      })}


</div>
  )
}


export default Alert;
