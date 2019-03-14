import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING} from '../actions/types';
import axios from 'axios';
//action creator
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
    .then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
    }));
};

export const addItem = newItem => dispatch => {
    axios.post('/api/items', newItem)
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data // render using API data
    }))
};

export const deleteItem = id => dispatch => {
    axios.delete('/api/items/' + id)
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id // render using internal state
    }))
}

export const setItemsLoading = () => {
    return {
        type: ITEM_LOADING
    }
}

