import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import{ put, takeEvery } from 'redux-saga/effects';
import logger from 'redux-logger';
import App from './App';
import axios from 'axios';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

function* addPlantSaga(action) {
  yield axios({
    method: 'POST',
    url: '/api/plants',
    data: action.payload
  });

  yield put({
    type: 'FETCH_PLANT'
  });
}

function* fetchPlantSaga(action) {
  let response = yield axios({
    method: 'GET',
    url: '/api/plants'
  });

  yield put({
    type: 'SET_PLANT',
    payload: response.data
  })
}

function* watcherSaga() {
  yield takeEvery('ADD_PLANT', addPlantSaga);
  yield takeEvery('FETCH_PLANT', fetchPlantSaga);
}

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = startingPlantArray, action) => {
  if (action.type === 'SET_PLANT') {
    return action.payload;
  }

  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }

};

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
