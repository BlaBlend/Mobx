import { reducer, initState, actionTypes } from 'reducers/user'

describe('user reducer', () => {
  it(actionTypes.SET, () => {
    const action = {
      type: actionTypes.SET,
      payload: { test: true },
    }

    expect(reducer(initState, action)).toEqual(action.payload)
  })

  it(actionTypes.UNSET, () => {
    const action = { type: actionTypes.UNSET }

    expect(reducer({ test: true }, action)).toEqual(initState)
  })
})
