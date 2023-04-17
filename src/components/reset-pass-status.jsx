import React from "react";
import { useLocation } from "react-router-dom";
 
  export default function ResetPasswordState(props) {
    const location =  useLocation();
    console.log('The message: '+props);
    
    return (
      <div className="container">
          <header className="jumbotron">
            <h3>{location.state.message}</h3>
          </header>
        </div>
    )
  
  }

