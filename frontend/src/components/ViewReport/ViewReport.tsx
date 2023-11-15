import axios from "axios";
import * as React from "react";
import "./ViewReport.css";
import { Link } from "react-router-dom";
import { Button, Checkbox, Col, Divider, Input, notification, Radio, Row, Select, Space } from "antd";

interface Report {
    displayReportMenu: boolean,
    displayPopMF: boolean,
    displayModelSearch: boolean,
    displayTV: boolean,
    displayFridge: boolean,
    displayLaundry: boolean,
    displayBathroomStat: boolean,
    displayRadius: boolean,
    dataTopManufacturers: string[],
    dataApplianceByMF: string[],
    dataMFModel: string[],
    dataTVSize: string[],
    dataTVByState: string[],
    dataTopFridge: string[],
    dataExtraFridge: number,
    dataWasherType: string[],
    dataWasherOnly: string[],
    dataBSAllBathroom: string[],
    dataBSHalfBathroom: string[],
    dataBSFullBathroom: string[],
    dataBSCommodes: string[],
    dataBSSinks: string[],
    dataBSBidgets: string[],
    dataBSBathtubs: string[],
    dataBSShowers: string[],
    dataBSTubShowers: string[],
    dataBSMostBidgetsState: string[],
    dataBSMostBidgetsPC:string[],
    dataBSSinglebathroom: number,  
    dataSearchRadius: string[],
    manufacturer: { value: string, label: string }[],
    selectedManufacturer: string,
    name: string,
    stateChoice: { value: string, label: string }[],
    selectState: string,
    postalCode: string,
    radius: string
    }

export class ViewReport extends React.Component {
    state: Report = {
        displayReportMenu: true,
        displayPopMF: false,
        displayModelSearch: false,
        displayTV: false,
        displayFridge: false,
        displayLaundry: false,
        displayBathroomStat: false,
        displayRadius: false,
        dataTopManufacturers: [],
        dataApplianceByMF: [],
        dataMFModel: [],
        dataTVSize: [],
        dataTVByState: [],
        dataTopFridge: [],
        dataExtraFridge: 0,
        dataWasherType: [],
        dataWasherOnly: [],
        dataBSAllBathroom: [],
        dataBSHalfBathroom: [],
        dataBSFullBathroom: [],
        dataBSCommodes: [],
        dataBSSinks: [],
        dataBSBidgets: [],
        dataBSBathtubs: [],
        dataBSShowers: [],
        dataBSTubShowers: [],
        dataBSMostBidgetsState: [],
        dataBSMostBidgetsPC:[],
        dataBSSinglebathroom: 0,  
        dataSearchRadius: [],
        manufacturer: [],
        selectedManufacturer: "",
        name: "",
        stateChoice: [],
        selectState: "",
        postalCode: "",
        radius: ""
    }

    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get manufacturer and state list
    async componentDidMount() {
        var response1 = await axios.get("http://localhost:8080/appliance/getmanufacturer")
        var list1: { value: string, label: string }[] = []
        response1.data.map((m: any) => list1.push({ value: m["manufacturerName"], label: m["manufacturerName"] }))
        var response2 = await axios.get("http://localhost:8080/report/states")
        var list2: { value: string, label: string }[] = []
        response2.data.map((n: any) => list2.push({ value: n["stateName"], label: n["stateName"] }))
        this.setState({
            manufacturer: list1, stateChoice: list2
        })
    }
    
    //Top 25 popular manufacturers
    getTopManufacturers = async () => {
        var response = await axios.get("http://localhost:8080/report/top25_manufacturers")
        this.setState({dataTopManufacturers: response.data})
        console.log(response.data)
    }

    SearchApplianceByMF = async () => {
        var response = await axios.post("http://localhost:8080/report/appliance_by_manufacturer", JSON.stringify({ 'manufacturer': this.state.selectedManufacturer}), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Manufacturer does not exist!", duration: 15 })
        }
        else {
            this.setState({
                dataApplianceByMF: response.data})
                console.log(response.data)
            }
    }
    
    //Search Manufacturer/Model
    SearchManufacturerModel = async () => {
        var response = await axios.post("http://localhost:8080/report/manufacturer_model", JSON.stringify({ 'name': this.state.name }), this.config)
        if (response.data === false) {
            notification["error"]({ message: "Manufacturer/Model does not exist!", duration: 15 })
        }
        else {
            this.setState({
                dataMFModel: response.data})
                console.log(response.data)
            }
    }
    
    //Average TV Display Size by State
    getTVSize = async () => {
        var response  = await axios.get("http://localhost:8080/report/avg_TV_display_size_by_state")
        this.setState({dataTVSize: response.data})
        console.log(response.data)
    } 

    searchTVInfo = async () => {
        var response = await axios.post("http://localhost:8080/report/TV_info_by_state", JSON.stringify({ 'state': this.state.selectState}), this.config)
        if (response.data === false) {
            notification["error"]({ message: "TV information by State does not exist!", duration: 15 })
        }
        else {
            this.setState({
                dataTVByState: response.data})
                console.log(response.data)
            }
    }
      
    //Extra fridge/freezer report
    getTopFridge = async () => {
        var response = await axios.get("http://localhost:8080/report/top10_state_by_extra_fridge_household_count")
        this.setState({dataTopFridge: response.data})
        console.log(response.data)
    }

    getExtraFridge = async () => {
        var response = await axios.get("http://localhost:8080/report/extra_fridge_household")
        this.setState({dataExtraFridge: response.data})
        console.log(response.data)
    }

    //Laundry Center report
    getWasherType = async () => {
        var response = await axios.get("http://localhost:8080/report/most_common_laundry_by_state")
        this.setState({dataWasherType: response.data})
        console.log(response.data)
    }

    getWasherOnly = async () => {
        var response = await axios.get("http://localhost:8080/report/washer_only_household_count_by_state")
        this.setState({dataWasherOnly: response.data})
        console.log(response.data)
    }

    //Bathroom statistics
    getBSAllBathroom = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/all_bathrooms")
        this.setState({dataBSAllBathroom: response.data[0]})
        console.log(response.data[0])
    }
    
    getBSHalfBathroom = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/half_bathrooms")
        this.setState({dataBSHalfBathroom: response.data[0]})
        console.log(response.data[0])
    }
    getBSFullBathroom = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/full_bathrooms")
        this.setState({dataBSFullBathroom: response.data[0]})
        console.log(response.data[0])
    }
    getBSCommodes = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/commodes")
        this.setState({dataBSCommodes: response.data[0]})
        console.log(response.data[0])
    }
    getBSSinks = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/sinks")
        this.setState({dataBSSinks: response.data[0]})
        console.log(response.data[0])
    }
    getBSBidgets = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/bidets")
        this.setState({dataBSBidgets: response.data[0]})
        console.log(response.data[0])
    }
    getBSBathtubs = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/bathtubs")
        this.setState({dataBSBathtubs: response.data[0]})
        console.log(response.data[0])
    }
    getBSShowers = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/showers")
        this.setState({dataBSShowers: response.data[0]})
        console.log(response.data[0])
    }
    getBSTubShowers = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/tub_showers")
        this.setState({dataBSTubShowers: response.data[0]})
        console.log(response.data[0])
    }
    getBSMostBidetsState = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/most_bidets_state")
        this.setState({dataBSMostBidgetsState: response.data})
        console.log(response.data)
    }
    getBSMostBidetsPC = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/most_bidets_postalcode")
        this.setState({dataBSMostBidgetsPC: response.data})
        console.log(response.data)
    }
    getBSSingleBathroom = async () => {
        var response = await axios.get("http://localhost:8080/report/bathroom_statistics/single_bathroom")
        this.setState({dataBSSinglebathroom: response.data})
        console.log(response.data)
    }

    //Household averages by radius
    SearchRadius = async () => {
        var response1 = await axios.post("http://localhost:8080/report/check_postalcode", JSON.stringify({ 'PostalCode': this.state.postalCode }), this.config)
        var response2 = await axios.post("http://localhost:8080/report/household_avg_by_radius", JSON.stringify({'PostalCode': this.state.postalCode, 'Radius': this.state.radius}), this.config)
        console.log(response2.data)
        if (response1.data === false || response2.data.length===0) {
            notification["error"]({ message: "Please refill the  information!", duration: 15 })
        }
       
        else    
        {
                this.setState({
                dataSearchRadius: response2.data})
                console.log(response2.data)
            }
    }

    render() {
        return (
            <div>
                <div className="ViewReport">
                    <h1>View report</h1>
                    {
                        this.state.displayReportMenu ?
                            <div>
                                <h2>Menu</h2>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => {this.setState({ displayPopMF: true, displayReportMenu: false }); this.getTopManufacturers()}}>Top 25 popular manufacturers </button>  </ol>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => this.setState({ displayModelSearch: true, displayReportMenu: false })}>Manufacturer/model search </button>  </ol>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => {this.setState({ displayTV: true, displayReportMenu: false }); this.getTVSize()}}>Average TV display size by state </button>  </ol>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => {this.setState({ displayFridge: true, displayReportMenu: false }); this.getTopFridge(); this.getExtraFridge()}}>Extra fridge/freezer report </button>  </ol>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => {this.setState({ displayLaundry: true, displayReportMenu: false }); this.getWasherType(); this.getWasherOnly()}}>Laundry center report </button>  </ol>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => {this.setState({ displayBathroomStat: true, displayReportMenu: false }); 
                                this.getBSAllBathroom();this.getBSHalfBathroom();this.getBSFullBathroom();this.getBSCommodes();this.getBSSinks();this.getBSBidgets();
                                this.getBSBathtubs();this.getBSShowers();this.getBSTubShowers();this.getBSMostBidetsState();this.getBSMostBidetsPC(); this.getBSSingleBathroom();                    
                                                                                                                                      }}>Bathroom statistics </button>  </ol>
                                <ol><button style={{ color: "black", width: "500px", height: "30px", textAlign: "left" }} onClick={() => this.setState({ displayRadius: true, displayReportMenu: false })}>Household averages by radius </button>  </ol>
                                <p style={{ fontSize: "14px" }}><Link to='/'>Home Page</Link></p>
                            </div> : <div></div>
                    }

                    {
                        this.state.displayPopMF ?
                            <div>
                                <div className="Top25_ManufacturerReport">
                                    <h1>Top 25 popular manufacturers report </h1>
                                    <p><b>Top 25 popular manufacturers</b></p>
                                    <table className="Top25_ManufacturerReport">
                                        <thead>
                                            <tr>
                                                <th>Manufacturer</th>
                                                <th>Count of Appliance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.dataTopManufacturers.slice(0,25).map((r) => {
                                        return (
                                        <tr>
                                            <td>
                                                {r[0]}
                                            </td>
                                            <td>
                                                {r[1]}
                                            </td>
                                        </tr>
                                        )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="ApplianceType_Count">
                                    <p><b>Appliance Type and Count</b></p>
                                    Manufacturer:
                                    <Col span={6}>
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder="Select a manufacturer"
                                        optionFilterProp="children" //自动匹配输入
                                        onChange={(e) => this.setState({ selectedManufacturer: e })}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={this.state.manufacturer}
                                        /> 
                                     <button onClick={this.SearchApplianceByMF}>Submit</button> 
                                </Col>    
                                                         
                                    <table className="ApplianceType_Count">
                                        <thead>
                                            <tr>
                                                <th>ApplianceType</th>
                                                <th>Count of Appliance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {this.state.dataApplianceByMF.map((r) => {
                                        return (
                                        <tr>
                                            <td>
                                                {r[0]}
                                            </td>
                                            <td>
                                                {r[1]}
                                            </td>
                                        </tr>
                                        )
                                        })}
                                        </tbody>
                                    </table>
                                    <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayPopMF: false })}>Report menu </button>
                                </div>
                            </div> : <div></div>
                    }

                    {
                        this.state.displayModelSearch ?
                            <div>
                                <div className="ManufacturerModel_Search">
                                    <h1>Search Manufacturer/Model</h1>
                                    <p><b>You can enter a munufacturer name, or model name or both of them.</b></p>
                                    Manufacturer or Model Name:
                                    <input style={{ width: "100px" }} onChange={(e) => this.setState({ name: e.target.value })}
                                    ></input> &nbsp;
                                    <button style={{ color: "blue", width: "80px", height: "20px" }} onClick={this.SearchManufacturerModel}>Submit </button>
                                    <br></br>
                                    <p>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Manufacturer</th>
                                                    <th>Model</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.dataMFModel.map((sr) => {
                                            return (
                                        <tr>
                                            <td style={sr[0]?.toLowerCase().includes(this.state.name.toLowerCase())? {backgroundColor: 'lightgreen'}:{}}>
                                                {sr[0]}
                                            </td>
                                            <td style={sr[1]?.toLowerCase().includes(this.state.name.toLowerCase())? {backgroundColor: 'lightgreen'}:{}}>
                                                {sr[1]}
                                            </td>
                                        </tr>
                                        )
                                        })}      

                                            </tbody>
                                        </table>
                                        <br></br>
                                    </p>
                                    <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayModelSearch: false })}>Report menu </button>

                                </div>
                            </div> : <div></div>
                    }

                    {
                        this.state.displayTV ?
                            <div>
                                <div className="Avg_TVSize">
                                    <h1>Average TV Display Size by State</h1>
                                    <table className="Ave_TVSize">
                                        <thead>
                                            <th>State</th>
                                            <th>Average_Size</th>
                                        </thead>
                                        <tbody>
                                        {this.state.dataTVSize.map((r) => {
                                        return (
                                        <tr>
                                            <td>
                                                {r[0]}
                                            </td>
                                            <td>
                                                {r[1]}
                                            </td>
                                        </tr>
                                        )
                                        })}
                                        </tbody>
                                    </table>
                                    <p><b>You can choose the state, and find more TV information</b></p>
                                    <Col span={6}>
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder="Select a state"
                                        optionFilterProp="children" //自动匹配输入
                                        onChange={(e) => this.setState({ selectState: e })}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={this.state.stateChoice}
                                        /> 
                                     <button onClick={this.searchTVInfo}>Submit</button> 
                                    </Col>   
                                  
                                    <table className="TV_More_Info">
                                        <thead>
                                            <th>DisplayType</th>
                                            <th>MaxResolution</th>
                                            <th>AverageSize</th>
                                        </thead>
                                        <tbody>
                                        {this.state.dataTVByState.map((r) => {
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
                                        </tbody>
                                    </table>
                                </div>


                                <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayTV: false })}>Report menu </button>

                            </div> : <div></div>
                    }

                    {
                        this.state.displayFridge ?
                            <div>
                                <h1>Extra fridge/freezer report</h1>
                                <p style={{ fontSize: "18px" }}>Total households with more than one fridge or freezer: {(this.state.dataExtraFridge)}

                                                               
                                 </p> 
                                <table>
                                    <caption style={{ fontSize: "18px", textAlign: "left" }}>Top 10 states with multiple fridge/freezer</caption>
                                    <tr>
                                        <th>State</th>
                                        <th>Households #</th>
                                        <th>% with chest freezer</th>
                                        <th>% with upright freezer</th>
                                        <th>% with other freezer</th>
                                    </tr>
                                    {this.state.dataTopFridge.slice(0,10).map((r) => {
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
                                            <td>
                                                {r[3]}
                                            </td>
                                            <td>
                                                {r[4]}
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </table>
                                <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayFridge: false })}>Report menu </button>
                            </div> : <div> </div>
                    }

                    {
                        this.state.displayLaundry ?
                            <div>
                                <h1>Laundry Center report</h1>
                                <table>
                                    <caption style={{ fontSize: "18px", textAlign: "left" }}>Most common washer type and dryer heat source by state</caption>
                                    <tr>
                                        <th>State</th>
                                        <th>Washer type</th>
                                        <th>Heat source</th>
                                    </tr>
                                    {this.state.dataWasherType.map((r) => {
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
                                &nbsp;
                                <table>
                                    <caption style={{ fontSize: "18px", textAlign: "left" }}>Household with a washing machine but not a dryer</caption>
                                    <tr>
                                        <th>State</th>
                                        <th>Household count</th>
                                    </tr>
                                    {this.state.dataWasherOnly.map((r) => {
                                        return (
                                        <tr>
                                            <td>
                                                {r[0]}
                                            </td>
                                            <td>
                                                {r[1]}
                                            </td>
                                        </tr>
                                        )
                                    })}  
                             </table>
                                <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayLaundry: false })}>Report menu </button>
                            </div> : <div> </div>

                    }
                    {
                        this.state.displayBathroomStat ?
                            <div>
                                <h1>Bathroom statistics</h1>
                                <li> The minimum, average, and maximum count of all bathrooms per household:&nbsp;
                                {"MIN:" + this.state.dataBSAllBathroom[0] + ",  AVG:" + this.state.dataBSAllBathroom[1] + ",  MAX:" + this.state.dataBSAllBathroom[2] } </li>
                                <li> The minimum, average, and maximum count of half bathrooms per household:&nbsp;
                                {"MIN:" + this.state.dataBSHalfBathroom[0] + ",  AVG:" + this.state.dataBSHalfBathroom[1] + ",  MAX:" + this.state.dataBSHalfBathroom[2] } </li>
                                <li> The minimum, average, and maximum count of full bathrooms per household: &nbsp;
                                {"MIN:" + this.state.dataBSFullBathroom[0] + ",  AVG:" + this.state.dataBSFullBathroom[1] + ",  MAX:" + this.state.dataBSFullBathroom[2] }</li>
                                <li> The minimum, average, and maximum count of commodes per household:&nbsp;
                                {"MIN:" + this.state.dataBSCommodes[0] + ",  AVG:" + this.state.dataBSCommodes[1] + ", MAX:" + this.state.dataBSCommodes[2] } </li>
                                <li> The minimum, average, and maximum count of sinks per household:&nbsp;
                                {"MIN:" + this.state.dataBSSinks[0] + ",  AVG:" + this.state.dataBSSinks[1] + ",  MAX:" + this.state.dataBSSinks[2] } </li>
                                <li> The minimum, average, and maximum count of bidets per household:&nbsp;
                                {"MIN:" + this.state.dataBSBidgets[0] + ",  AVG:" + this.state.dataBSBidgets[1] + ",  MAX:" + this.state.dataBSBidgets[2] } </li>
                                <li> The minimum, average, and maximum count of bathtubs per household: &nbsp;
                                {"MIN:" + this.state.dataBSBathtubs[0] + ",  AVG:" + this.state.dataBSBathtubs[1] + ",  MAX:" + this.state.dataBSBathtubs[2] }</li>
                                <li> The minimum, average, and maximum count of showers per household: &nbsp;
                                {"MIN:" + this.state.dataBSShowers[0] + ",  AVG:" + this.state.dataBSShowers[1] + ",  MAX:" + this.state.dataBSShowers[2] }</li>
                                <li> The minimum, average, and maximum count of tub/showers per household:&nbsp;
                                {"MIN:" + this.state.dataBSTubShowers[0] + ",  AVG:" + this.state.dataBSTubShowers[1] + ",  MAX:" + this.state.dataBSTubShowers[2] }</li>
                                <li> Which state has the most bidets, and how many: &nbsp;
                                {"State:" + this.state.dataBSMostBidgetsState[0] + ",  Number:" + this.state.dataBSMostBidgetsState[1] }</li>
                                <li> Which postal code has the most bidets, and how many: &nbsp;
                                {"Postal Code:" + this.state.dataBSMostBidgetsPC[0] + ",  Number:" + this.state.dataBSMostBidgetsPC[1] }</li>
                                <li> How many households have only a single, primary bathroom, and no other bathrooms:&nbsp;
                                {this.state.dataBSSinglebathroom} </li>
                                <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayBathroomStat: false })}>Report menu </button>
                            </div> : <div> </div>
                    }

                    {
                        this.state.displayRadius ?
                            <div>
                                <h1>Household averages by radius</h1>
                                <p>Please enter five digit postal code to center the search on:
                                    <input style={{ width: "100px" }} onChange={(e) => this.setState({ postalCode: e.target.value })}></input>
                                </p>
                                <p><label>Please enter search radius:</label> &nbsp;
                                    <select name="SearchRadius" id="SearchRadius" onChange={(e) => this.setState({ radius: e.target.value })}>
                                        <option value="0">0</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="250">250</option>
                                    </select>  <input type="submit" value="Submit" onClick={this.SearchRadius}></input> </p>
                                <table>
                                    <caption style={{ fontSize: "18px", textAlign: "left" }}>Search by radius result</caption>
                                    <tr>
                                        <th>Postal code</th>
                                        <th>Search radius</th>
                                        <th>Bathroom per household</th>
                                        <th>Bedroom per household</th>
                                        <th>Occupant per household</th>
                                        <th>Commodes to occupants ratio</th>
                                        <th>Average # of appliance</th>
                                        <th>Most common heat source</th>
                                    </tr>
                                                                           
                                        <tr>
                                            <td>
                                                {this.state.dataSearchRadius[0]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[1]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[2]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[3]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[4]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[5]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[6]}
                                            </td>
                                            <td>
                                            {this.state.dataSearchRadius[7]}
                                            </td>

                                        </tr>
                                        
                                    

                                </table>
                                <button style={{ color: "blue", width: "120px", height: "30px" }} onClick={() => this.setState({ displayReportMenu: true, displayRadius: false })}>Report menu </button>
                            </div> : <div> </div>
                    }

                </div>

            </div>
        );
    }
}

