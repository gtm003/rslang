const toggleSignUpOpen = (isSignUpOpen: boolean) => ({ type: 'TOGGLE_SIGN_UP_OPEN', payload: isSignUpOpen });

const signUpUser = (name: string | null, id: string | null, email: string | null) => ({
    type: 'SIGN_UP_USER',
    payload: {
        name,
        id,
        email
    }
});

export { toggleSignUpOpen, signUpUser }