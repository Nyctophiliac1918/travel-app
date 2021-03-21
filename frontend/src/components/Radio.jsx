import React from 'react';

function Radio(props) {
    return (
        <div className="container co" id="btnp">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2">
                    <input type="radio" name="choice" value="Fastest" onChange={props.choice} /> Fastest
                </div>
                <div className="col-sm-2">
                <input type="radio" name="choice" value="Cheapest" onChange={props.choice} /> Cheapest
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}

export default Radio;