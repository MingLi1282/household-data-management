import axios from "axios";
import * as React from "react";
import "./Household.css";
import { notification } from 'antd';
import { Link } from "react-router-dom";
import { json } from "stream/consumers";

export class Household extends React.Component {
    state = {
        email: "",
        postalCode: "",
        location: "",
        occupants: 0,
        bedrooms: 0,
        homeType: "Apartment",
        footage: "",
        areaCode: "",
        phoneType: "home",
        remainingSevenDigits: "",
        displayEmail: true,
        displayPostalCode: false,
        displayPostalCodeDetail: false,
        displayPhone: false,
        displayHouseholdDetail: false,
        displayPhoneDetail: false
    }

    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    submitEmail = async () => {
        var response = await axios.post("http://localhost:8080/household/verify_email", JSON.stringify({ 'Email': this.state.email }), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Invalid input format or email already existed in database!", duration: 15 })
        }
        else {
            this.setState({
                displayEmail: false,
                displayPostalCode: true
            })
        }
    }

    submitPostalCode = async () => {
        var response = await axios.post("http://localhost:8080/household/enter_postalcode", JSON.stringify({ 'PostalCode': this.state.postalCode }), this.config)
        if (response.data.length === 0) {
            notification["error"]({ message: "Can't find postalcode!", duration: 15 })
        }
        else {
            this.setState({
                displayPostalCode: false,
                displayPostalCodeDetail: true,
                location: response.data["city"] + ", " + response.data["state"]
            })
        }
    }

    submitPhoneNumber = async () => {
        var response = await axios.post("http://localhost:8080/household/enter_phone", JSON.stringify({ 'AreaCode': this.state.areaCode, 'RemainingSevenDigits': this.state.remainingSevenDigits }), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Invalid input format or phone number already exists", duration: 15 })
        }
        else {
            this.setState({
                displayPhone: false,
                displayHouseholdDetail: true
            })
        }
    }

    submitHouseHold = async () => {
        var response = await axios.post("http://localhost:8080/household/enter_household", JSON.stringify(
            { 
              "Email": this.state.email,
              "SquareFoot": this.state.footage,
              "Bedroom": this.state.bedrooms,
              "Occupants": this.state.occupants,
              "HouseholdType":this.state.homeType,
              "PostalCode":this.state.postalCode,
              "AreaCode": this.state.areaCode,
              "RemainingSevenDigits":this.state.remainingSevenDigits,
              "PhoneType": this.state.phoneType,
              "PhoneInput": this.state.displayPhoneDetail
            }), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Error, please refill your information!", duration: 15 })
        }
        else {
            this.setState({
                displayPhone: false,
                displayHouseholdDetail: true
            })
        }

        window.location.href = '/Bathroom?email=' + this.state.email
    }

    render() {
        return (
            <div>
                <div className="Household">
                    <h1> Enter Household Information  </h1>

                    {
                        this.state.displayEmail ?
                            <div>
                                <h2>Please enter your email address:</h2>
                                <input style={{ width: "370px" }} onChange={(e) => this.setState({ email: e.target.value })}></input>
                                <button onClick={this.submitEmail}>Submit</button>
                            </div> : <div></div>
                    }
                    {
                        this.state.displayPostalCode ?
                            <div>
                                <h2>Please enter your five digit postal code:</h2>
                                <input style={{ width: "100px" }} onChange={(e) => this.setState({ postalCode: e.target.value })}></input>
                                <button onClick={this.submitPostalCode}>Submit</button>
                            </div> : <div></div>
                    }
                    {
                        this.state.displayPostalCodeDetail ?
                            <div>
                                <h2>You entered the following postal code:</h2>
                                <p>{this.state.postalCode}</p>
                                <p>{this.state.location}</p>
                                <p style={{ color: "red" }}> Is this Correct? </p>
                                <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={() => this.setState({ displayPostalCodeDetail: false, displayPhone: true })}>Yes </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={() => this.setState({ displayPostalCodeDetail: false, displayPostalCode: true })}>No </button>
                            </div> : <div></div>
                    }
                    {
                        this.state.displayPhone ?
                            <div>
                                <h2>Would you like to enter a phone number?&nbsp;&nbsp;
                                    <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={() => this.setState({ displayPhoneDetail: true })}>Yes </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={() => this.setState({ displayPhone: false, displayHouseholdDetail: true, displayPhoneDetail: false })}>No </button>
                                </h2>

                                <div style={this.state.displayPhoneDetail ? {} : { display: 'none' }}>
                                    <h3> Please enter your phone number. </h3>
                                    <label>Area code:</label>
                                    <input type="text" id="AreaCode" name="AreaCode" pattern="[0-9]{3}" style={{ width: "100px" }} maxLength={3} onChange={(e) => this.setState({ areaCode: e.target.value })}></input>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label>Number:</label>
                                    <input type="text" id="Pnumber" name="Pnumber" pattern="[0-9]{3}-[0-9]{4}" style={{ width: "100px" }} maxLength={7} onChange={(e) => this.setState({ remainingSevenDigits: e.target.value })}></input>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>Phone type:</label>
                                    <select name="PhoneList" id="PhoneList" onChange={(e) => this.setState({ phoneType: e.target.value })}>
                                        <option value="home">home</option>
                                        <option value="mobile">mobile</option>
                                        <option value="work">work</option>
                                        <option value="other">other</option>
                                    </select> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={this.submitPhoneNumber}>Next </button>
                                </div>
                            </div> : <div></div>
                    }
                    {
                        this.state.displayHouseholdDetail ?
                            <div>
                                <h2>Please enter the following details for your household.&nbsp;&nbsp; </h2>
                                <p><label>Home type:</label> &nbsp;
                                    <select name="Home type" id="HomeType" onChange={(e) => this.setState({ homeType: e.target.value })}>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Condominium">Condominium</option>
                                        <option value="House">House</option>
                                        <option value="Mobile home">Mobile home</option>
                                        <option value="Townhome">Townhome</option>
                                    </select> </p>
                                <p><label>Square footage</label>
                                    <input type="number" id="Sqft" name="Sqft" style={{ width: "100px" }} onChange={(e) => this.setState({ footage: e.target.value })}></input> </p>
                                <p>Occupants:<button disabled={this.state.occupants !== 0 ? false : true} onClick={() => this.setState({ occupants: this.state.occupants -= 1 })}>-</button>&nbsp;{this.state.occupants}&nbsp;<button onClick={() => this.setState({ occupants: this.state.occupants += 1 })}>+</button></p>
                                <p>Bedrooms:<button disabled={this.state.bedrooms !== 0 ? false : true} onClick={() => this.setState({ bedrooms: this.state.bedrooms -= 1 })}>-</button>&nbsp;{this.state.bedrooms}&nbsp;<button onClick={() => this.setState({ bedrooms: this.state.bedrooms += 1 })}>+</button></p>
                                <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={this.submitHouseHold}>Submit</button>
                            </div> : <div></div>
                    }
                </div>
            </div>
        );
    }
}