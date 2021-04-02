interface InitialState {
    isSignUpOpen: boolean,
}

interface Action {
    type: string,
    payload: any,
}

const initialState: InitialState = {
    isSignUpOpen: false,
}

const signupReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_SIGN_UP_OPEN':
            return { 
                ...state, 
                isSignUpOpen: action.payload
            }
        default:
            return state;
    }
}

export { signupReducer };