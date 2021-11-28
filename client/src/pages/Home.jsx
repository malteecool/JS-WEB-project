import React, { Component } from "react";


class Home extends Component {

    state = {
        data: null
    };

    componentDidMount() {
        this.callbackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    callbackendAPI = async () => {
        const response = await fetch('/test');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    render() {
        return (
            <div>
                <p>{this.state.data}</p>
            </div>
        )
    }

}

export default Home;