import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { selectItem, addItem, selectQty } from '../redux/actions';

function mapStateToProps(state) {
    return {
        items: state.data,
        selectedItem: state.selectedItem,
        itemId: state.itemId,
        btnStatus: state.btnStatus,
        qtyStatus: state.itemQtyStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectItem: (name, id) => dispatch(selectItem(name, id)),
        addItem: (name, id) => dispatch(addItem(name, id)),
        selectQty: (qty) => dispatch(selectQty(qty))
    }
}

class ItemList extends Component {

    handleItemChange = (e, data) => {
        const { value } = data
        const { key } = data.options.find(o => o.value === value)
        this.props.selectItem(value, key)
    }

    handleQtyChange = (e, data) => {
        const { value } = data
        this.props.selectQty(value)
    }

    handleClick = (e, data) => {
        this.props.addItem(this.props.selectedItem, this.props.itemId)
    }

    render() {
        // Get the list of items from DB
        let itemOptions = [];
        const quantity = [{ key: 1, value: 1, text: '1' }, { key: 2, value: 2, text: '2' },
        { key: 3, value: 3, text: '3' }, { key: 4, value: 4, text: '4' },
        { key: 5, value: 5, text: '5' }, { key: 6, value: 6, text: '6' }];
        const fillOptions = () => this.props.items.results.map((item) => {
            itemOptions.push({ key: item._id, value: item.label, text: item.label })
        });
        fillOptions();

        // Render the component with list of items
        return (
            <div>
                <h3 style={{ marginLeft: '2em' }}>Select Items:</h3>
                <Dropdown placeholder='Item' selection style={{ marginLeft: '2em' }} options={itemOptions} onChange={this.handleItemChange} />
                <Dropdown placeholder='Quantity' selection style={{ marginLeft: '1em' }} options={quantity} onChange={this.handleQtyChange} disabled={this.props.qtyStatus}/>
                <Button content='Add Item' primary style={{ marginLeft: '1em' }} onClick={this.handleClick} disabled={this.props.btnStatus}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);