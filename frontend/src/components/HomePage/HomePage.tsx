import * as React from "react";
import "./HomePage.css";
import {Link} from "react-router-dom";



export class HomePage extends React.Component {
   render() {
       return (
            <div>
                
                <div className="HomePage">
                <h1>Welcome to Hemkraft!</h1> 
                <h2>Please choose what you'd like to do:</h2>
                <p style={{fontSize:"18px"}}><Link to='/Household'>Enter my household information</Link></p>
                <p style={{fontSize:"18px"}}><Link to='/ViewReport'>View reports/query data</Link></p>
                </div>
               
           </div>
       );
   }
}