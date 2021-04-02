import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { toggleSignUpOpen } from '../../common/redux/signup-action-creator';
import { urlBackend } from '../../data';

interface SignUpProps {
    isSignUpOpen: boolean,
    handleSubmit: any,
    toggleSignUpOpen: (isSignUpOpen: boolean) => void
}

interface submitValues {
    name: string,
    email: string,
    password: string,
}

const SignUpForm: React.FC<SignUpProps> = ({ isSignUpOpen, handleSubmit, toggleSignUpOpen }) => {
    const submit = async (values: submitValues) => {
        const response = await fetch(`${urlBackend}users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const content = await response.json();
        console.log(content);
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
                    <Field className="signup-form-fields__item" name="photo" component="input" type="file" accept=".jpg, .jpeg, .png" />
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
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleSignUpOpen: (isSignUpOpen: boolean) => {
        dispatch(toggleSignUpOpen(isSignUpOpen));
    },
});

const SignUpFormConnect = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

const SignUpFormRedux = reduxForm({
    form: 'signup'
})(SignUpFormConnect);

export {SignUpFormRedux};