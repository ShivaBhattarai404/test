import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError();
  let message;
  if(error.status === 404){
    message = "404 Not Found requested URL"
  }else{
    message = error?.data?.message || error?.statusText || "Custom Error from error page"
  }
  return (
    <div>
      <h1>Error Page</h1>
      <h2>{[error.status," ", message]}</h2>
    </div>
  )
}

export default Error