import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class PlantList extends Component {
    componentDidMount() {
        // use component did mount to dispatch an action to request the plantList from the API
        this.props.dispatch({
            type: 'FETCH_PLANTS'
        });
    }

    onDelete = (id) => {
        this.props.dispatch({
            type: 'DELETE_PLANT',
            payload: id
        });
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                {this.props.reduxState.plantList.map(plant =>
                    <li key={plant.id}>{plant.name}
                        <button onClick={() => this.onDelete(plant.id)}>Delete</button>
                    </li>
                )}
                {/* <pre>{JSON.stringify(this.props.reduxState)}</pre> */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantList);