import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import PrivateRoute from './privateRoute'
import EspelhoPonto from '../pages/espelho_ponto'
import { EmpresaPage } from '../pages/empresasPage'

function Rotas(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={
                    <PrivateRoute><Home/></PrivateRoute>
                    } />
                <Route path='/espelho_ponto' element={<PrivateRoute><EspelhoPonto/></PrivateRoute>} />
                <Route path='/empresas' element={<PrivateRoute><EmpresaPage/></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default Rotas 