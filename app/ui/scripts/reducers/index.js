'use strict'

import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import { data as dataUtils } from '../utils'
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_ACTIVE_PUBLISHER,
  REQUEST_ACTIVE_PUBLISHER
} from '../actions'

function ui(state = {
  isFetching: false,
  tableHeaders: {
    main: [
      {key: 'title', label: 'שם הגוף'},
      {key: 'type', label: 'סוג'},
      //{key: 'homepage'},
      //{key: 'email'},
      //{key: 'completelyCorrect', label: 'Valid files',
      //help: 'number of files with no errors at all'},
      {key: 'score', label: 'הציון הממוצע, מתייחס גם לקבצים חסרים'},
      {key: 'lastFileDate', label: 'הדו״ח האחרון'},
      {key: 'lastFileScore', label: 'הציון של הדו״ח האחרון'}
    ],
    publisher: [
      {key:'period_id', label:'תקופה'},
      {key:'title', label:"כותרת"},
      {key:'data', label:'קישור לדו״ח'},
      /*{key:'format'},*.
      /*{key:'report', label:'Error details'},*/
      {key:'score', label:"ציון הדו״ח"}//,
      /*{key:'schema'}*/
    ]
  },
  tableSorters: {
    main: [
      ['score', false],
      ['title', true]
    ],
    publisher: [
      ['periodTimestamp', false],
      ['score', false]
    ]
  }
}, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case REQUEST_ACTIVE_PUBLISHER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false
      })
    case RECEIVE_ACTIVE_PUBLISHER:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function data(state = {
  isEmpty: true,
  instance: {},
  publishers: [],
  sources: [],
  results: [],
  runs: [],
  performance: [],
  activePublisher: {}
}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, action.payload, { isEmpty: false })
    case RECEIVE_ACTIVE_PUBLISHER:
      return Object.assign({}, state, action.payload, { isEmpty: false })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  router: routerStateReducer,
  ui,
  data
})

export default rootReducer
