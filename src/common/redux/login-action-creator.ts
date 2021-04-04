const toggleLoginOpen = (isLoginOpen: boolean) => ({ type: 'TOGGLE_LOGIN_OPEN', payload: isLoginOpen });

const loginUser = (name: string | null, userId: string | null, photo: string | null) => ({
    type: 'LOGIN_USER',
    payload: {
        name,
        userId,
        photo
    }
});

export { toggleLoginOpen, loginUser }