import { Button, Checkbox, Col, Divider, Input, notification, Radio, Row, Select, Space } from "antd";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { isThisTypeNode } from "typescript";
import "./Appliance.css";

interface IAppliance {
    email: string;
    manufacturer: { value: string, label: string }[];
    applianceNo: number;
    displayList: boolean[];
    selectedManufacturer: string;
    modelName: string;
    cookerType: string[];
    ovenType: string;
    ovenHeatSource: string[];
    cooktopHeatSource: string;
    TVType: string;
    TVSize: number;
    TVResolution: string;
    freezerType: string;
    washerLoadingType: string;
    dryerHeatSource: string;
    displayApplianceList: boolean;
    applianceList: {type: string, order: string, manufacturer: string, modelName: string}[];
    displayAddAppliance: boolean;
    }

const windowUrl = window.location.search;
const params = new URLSearchParams(windowUrl);
const emailInput = params.get("email")
export class Appliance extends React.Component<{}, IAppliance> {
    state: IAppliance = {
        email: "",
        manufacturer: [],
        applianceNo: 1,
        displayList: [false, false, false, false, false],
        selectedManufacturer: "",
        modelName: "",
        cookerType: [],
        ovenType: "",
        ovenHeatSource: [],
        cooktopHeatSource: "",
        TVType: "",
        TVSize: 0,
        TVResolution: "",
        freezerType: "",
        washerLoadingType: "",
        dryerHeatSource: "",
        displayApplianceList: false,
        applianceList: [],
        displayAddAppliance: true
         }

    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    async componentDidMount() {
        var response = await axios.get("http://localhost:8080/appliance/getmanufacturer")
        var list: { value: string, label: string }[] = []
        response.data.map((m: any) => list.push({ value: m["manufacturerName"], label: m["manufacturerName"] }))
        this.setState({
            email: emailInput == null ? "" : emailInput,
            manufacturer: list
        })
    }

    handleDisplayList = (index: string) => {
        var defaultList = [false, false, false, false, false]
        defaultList[Number(index)] = true
        this.setState({ displayList: defaultList })
    }

    submitCooker = async () => {
        if (this.state.selectedManufacturer === "") {
            notification["error"]({ message: "Please select manufacturer!" })
        }
        else if (this.state.cookerType.length === 0) {
            notification["error"]({ message: "Please select cooker types!" })
        }
        else if (this.state.cookerType.indexOf("oven") !== -1 && (this.state.ovenHeatSource.length === 0 || this.state.ovenType === "")) {
            notification["error"]({ message: "Please fill in required oven parameters!" })
        }
        else if (this.state.cookerType.indexOf("cooktop") !== -1 && this.state.cooktopHeatSource === "") {
            notification["error"]({ message: "Please fill in required cooktop parameters!" })
        }
        else {
            var response = await axios.post(
                "http://localhost:8080/appliance/cooker",
                JSON.stringify({
                    "Email": this.state.email,
                    "Order": this.state.applianceNo,
                    "ModelName": this.state.modelName,
                    "Manufacturer": this.state.selectedManufacturer,
                    "Type": "cooker",
                    "CookerType": this.state.cookerType,
                    "OvenType": this.state.ovenType,
                    "OvenHeatSource": this.state.ovenHeatSource,
                    "CooktopHeatSource": this.state.cooktopHeatSource
                }),
                this.config
            )
            this.setState({ applianceNo: this.state.applianceNo += 1 })
            this.requestApplianceList()
        }
    }

    submitTV = async () => {
        if (this.state.selectedManufacturer === "") {
            notification["error"]({ message: "Please select manufacturer!" })
        }
        else if (this.state.TVType === "" || this.state.TVSize === 0 || this.state.TVResolution === "") {
            notification["error"]({ message: "Please fill in required TV parameters!" })
        }
        else {
            var response = await axios.post(
                "http://localhost:8080/appliance/TV",
                JSON.stringify({
                    "Email": this.state.email,
                    "Order": this.state.applianceNo,
                    "ModelName": this.state.modelName,
                    "Manufacturer": this.state.selectedManufacturer,
                    "Type": "TV",
                    "DisplayType": this.state.TVType,
                    "Maxresolution": this.state.TVResolution,
                    "Size": this.state.TVSize
                }),
                this.config
            )
            this.setState({ applianceNo: this.state.applianceNo += 1 })
            this.requestApplianceList()
        }
    }

    submitFreezer = async () => {
        if (this.state.selectedManufacturer === "") {
            notification["error"]({ message: "Please select manufacturer!" })
        }
        else if (this.state.freezerType === "") {
            notification["error"]({ message: "Please select freezer type!" })
        }
        else {
            var response = await axios.post(
                "http://localhost:8080/appliance/refrigeratorfreezer",
                JSON.stringify({
                    "Email": this.state.email,
                    "Order": this.state.applianceNo,
                    "ModelName": this.state.modelName,
                    "Manufacturer": this.state.selectedManufacturer,
                    "Type": "freezer",
                    "SubType": this.state.freezerType
                }),
                this.config
            )
            this.setState({ applianceNo: this.state.applianceNo += 1 })
            this.requestApplianceList()
        }

    }

    submitWasher = async () => {
        if (this.state.selectedManufacturer === "") {
            notification["error"]({ message: "Please select manufacturer!" })
        }
        else if (this.state.washerLoadingType === "") {
            notification["error"]({ message: "Please select loading type!" })
        }
        else {
            var response = await axios.post(
                "http://localhost:8080/appliance/washer",
                JSON.stringify({
                    "Email": this.state.email,
                    "Order": this.state.applianceNo,
                    "ModelName": this.state.modelName,
                    "Manufacturer": this.state.selectedManufacturer,
                    "Type": "washer",
                    "LoadingType": this.state.washerLoadingType
                }),
                this.config
            )
            this.setState({ applianceNo: this.state.applianceNo += 1 })
            this.requestApplianceList()
        }
    }

    submitDryer = async () => {
        if (this.state.selectedManufacturer === "") {
            notification["error"]({ message: "Please select manufacturer!" })
        }
        else if (this.state.dryerHeatSource === "") {
            notification["error"]({ message: "Please select heat source!" })
        }
        else {
            var response = await axios.post(
                "http://localhost:8080/appliance/dryer",
                JSON.stringify({
                    "Email": this.state.email,
                    "Order": this.state.applianceNo,
                    "ModelName": this.state.modelName,
                    "Manufacturer": this.state.selectedManufacturer,
                    "Type": "dryer",
                    "HeatSource": this.state.dryerHeatSource
                }),
                this.config
            )
            this.setState({ applianceNo: this.state.applianceNo += 1 })
            this.requestApplianceList()
        }
    }

    handleCookerType = (type: string, event: any) => {
        var list = this.state.cookerType
        if (event.target.checked) {
            list.push(type)
        }
        else {
            list.splice(list.indexOf(type), 1)
        }
        this.setState({ cookerType: list })
    }

    handleOvenHeatSource = (e: any) => {
        var list: string[] = []
        e.forEach((i: string) => {
            list.push(i)
        })
        this.setState({ ovenHeatSource: list })
    }

    requestApplianceList = async () => {
        this.setState({displayList:[false,false,false,false,false]})
        var response = await axios.post("http://localhost:8080/appliance", JSON.stringify({ "email": this.state.email }), this.config)
        this.setState({ 
            applianceList: response.data,
            displayAddAppliance: false,
            displayApplianceList: true, 
        })
    }

    render() {
        return (
            <div>
                <div className="appliance">
                <h1> Add appliance </h1>
                    {
                        this.state.displayAddAppliance ?
                            <div>
                                <h2> Please provide the details for the appliance. </h2>
                                <div className="appliance_header">
                                    <div>
                                        <Row justify="start">
                                            <Col span={3}>
                                                <span>Appliance type:</span>
                                            </Col>
                                            <Col span={6}>
                                                <Select
                                                    style={{ width: '100%' }}
                                                    placeholder="Select an appliance type"
                                                    optionFilterProp="children"
                                                    onChange={(e) => this.handleDisplayList(e)}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={[
                                                        {
                                                            value: 0,
                                                            label: 'Cooker'
                                                        },
                                                        {
                                                            value: 1,
                                                            label: 'TV'
                                                        },
                                                        {
                                                            value: 2,
                                                            label: 'Freezer/Fridge'
                                                        },
                                                        {
                                                            value: 3,
                                                            label: 'Washer'
                                                        },
                                                        {
                                                            value: 4,
                                                            label: 'Dryer'
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                        <Row justify="start">
                                            <Col span={3}>
                                                <span>Manufacturer:</span>
                                            </Col>
                                            <Col span={6}>
                                                <Select
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    placeholder="Select a manufacturer"
                                                    optionFilterProp="children"
                                                    onChange={(e) => this.setState({ selectedManufacturer: e })}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={this.state.manufacturer}
                                                />
                                            </Col>
                                        </Row>
                                        <Row justify="start">
                                            <Col span={3}>
                                                <span>Model name:</span>
                                            </Col>
                                            <Col span={6}>
                                                <Input type="text" name="modelname" onChange={(e) => this.setState({ modelName: e.target.value })}></Input>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider></Divider>
                                </div> 
                            </div> : <div></div>
                    }
                    {
                        // Cooker
                        this.state.displayList[0] ?
                            <div>
                                <Row>
                                    <Col span={10}>
                                        <Checkbox onClick={(e) => this.handleCookerType('oven', e)}>Oven</Checkbox>

                                        <h3>Heat source</h3>
                                        <Checkbox.Group className="cooker_checkbox" style={{ display: 'grid' }} options={[{ label: "Gas", value: "Gas" }, { label: "Electric", value: "Electric" }, { label: "Microwave", value: "Microwave" }]} onChange={this.handleOvenHeatSource} />
                                        <h3>Type:</h3>
                                        <Select
                                            style={{ width: '50%' }}
                                            placeholder="Select oven type"
                                            optionFilterProp="children"
                                            onChange={(e) => this.setState({ ovenType: e })}
                                            options={[
                                                {
                                                    value: 'convection',
                                                    label: 'Convection'
                                                },
                                                {
                                                    value: 'conventional',
                                                    label: 'Conventional'
                                                }
                                            ]}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <Checkbox onClick={(e) => this.handleCookerType('cooktop', e)}>Cooktop</Checkbox>
                                        <h3>Heat source</h3>
                                        <Select
                                            style={{ width: '50%' }}
                                            placeholder="Select oven type"
                                            optionFilterProp="children"
                                            onChange={(e) => this.setState({ cooktopHeatSource: e })}
                                            options={[
                                                {
                                                    value: 'gas',
                                                    label: 'Gas'
                                                },
                                                {
                                                    value: 'electric',
                                                    label: 'Electric'
                                                },
                                                {
                                                    value: 'radiant electric',
                                                    label: 'Radiant electric'
                                                },
                                                {
                                                    value: 'induction',
                                                    label: 'Induction'
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                                <Divider />
                                <Button type="primary" onClick={this.submitCooker}>Submit</Button>
                            </div> : <div></div>
                    }
                    {
                        // TV
                        this.state.displayList[1] ?
                            <div>
                                <Row justify="start">
                                    <Col span={2}>
                                        <span>Display type:</span>
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="Select TV type"
                                            optionFilterProp="children"
                                            onChange={(e) => this.setState({ TVType: e })}
                                            options={[
                                                {
                                                    value: 'tube',
                                                    label: 'tube'
                                                },
                                                {
                                                    value: 'DLP',
                                                    label: 'DLP'
                                                },
                                                {
                                                    value: 'plasma',
                                                    label: 'plasma'
                                                },
                                                {
                                                    value: 'LCD',
                                                    label: 'LCD'
                                                },
                                                {
                                                    value: 'LED',
                                                    label: 'LED'
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col span={2}>
                                        <span>Display size (inches):</span>
                                    </Col>
                                    <Col span={6}>
                                        <Input type="float" name="displaysize" onChange={(e) => this.setState({ TVSize: Number(e.target.value) })}></Input>
                                    </Col>
                                </Row>
                                <Row justify="start">
                                    <Col span={2}>
                                        <span>Maximum resolution:</span>

                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="Select TV resolution"
                                            optionFilterProp="children"
                                            onChange={(e) => this.setState({ TVResolution: e })}
                                            options={[
                                                {
                                                    value: '480i',
                                                    label: '480i'
                                                },
                                                {
                                                    value: '576i',
                                                    label: '576i'
                                                },
                                                {
                                                    value: '720p',
                                                    label: '720p'
                                                },
                                                {
                                                    value: '1080i',
                                                    label: '1080i'
                                                },
                                                {
                                                    value: '1440p',
                                                    label: '1440p'
                                                },
                                                {
                                                    value: '2160p (4K)',
                                                    label: '2160p (4K)'
                                                },
                                                {
                                                    value: '4320p (8K)',
                                                    label: '4320p (8K)'
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Button type="primary" onClick={this.submitTV}>Submit</Button>
                                </Row>
                            </div> : <div></div>
                    }
                    {
                        // Freezer
                        this.state.displayList[2] ?
                            <div>
                                <Row>
                                    <Col span={3}>
                                        <span>Refrigerator/freezer:</span>
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="Select freezer type"
                                            optionFilterProp="children"
                                            onChange={(e) => this.setState({ freezerType: e })}
                                            options={[
                                                {
                                                    value: 'Bottom freezer refrigerator',
                                                    label: 'Bottom freezer refrigerator'
                                                },
                                                {
                                                    value: 'French door refrigerator',
                                                    label: 'French door refrigerator'
                                                },
                                                {
                                                    value: 'Side-by-side refrigerator',
                                                    label: 'Side-by-side refrigerator'
                                                },
                                                {
                                                    value: 'Top freezer refrigerator',
                                                    label: 'Top freezer refrigerator'
                                                },
                                                {
                                                    value: 'Chest freezer',
                                                    label: 'Chest freezer'
                                                },
                                                {
                                                    value: 'Upright freezer',
                                                    label: 'Upright freezer'
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Button type="primary" onClick={this.submitFreezer}>Submit</Button>
                                </Row>
                            </div> : <div></div>
                    }
                    {
                        // Washer
                        this.state.displayList[3] ?
                            <div>
                                <h3>The loading type:</h3>

                                <Radio.Group onChange={(e) => this.setState({ washerLoadingType: e.target.value })}>
                                    <Space direction="vertical">
                                        <Radio value={"top"}>Top</Radio>
                                        <Radio value={"front"}>Front</Radio>
                                    </Space>
                                </Radio.Group>
                                <Divider />
                                <Row>
                                    <Button type="primary" onClick={this.submitWasher}>Submit</Button>
                                </Row>
                            </div> : <div></div>
                    }
                    {
                        // Dryer
                        this.state.displayList[4] ?
                            <div>
                                <h3>Heat source:</h3>
                                <Radio.Group onChange={(e) => this.setState({ dryerHeatSource: e.target.value })}>
                                    <Space direction="vertical">
                                        <Radio value={"Gas"}>Gas</Radio>
                                        <Radio value={"Electric"}>Electric</Radio>
                                        <Radio value={"None"}>None</Radio>
                                    </Space>
                                </Radio.Group>
                                <Divider />
                                <Row>
                                    <Button type="primary" onClick={this.submitDryer}>Submit</Button>
                                </Row>
                            </div> : <div></div>
                    }
                    {
                        this.state.displayApplianceList ?
                            <div>
                                <h2>You have added the following appliances to your household:</h2>
                                <table>
                                    <tr>
                                        <th>Appliance #</th>
                                        <th>Type</th>
                                        <th>Manufacturer</th>
                                        <th>Model</th>
                                    </tr>
                                    {this.state.applianceList.map((r) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {r['order']}
                                                </td>
                                                <td>
                                                    {r['type']}
                                                </td>
                                                <td>
                                                    {r['manufacturer']}
                                                </td>
                                                <td>
                                                    {r['modelName']}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <p><button style={{ color: "blue", width: "250px", height: "30px" }} onClick={() => this.setState({ displayAddAppliance: true, displayApplianceList: false })}>+Add another appliance </button>
                                <p style={{ fontSize: "14px" }}><Link to='/FinalPage'>Next</Link></p>
                                </p>
                            </div> : <div></div>
                     }
                     </div>        
            </div>
        );
    }
}

