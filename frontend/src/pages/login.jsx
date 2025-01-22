import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/login.css'


function Login(){

    const history = useNavigate()

    const [dataForm, setDataForm] = useState({ //vai receber os dados do meu formulário
        user: '',
        password: ''
    })
    const [error, setError] = useState(""); //vai receber uma mensagem em caso de erro

    function handleChange(event){
        setDataForm((dataForm) => ({
            ...dataForm,
            [event.target.name]: event.target.value,
        }))
        
    }

    async function handleClick(event){
        event.preventDefault()
        setError("")
        
        try{
            const formData = new URLSearchParams() //transforma os dados do formulário para um formato OAuth2PasswordRequestForm
            formData.append("username", dataForm.user)
            formData.append("password", dataForm.password)

            

            const response = await axios.post("http://localhost:8888/login", formData, { //envia para a minha API que retorna um token
                
                    headers: {  
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                
            })

            
            const token = response.data
            
            localStorage.setItem("token", JSON.stringify(token));

        
            history("/home");
        
        }catch (err) {
            //Em caso de erro, exibirá uma mensagem na tela
            setError(err.response?.data?.detail || "Erro ao fazer login. Verifique suas credenciais.")
            
            
        }
    }
    return (
        <div className="container">
            <section className={`boxLogin ${error ? "error" : ""}`}>
                <h2>Sistema de Ponto</h2>

                {/* Exibe a mensagem de erro, se houver */}
                {error && <p className='errorMensage'>{error}</p>}

                <form onSubmit={handleClick} action="" id="form-login">
                    <label htmlFor="user"></label>
                    <input type="text" name="user" id="user" placeholder="Usuário" onChange={handleChange}/>
                    
                    <label htmlFor="password"></label>
                    <input type="password" name="password" id="password" placeholder="Senha" onChange={handleChange}/>

                    <button type="submit"  >Log In</button>

                </form>
                
            </section>
        </div>
    )
}

export default Login;