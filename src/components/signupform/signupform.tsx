import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { urlBackend } from '../../data';

interface submitValues {
    name: string,
    email: string,
    password: string,
}

const SignUpForm: React.FC = (props: any) => {
    const handleSubmit = props.handleSubmit;
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
        <div className="signup-form-wrapper">
            <form className="signup-form" onSubmit={handleSubmit(submit)}>
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
        </div>
    );
}

const SignUpFormRedux = reduxForm({
    form: 'signup'
})(SignUpForm);

export {SignUpFormRedux};