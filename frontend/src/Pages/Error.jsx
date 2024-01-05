import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Error Page</h1>
      <h2>{error.status} {error?.data?.message}</h2>
    </div>
  )
}

export default Error