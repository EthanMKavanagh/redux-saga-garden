import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class NewPlantForm extends Component {
    state = {
        newPlant: {
            id: 4,
            name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: ''
        }
    }

    handleChangeFor = (event, propertyName) => {
        console.log('event happended')
        this.setState({
            newPlant: {
                ...this.state.newPlant,
                [propertyName]: event.target.value
            }
        });
    }

    addNewPlant = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant })
        this.setState({
            newPlant: {
                id: this.state.newPlant.id + 1,
                name: '',
                kingdom: '',
                clade: '',
                order: '',
                family: '',
                subfamily: '',
                genus: ''
            }
        });
    }

    render() {
        return (
            <div>
                <h3>This is the form</h3>
                <pre>{JSON.stringify(this.state)}</pre>
                <form onSubmit={this.addNewPlant}>
                    <input placeholder='name' type='text' value={this.state.newPlant.name} onChange={(event) => this.handleChangeFor(event, 'name')} />
                    <input placeholder='kingdom' type='text' value={this.state.newPlant.kingdom} onChange={(event) => this.handleChangeFor(event, 'kingdom')} />
                    <input placeholder='clade' type='text' value={this.state.newPlant.clade} onChange={(event) => this.handleChangeFor(event, 'clade')} />
                    <input placeholder='order' type='text' value={this.state.newPlant.order} onChange={(event) => this.handleChangeFor(event, 'order')} />
                    <input placeholder='family' type='text' value={this.state.newPlant.family} onChange={(event) => this.handleChangeFor(event, 'family')} />
                    <input placeholder='subfamily' type='text' value={this.state.newPlant.subfamily} onChange={(event) => this.handleChangeFor(event, 'subfamily')} />
                    <input placeholder='genus' type='text' value={this.state.newPlant.genus} onChange={(event) => this.handleChangeFor(event, 'genus')} />
                    <input type='submit' value='Add New Plant' />
                </form>
            </div>
        );
    }
}


export default connect(mapStateToProps)(NewPlantForm);
