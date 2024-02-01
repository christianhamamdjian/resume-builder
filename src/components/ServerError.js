import React from 'react'
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className='section section-center text-center'>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
        <h2>There was an error please try again...</h2>
        <Link className="btn" to="/">
          Home
        </Link>
      </div>
    </div>
  )
}

export default ServerError