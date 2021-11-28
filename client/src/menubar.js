import React from 'react';
const { Navbar, Container, Nav, Button } = require("react-bootstrap")

const IconButton = () => {
    return (
        <button className='btn btn-success my-2 my-sm-0'>Login with Twitch</button>
    );
};

function Menu() {

    return (
        <div>
            <Navbar className='navbar navbar-expand-lg navbar-light bg-light' expand="lg">
                <Container>
                    <Navbar.Brand href="/" >Twitch Promoted</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Navbar.Collapse>
                    <IconButton />
                </Container>
            </Navbar>
        </div>
    );
}

export default Menu;