interface InitialState {
    isLoginOpen: boolean,
}

interface Action {
    type: string,
    payload: any,
}

const initialState: InitialState = {
    isLoginOpen: false,
}

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_LOGIN_OPEN':
            return { 
                ...state, 
                isLoginOpen: action.payload
            }
        default:
            return state;
    }
}

export { loginReducer };
