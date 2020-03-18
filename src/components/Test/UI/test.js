import React, { PureComponent } from "react";
import { connect } from 'react-redux';

import {
    incrementAction,
    decreaseAction,
    getUsers,
    getData,
    getGitData
} from '../Actions/actions';
//import { fetchUser } from '../Actions/epics';

class Test extends PureComponent {
    // constructor(props) {
    //     super(props);
    // }
    onClick = () => {
        this.props.handleGetUsers();
    }
    onClickRx = () => {
        this.props.handleGetUsersRx();
    }
    onClickgetGitUsers = () => {
        this.props.getGitUsersRx();
    }
    render() {
        const { value, incrementAction, decreaseAction, userData, gitUserData } = this.props;
        // console.log(gitUserData);
        return (
            <div>
                <h1>{value}</h1>
                <button onClick={incrementAction}>increment</button>
                <button onClick={decreaseAction}>decrease</button>
                <button onClick={this.onClick}>userData</button>
                <button onClick={this.onClickRx}>userDataRx</button>
                <button onClick={this.onClickgetGitUsers}>Git Users List</button>
                {
                    (userData !== undefined && Array.isArray(userData)) ?
                        Array.from(userData).map((i) => { return (<div>{i.id} {i.title}</div>) })
                        : <div></div>
                }
                {
                    (gitUserData !== undefined && Array.isArray(gitUserData)) &&
                        Array.from(gitUserData).map((i) => {return (<div key={i.login}>{i.id} <a href={i.html_url} rel="noopener noreferrer" target="_blank">{i.login}</a></div>) } )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.value,
    userData: state.userData,
    gitUserData: state.gitUserData
});

const mapDispatchToProps = dispatch => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
    handleGetUsers: () => dispatch(getUsers()),
    handleGetUsersRx: () => dispatch(getData()),
    getGitUsersRx: () => dispatch(getGitData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);