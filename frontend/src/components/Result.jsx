import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Result(props) {

    return (
        <div className="container">
            <ul>
                {
                    props.data.path.map(function (route) {
                        return (
                            <li style={{"fontSize":"1.25rem"}} key={route.city}>Take a {route.mode} from {route.city} for {route.to}</li>
                        );
                    })
                }
            </ul>
            <div>
                {props.data.duration ? <h5>You will finally reach <b>{props.data.path[props.data.path.length-1].to}</b> in <b>{props.data.duration.h} hours and {props.data.duration.m} minutes</b>!</h5>
                : <h5>You will finally reach <b>{props.data.path[props.data.path.length-1].to}</b> using <b>{props.data.cost} EURs</b>.</h5>}
                <a className="new" href="/">Find another route <i className="fas fa-arrow-circle-left"></i></a>
            </div>
            <div></div>
        </div>
    );
}

export default Result
