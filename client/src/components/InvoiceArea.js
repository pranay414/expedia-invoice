import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { calculateNetAmount } from '../redux/actions';

function mapStateToProps(state) {
    return {
        selectedItems: state.selectedItems,
        invoiceStatus: state.invoiceStatus,
        totalAmount: state.totalAmount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        calculateNetAmount: () => dispatch(calculateNetAmount())
    }
}

class InvoiceArea extends Component {
    render() {
        if (this.props.selectedItems.length === 0) {
            return (
                <div>
                    <h3>Invoice</h3>
                    <p>No items added to cart!</p>
                </div>
            )
        }
        return (
            <div>
                <h3>Invoice</h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Item</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.selectedItems.map((item) => {
                                return (
                                    <Table.Row key={item.id}>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.qty}</Table.Cell>
                                        <Table.Cell>{item.price}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                    <Table.Footer>
                        {this.props.invoiceStatus === true ? (<Table.Row>
                            <Table.HeaderCell colSpan='3'>Net Bill Amount:&nbsp;&nbsp;{this.props.totalAmount}</Table.HeaderCell>
                        </Table.Row>) : null}
                    </Table.Footer>
                </Table>
                <Button primary content='Generate Invoice' onClick={this.props.calculateNetAmount} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceArea);