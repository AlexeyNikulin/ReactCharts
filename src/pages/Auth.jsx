import React, {useContext, useState, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';

const Auth = () => {
    const [form, setForm] = useState({login: '', password: ''});
    const [errorMessage, setErrorMessage] = useState(null);
    const {loading, request, error, clearError} = useHttp();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            setErrorMessage('Что-то пошло не так...');
        }
        clearError()
    }, [error, clearError])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await request('/login.json', 'POST', {...form});
            auth.login(data.token);
        } catch(e){}
    };

    return (
        <form onSubmit={loginHandler} className="auth-form">
            <h2 className="auth-form__title">Вход</h2>
            <input 
                onChange={changeHandler} 
                name="login" 
                type="text" 
                placeholder="Логин" 
                required/>
            <input 
                onChange={changeHandler} 
                name="password" 
                type="password" 
                placeholder="Пароль" 
                required/>
            { errorMessage &&
                <div className="auth-form__error">{errorMessage}</div>
            }
            { loading &&
                <Loader/>
            }
            <button 
                disabled={loading} 
                className="auth-form__btn">Войти</button>
	    </form>
    )
}

export default Auth;
