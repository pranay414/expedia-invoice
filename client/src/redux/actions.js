import * as types from './actionTypes';

export const getItems = () => (dispatch, getState, { api }) => {
    dispatch({ type: types.FETCH_ITEMS })
    return api.get('getItems')
        .then(data => {
            dispatch({ type: types.FETCHED_ITEMS, data: data})
            return data
        })
        .catch(() => dispatch({ type: types.FETCHING_ITEMS_FAILED }))
};

export const selectItem = (itemName, id) => ({type: types.SELECT_ITEM, itemName, id});

export const addItem = (itemName, id) => ({type: types.ADD_ITEM, itemName, id});

export const selectQty = (qty) => ({type: types.SELECT_QTY, qty});

export const calculateNetAmount = () => ({type: types.CALCULATE_NET_AMOUNT});