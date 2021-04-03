const toggleLoginOpen = (isLoginOpen: boolean) => ({ type: 'TOGGLE_LOGIN_OPEN', payload: isLoginOpen });

const loginUser = (name: string | null, userId: string | null) => ({
    type: 'LOGIN_USER',
    payload: {
        name,
        userId
    }
});

export { toggleLoginOpen, loginUser }