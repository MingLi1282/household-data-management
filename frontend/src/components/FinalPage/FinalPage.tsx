import * as React from "react";
import "./FinalPage.css";
import {Link} from "react-router-dom";



export class FinalPage extends React.Component {
   render() {
       return (
            <div>
                
                <div className="Final_Page">
                <h1>Submission complete!</h1> 
                <h2>Thanks you for providing your information to Hemkraft!</h2>
                <p style={{ fontSize: "14px" }}><Link to='/'>Return to the main menu</Link></p>
                </div>
               
           </div>
       );
   }
}