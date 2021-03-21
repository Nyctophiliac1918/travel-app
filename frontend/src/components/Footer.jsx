import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
    return (
        <MDBFooter id="">
            <MDBContainer fluid className="text-center text-md-left upper">
                <MDBRow>
                <MDBCol>
                    <h4 className="title">Happy Travelling!</h4>
                    <p>
                    Always finding the best routes for you.
                    </p>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer fluid className="down">
                &copy; {new Date().getFullYear()} Copyright: <a target="_blank" rel="noreferrer" href="https://profile-karan-saraswat.netlify.app/"> Karan Saraswat </a>
            </MDBContainer>
        </MDBFooter>
    );
}

export default Footer;