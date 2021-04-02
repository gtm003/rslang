interface InitialState {
    isOpen: boolean,
}

interface Action {
    type: string,
    payload: any,
}

const initialState: InitialState = {
    isOpen: false,
}

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_OPEN':
            return { 
                ...state, 
                isOpen: action.payload
            }
        default:
            return state;
    }
}

export { loginReducer };
