const toggleLoginOpen = (isLoginOpen: boolean) => ({ type: 'TOGGLE_LOGIN_OPEN', payload: isLoginOpen });

const loginUser = (name: string, userId: string) => ({
    type: 'LOGIN_USER',
    payload: {
        name,
        userId
    }
});

export { toggleLoginOpen, loginUser }