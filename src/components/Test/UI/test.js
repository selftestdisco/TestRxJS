import React, { PureComponent } from "react";
import { connect } from 'react-redux';

import {
    incrementAction,
    decreaseAction,
    getUsers,
    getData
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
    render() {
        const { value, incrementAction, decreaseAction, userData } = this.props;
        return (
            <div>
                <h1>{value}</h1>
                <button onClick={incrementAction}>increment</button>
                <button onClick={decreaseAction}>decrease</button>
                <button onClick={this.onClick}>userData</button>
                <button onClick={this.onClickRx}>userDataRx</button>
                {
                    (userData !== undefined && Array.isArray(userData)) ?
                        Array.from(userData).map((i) => { return (<div>{i.id} {i.title}</div>) })
                        : <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.value,
    userData: state.userData
});

const mapDispatchToProps = dispatch => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
    handleGetUsers: () => dispatch(getUsers()),
    handleGetUsersRx: () => dispatch(getData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);