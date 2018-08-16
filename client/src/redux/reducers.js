import * as types from './actionTypes';
import * as dotProp from 'dot-prop-immutable';

const initialState = {
    isLoading: null,

    btnStatus: true,
    itemQtyStatus: true,
    invoiceStatus: false,

    selectedItem: '',
    itemPrice: 0,
    selectedItems: [],
    itemId: '',

    noOfItems: 0,
    totalAmount: 0,

    data: '',
}

const reducer = (state = initialState, action) => {
    let rState = state;
    switch (action.type) {
        case types.FETCH_ITEMS:
            rState = dotProp.set(rState, `isLoading`, 1)
            return rState

        case types.FETCHED_ITEMS:
            rState = dotProp.set(rState, `isLoading`, 2)
            rState = dotProp.set(rState, `data`, action.data)
            return rState

        case types.FETCHING_ITEMS_FAILED:
            rState = dotProp.set(rState, `isLoading`, 0)
            return rState

        case types.SELECT_ITEM:
            let items = state.data.results
            for (let i = 0; i < items.length; i++) {
                if (action.id === items[i]._id) {
                    if(items[i].type === 'medical') {
                        rState = dotProp.set(rState, `itemPrice`, items[i].price)
                    }
                    else {
                        rState = dotProp.set(rState, `itemPrice`, items[i].price + 0.2 * items[i].price)
                    }
                    break
                }
            }
            rState = dotProp.set(rState, `selectedItem`, action.itemName)
            rState = dotProp.set(rState, `itemId`, action.id)
            rState = dotProp.set(rState, `itemQtyStatus`, false)
            return rState

        case types.SELECT_QTY:
            rState = dotProp.set(rState, `noOfItems`, action.qty)
            rState = dotProp.set(rState, `btnStatus`, false)
            return rState

        case types.ADD_ITEM:
            rState = dotProp.set(rState, `selectedItems`, itemsList => [...itemsList, { id: action.id, name: action.itemName, price: rState.itemPrice * rState.noOfItems, qty: rState.noOfItems }])
            rState = dotProp.set(rState, `btnStatus`, true)
            rState = dotProp.set(rState, `itemQtyStatus`, true)
            return rState

        case types.CALCULATE_NET_AMOUNT:
            let selectedItems = state.selectedItems
            var amount = 0
            selectedItems.forEach((item) => {
                amount += item.price
            })
            rState = dotProp.set(rState, `totalAmount`, amount)
            rState = dotProp.set(rState, `invoiceStatus`, true)
            return rState

        default:
            return state
    }
}

export default reducer;