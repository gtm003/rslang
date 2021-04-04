import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../common/redux/login-action-creator';
import { setSignUpError, signUpUser, toggleSignUpOpen } from '../../common/redux/signup-action-creator';
import { urlBackend } from '../../data';
import { FileInput } from './fileinput';

interface SignUpProps {
    isSignUpOpen: boolean,
    handleSubmit: any,
    error: string | null,
    toggleSignUpOpen: (isSignUpOpen: boolean) => void,
    signUpUser: (name: string | null, id: string | null, email: string | null, photo: string | null) => void,
    loginUser: (name: string | null, userId: string | null, photo: string | null) => void,
    setSignUpError: (error: string | null) => void,
}

// interface submitValues {
//     name: string,
//     email: string,
//     password: string,
// }

const SignUpForm: React.FC<SignUpProps> = ({ isSignUpOpen, handleSubmit, error, toggleSignUpOpen, signUpUser, loginUser, setSignUpError }) => {
    const submit = async (values: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(values.photo);
        reader.onload = async () => {
            values.photo = reader.result;
            console.log(typeof reader.result);
            const response = await fetch(`${urlBackend}users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const content = await response.json();
            if (content.error) {
                setSignUpError(content.error.errors[0].message);
            } else {
                setSignUpError(null);
                signUpUser(content.name, content.id, content.email, content.photo);
                loginUser(content.name, content.id, content.photo);
                toggleSignUpOpen(false);
            }
        }
    }
    return (
        isSignUpOpen ?
        <div className="signup-form-wrapper">
            <form className="signup-form" onSubmit={handleSubmit(submit)}>
                <div className="signup-form__close-btn" onClick={ () => toggleSignUpOpen(false) } >
                    <img src="/images/close.svg" alt="close"></img>
                </div>
                <div className="signup-form-title">
                    <h2>Изучать слова удобнее, если у вас есть профиль</h2>
                </div>
                <div className="signup-form-subtitle">
                    <span>Вы получите доступ к долгосрочному хранению статистики, а также сможете формировать собственный словарь.</span>
                </div>
                <div className="signup-form-fields">
                    <Field className="signup-form-fields__item" name="name" component="input" type="text" placeholder="Имя" required={true} />
                    <Field className="signup-form-fields__item" name="email" component="input" type="email" placeholder="E-mail" required={true} />
                    <Field className="signup-form-fields__item" name="password" component="input" type="password" placeholder="Пароль" required={true} />
                    <Field className="signup-form-fields__item" name="photo" component={FileInput} type="file" />
                </div>
                <div className="signup-form-error">
                    <span>{error}</span>
                </div>
                <div className="signup-form-submit">
                    <button className="signup-form-submit__btn" type="submit">Создать аккаунт</button>
                </div>
            </form>
        </div> : null
    );
}

const mapStateToProps = (state: any) => ({
    isSignUpOpen: state.signup.isSignUpOpen,
    user: state.signup.user,
    error: state.signup.error,
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleSignUpOpen: (isSignUpOpen: boolean) => {
        dispatch(toggleSignUpOpen(isSignUpOpen));
    },
    signUpUser: (name: string | null, id: string | null, email: string | null, photo: string | null) => {
        dispatch(signUpUser(name, id, email, photo));
    },
    loginUser: (name: string | null, userId: string | null, photo: string | null) => {
        dispatch(loginUser(name, userId, photo));
    },
    setSignUpError: (error: string | null) => {
        dispatch(setSignUpError(error));
    }
});

const SignUpFormConnect = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

const SignUpFormRedux = reduxForm({
    form: 'signup'
})(SignUpFormConnect);

export {SignUpFormRedux};