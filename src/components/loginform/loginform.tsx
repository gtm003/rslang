import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const LoginForm: React.FC = (props: any) => {
    const handleSubmit = props.handleSubmit;
    const submit = (values: any) => console.log(values);
    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit(submit)}>
                <div className="form-fields">
                    <div className="form-fields__item">
                        <label htmlFor="email">Email</label>
                        <Field name="email" component="input" type="email" required={true} />
                    </div>
                    <div className="form-fields__item">
                        <label>Пароль</label>
                        <Field name="password" component="input" type="password" required={true} />
                    </div>
                    <div className="form-fields__item">
                        <Link to="/sign-up">Нет аккаунта? Зарегистрируйтесь!</Link>
                    </div>
                </div>
                <div className="form-submit">
                    <button className="btn" type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
}

const LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm);

export {LoginFormRedux};