import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { toggleLoginOpen } from '../../common/redux/login-action-creator';
import { urlBackend } from '../../data';

interface LoginProps {
    isLoginOpen: boolean,
    handleSubmit: any,
    toggleLoginOpen: (isLoginOpen: boolean) => void
}

interface submitValues {
    email: string,
    password: string,
}

const LoginForm: React.FC<LoginProps> = ({ isLoginOpen, handleSubmit, toggleLoginOpen }) => {
    const submit = async (values: submitValues) => {
        const response = await fetch(`${urlBackend}signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const content = await response.json();
        console.log(content);
    };
    
    return (
        isLoginOpen ?
        <div className="login-form-wrapper" >
            <form className="login-form" onSubmit={handleSubmit(submit)}>
                <div className="login-form__close-btn" onClick={ () => toggleLoginOpen(false) } >
                    <img src="/images/close.svg" alt="close"></img>
                </div>
                <div className="login-form-title">
                    <h2>Изучать слова удобнее, если у вас есть профиль</h2>
                </div>
                <div className="login-form-subtitle">
                    <span>Вы получите доступ к долгосрочному хранению статистики, а также сможете формировать собственный словарь.</span>
                </div>
                <div className="login-form-fields">
                    <Field className="login-form-fields__item" name="email" component="input" type="email" placeholder="E-mail" required={true} />
                    <Field className="login-form-fields__item" name="password" component="input" type="password" placeholder="Пароль" required={true} />
                </div>
                <div className="login-form-submit">
                    <button className="login-form-submit__btn" type="submit">Войти</button>
                </div>
                <div>
                    <div>
                        Забыли пароль? | <Link to="/sign-up">Регистрация</Link>
                    </div>
                </div>
            </form>
        </div> : null
    );
}

const mapStateToProps = (state: any) => ({
    isLoginOpen: state.login.isLoginOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleLoginOpen: (isLoginOpen: boolean) => {
        dispatch(toggleLoginOpen(isLoginOpen));
    },
})

const LoginFormConnect = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const LoginFormRedux = reduxForm({
    form: 'login'
})(LoginFormConnect);

export {LoginFormRedux};