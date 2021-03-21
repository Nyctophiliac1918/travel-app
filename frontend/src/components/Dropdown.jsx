import React from "react";
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from "./Result";

export default class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectOptions : []
        }
    }

    async getOptions(){
        const res = await axios.get('http://localhost:8081/places')
        const data = res.data;
    
        const options = data.map(d => ({
        "value" : d.city,
        "label" : d.city
        }))
    
        this.setState({selectOptions: options})
    }

    componentDidMount(){
        this.getOptions()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <Select options={this.state.selectOptions} onChange={this.handleChangeSrc.bind(this)} placeholder="Select Source" />
                    </div>
                    <div className="col-sm-4"><i class="fas fa-arrow-right fa-2x"></i></div>
                    <div className="col-sm-4">
                        <Select options={this.state.selectOptions} onChange={this.handleChangeDest.bind(this)} placeholder="Select Destination" />
                    </div>
                </div>
            </div>
        )
    }

}