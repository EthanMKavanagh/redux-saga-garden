import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import{ put, takeEvery } from 'redux-saga/effects';
import logger from 'redux-logger';
import App from './App';
import axios from 'axios';


function* addPlantSaga(action) {
  yield axios({
    method: 'POST',
    url: '/api/plant',
    data: action.payload
  });

  yield put({
    type: 'FETCH_PLANTS'
  });
}

function* fetchPlantsSaga(action) {
  let response = yield axios({
    method: 'GET',
    url: '/api/plant'
  });

  yield put({
    type: 'SET_PLANTS',
    payload: response.data
  })
}

function* deletePlantSaga(action) {
  yield axios({
    method: 'DELETE',
    url: `/api/plant/${action.payload}`
  });

  yield put({
    type: 'FETCH_PLANTS'
  });
}

function* watcherSaga() {
  yield takeEvery('ADD_PLANT', addPlantSaga);
  yield takeEvery('FETCH_PLANTS', fetchPlantsSaga);
  yield takeEvery('DELETE_PLANT', deletePlantSaga);
}

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = [], action) => {
  if (action.type === 'SET_PLANTS') {
    return action.payload;
  }
  return state;
};

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
