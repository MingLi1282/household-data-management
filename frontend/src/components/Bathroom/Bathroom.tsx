import axios from "axios";
import * as React from "react";
import "./Bathroom.css";
import { notification } from 'antd';
import { Link } from "react-router-dom";

const windowUrl = window.location.search;
const params = new URLSearchParams(windowUrl);
const emailInput = params.get("email")
export class Bathroom extends React.Component {
    state = {
        email:"",
        sinks: 0,
        commodes: 0,
        bidets: 0,
        bathtubs: 0,
        showers: 0,
        tubshowers: 0,
        halfBathroomName: "",
        bathroomNo: 1,
        PrimaryBath: false,
        resultData: [],
        displayBathroomHalf: true,
        displayBathroomFull: false,
        displayBathroomList: false,
        PriBathDisable: false
    }
    componentDidMount(): void {
        this.setState({
            email: emailInput
        })
    }

    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    submitHalfBathroom = async () => {
        var response = await axios.post("http://localhost:8080/bathroom/enter_half_bathroom", JSON.stringify(
            { 
              "Email": this.state.email,
              "Order": this.state.bathroomNo,
              "Sinks": this.state.sinks,
              "Commodes": this.state.commodes,
              "Bidet":this.state.bidets,
              "Name":this.state.halfBathroomName
            }), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Error, please refill your information!", duration: 15 })
        }
        else {
            this.setState({
                displayBathroomHalf: false,
                displayBathroomList: true
            })
           
        }
        this.requestBathroomList()
        this.setState({bathroomNo: this.state.bathroomNo += 1})
        
    }

    submitFullBathroom = async () => {
        var response = await axios.post("http://localhost:8080/bathroom/enter_full_bathroom", JSON.stringify(
            { 
              "Email": this.state.email,
              "Order": this.state.bathroomNo,
              "Sinks": this.state.sinks,
              "Commodes": this.state.commodes,
              "Bidet":this.state.bidets,
              "Bathtub":this.state.bathtubs,
              "Tub_Shower":this.state.tubshowers,
              "Shower":this.state.showers,
              "Primary":this.state.PrimaryBath === true? "1" : "0",
            }), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Error, please refill your information!", duration: 15 })
        }
        else {
            this.setState({
                displayBathroomFull: false,
                displayBathroomList: true,
            })
            
        }
        
        this.requestBathroomList()
        this.setState({bathroomNo: this.state.bathroomNo += 1})

        if (this.state.PrimaryBath === true){
        this.setState({PrimaryBath:false, PriBathDisable:true})
        } 

    }

    requestBathroomList = async () => {
        var response = await axios.post("http://localhost:8080/bathroom/get_bathrooms", JSON.stringify({ "email": this.state.email }), this.config)
        this.setState({resultData: response.data})
        console.log(response.data)
    }


    render() {
        return (
            <div>
                <div className="Bathroom">
                    <h1>Bathrooms</h1>

                    {
                        this.state.displayBathroomHalf ?
                            <div>
                                <h2>Please provide the details regarding the bathroom:&nbsp;&nbsp; </h2>
                                <h2> Bathroom type:&nbsp;
                                    <button style={{ color: "white", width: "50px", height: "30px", background: "blue", border: "none" }} onClick={() => this.setState({ displayBathroomHalf: true, displayBathroomFull: false })}>Half </button> &nbsp;
                                    <button style={{ color: "white", width: "50px", height: "30px", background: "blue", border: "none" }} onClick={() => this.setState({ displayBathroomHalf: false, displayBathroomFull: true })}>Full </button>
                                </h2>
                                <p>Sinks:&nbsp;<button disabled={this.state.sinks !== 0 ? false : true} onClick={() => this.setState({ sinks: this.state.sinks -= 1 })}>-</button>&nbsp;{this.state.sinks}&nbsp;<button onClick={() => this.setState({ sinks: this.state.sinks += 1 })}>+</button></p>
                                <p>Commodes:&nbsp;<button disabled={this.state.commodes !== 0 ? false : true} onClick={() => this.setState({ commodes: this.state.commodes -= 1 })}>-</button>&nbsp;{this.state.commodes}&nbsp;<button onClick={() => this.setState({ commodes: this.state.commodes += 1 })}>+</button></p>
                                <p>Bidets:&nbsp;<button disabled={this.state.bidets !== 0 ? false : true} onClick={() => this.setState({ bidgets: this.state.bidets -= 1 })}>-</button>&nbsp;{this.state.bidets}&nbsp;<button onClick={() => this.setState({ bidgets: this.state.bidets += 1 })}>+</button></p>
                                <p><label>Half bathroom name:</label>&nbsp;<input type="text" id="HalfBathroomName" name="HalfBathroomName" style={{ width: "300px" }}></input> </p>
                                <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={this.submitHalfBathroom}> Add </button>
                            </div> : <div></div>
                    }

                    {
                        this.state.displayBathroomFull ?
                            <div>
                                <h2>Please provide the details regarding the bathroom:&nbsp;&nbsp; </h2>
                                <h2> Bathroom type:&nbsp;
                                    <button style={{ color: "white", width: "50px", height: "30px", background: "blue", border: "none" }} onClick={() => this.setState({ displayBathroomHalf: true, displayBathroomFull: false })}>Half </button> &nbsp;
                                    <button style={{ color: "white", width: "50px", height: "30px", background: "blue", border: "none" }} onClick={() => this.setState({ displayBathroomHalf: false, displayBathroomFull: true })}>Full </button>
                                </h2>
                                <p>Sinks:&nbsp;<button disabled={this.state.sinks !== 0 ? false : true} onClick={() => this.setState({ sinks: this.state.sinks -= 1 })}>-</button>&nbsp;{this.state.sinks}&nbsp;<button onClick={() => this.setState({ sinks: this.state.sinks += 1 })}>+</button></p>
                                <p>Commodes:&nbsp;<button disabled={this.state.commodes !== 0 ? false : true} onClick={() => this.setState({ commodes: this.state.commodes -= 1 })}>-</button>&nbsp;{this.state.commodes}&nbsp;<button onClick={() => this.setState({ commodes: this.state.commodes += 1 })}>+</button></p>
                                <p>Bidets:&nbsp;<button disabled={this.state.bidets !== 0 ? false : true} onClick={() => this.setState({ bidets: this.state.bidets -= 1 })}>-</button>&nbsp;{this.state.bidets}&nbsp;<button onClick={() => this.setState({ bidgets: this.state.bidets += 1 })}>+</button></p>

                                <p>Bathtubs:&nbsp;<button disabled={this.state.bathtubs !== 0 ? false : true} onClick={() => this.setState({ bathtubs: this.state.bathtubs -= 1 })}>-</button>&nbsp;{this.state.bathtubs}&nbsp;<button onClick={() => this.setState({ bathtubs: this.state.bathtubs += 1 })}>+</button></p>
                                <p>Showers:&nbsp;<button disabled={this.state.showers !== 0 ? false : true} onClick={() => this.setState({ showers: this.state.showers -= 1 })}>-</button>&nbsp;{this.state.showers}&nbsp;<button onClick={() => this.setState({ showers: this.state.showers += 1 })}>+</button></p>
                                <p>Tub/showers:&nbsp;<button disabled={this.state.tubshowers !== 0 ? false : true} onClick={() => this.setState({ tubshowers: this.state.tubshowers -= 1 })}>-</button>&nbsp;{this.state.tubshowers}&nbsp;<button onClick={() => this.setState({ tubshowers: this.state.tubshowers += 1 })}>+</button></p>

                                <p><input type="checkbox" disabled={this.state.PriBathDisable === true} onChange={() => this.setState({PrimaryBath: !this.state.PrimaryBath})}/> <label>This bathroom is a primary bathroom</label></p>
                                <button style={{ color: "blue", width: "50px", height: "30px" }} onClick={this.submitFullBathroom}>Add </button>
                            </div> : <div></div>
                    }

                    {
                        this.state.displayBathroomList ?
                            <div>
                                <h2>You have added the following bathrooms to your household:</h2>
                                <table>
                                    <tr>
                                        <th>Bathroom#</th>
                                        <th>Type</th>
                                        <th>Primary</th>
                                    </tr>
                                    {this.state.resultData.map((r) => {
                                        return (
                                        <tr>
                                            <td>
                                                {r[0]}
                                            </td>
                                            <td>
                                                {r[1]}
                                            </td>
                                            <td>
                                                {r[2]}
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </table>
                                <p><button style={{ color: "blue", width: "250px", height: "30px" }} onClick={() => this.setState({ displayBathroomHalf: true, displayBathroomList: false })}>+Add another bathroom </button>
                                </p>
                                <Link to={'/Appliance?email='+this.state.email}>Add Appliance</Link>
                            </div> : <div></div>
                    }
                </div>

            </div>
        );
    }
}

