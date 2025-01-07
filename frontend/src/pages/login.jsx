import { useNavigate } from 'react-router-dom';
import '../styles/login.css'


function Login(){

    const history = useNavigate()

    function handleClick(){
        history("/home");
    }

    return (
        <div className="container">
            <section>
                <h2>Sistema de Ponto </h2>
                <form action="" id="form-login">
                    <label htmlFor="user"></label>
                    <input type="text" name="user" id="user" placeholder="Usuário"/>
                    
                    <label htmlFor="password"></label>
                    <input type="password" name="password" id="password" placeholder="Senha"/>

                    <button type="submit" onClick={handleClick} >Log In</button>

                </form>
            </section>
        </div>
    )
}

export default Login;