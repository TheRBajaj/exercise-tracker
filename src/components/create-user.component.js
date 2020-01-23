import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        //prevents default html submit behaviour
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        //test
        console.log(user);

        //connect user front end to back end using axios
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));


        //stay on the same page after creating a user
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;