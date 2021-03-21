import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from "./Result";
import Footer from "./Footer";
import Radio from "./Radio";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectOptions : [],
      src: "",
      dest: "",
      choice: "Fastest",
      data : null,
      errMessage: ""
    };
  }

  handleChangeSrc(e){
      this.setState({src:e.value})
      //console.log(this.state);
  }

  handleChangeDest(e){
      this.setState({dest:e.label})
      //console.log(this.state);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { src, dest, choice } = this.state;

    const route = {
      src,
      dest,
      choice
    };

    axios
      .post('https://back-travel-app.herokuapp.com/find-route', route)
      .then((res) => {
        this.setState({data:res.data})
      })
      .catch(err => {
        this.setState({errMessage:err.message});
      });
  };

  async getOptions(){
    const res = await axios.get('https://back-travel-app.herokuapp.com/places')
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
    //console.log(REACT_APP_BACKEND_URL);
    return (
      <div>
        <div className="heading">
          <h1>Travel App</h1>
        </div>
        {
          this.state.data ? <Result data={this.state.data} />
          : <div>
            <form onSubmit={this.handleSubmit}>
              <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <Select options={this.state.selectOptions} onChange={this.handleChangeSrc.bind(this)} placeholder="Select Source" />
                    </div>
                    <div className="col-sm-4"><i className="fas fa-arrow-right fa-2x"></i></div>
                    <div className="col-sm-4">
                        <Select options={this.state.selectOptions} onChange={this.handleChangeDest.bind(this)} placeholder="Select Destination" />
                    </div>
                </div>
              </div>
              <Radio choice={this.handleChange} />
              <div className="container">
                <button className="btn btn-primary btn-dark btn-lg" type="submit">Find Route</button>
              </div>
            </form>
            <br />
            { this.state.errMessage && <h6 className="error" style={{"color":"red"}}> Either the source and destination are same, or they are not chosen. </h6>}
          </div>
        }
        <Footer />
      </div>
    );
  }
}