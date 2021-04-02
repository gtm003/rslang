interface user {
    name: null | string,
    userId: null | string,
}

interface InitialState {
    isLoginOpen: boolean,
    user: user
}

interface Action {
    type: string,
    payload: any,
}

const initialState: InitialState = {
    isLoginOpen: false,
    user: {
        name: null,
        userId: null,
    }
}

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_LOGIN_OPEN':
            return { 
                ...state, 
                isLoginOpen: action.payload
            }
        case 'LOGIN_USER':
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    userId: action.payload.userId,
                }
            }
        default:
            return state;
    }
}

export { loginReducer };
