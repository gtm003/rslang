import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const LoginForm: React.FC = (props: any) => {
    const handleSubmit = props.handleSubmit;
    const submit = (values: any) => console.log(values);
    return (
        <div className="login-form-wrapper">
            <form className="login-form" onSubmit={handleSubmit(submit)}>
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
        </div>
    );
}

const LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm);

export {LoginFormRedux};