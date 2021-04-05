import { reducer, initState, actionTypes } from 'reducers/users'

describe('users reducer', () => {
  it(actionTypes.SET, () => {
    const action = {
      type: actionTypes.SET,
      payload: { test: true },
    }

    expect(reducer(initState, action)).toEqual({
      users: action.payload,
    })
  })

  it(actionTypes.UNSET, () => {
    const action = { type: actionTypes.UNSET }
    const stateWithContent = {
      users: [{ test: true }],
    }

    expect(reducer(stateWithContent, action)).toEqual(initState)
  })
})
