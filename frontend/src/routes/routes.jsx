import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../pages/login'
import Funcionarios from '../pages/home'
import PrivateRoute from './privateRoute'
import EspelhoPonto from '../pages/espelho_ponto'
import { EmpresaPage } from '../pages/empresasPage'

function Rotas(){
    return (
        <Router>
            <Routes>
                <Route path='/:empresa' element={<Login/>} />
                <Route path='/:empresa/funcionarios' element={
                    <PrivateRoute><Funcionarios/></PrivateRoute>
                } />
                <Route path='/:empresa/espelho-ponto' element={
                    <PrivateRoute><EspelhoPonto/></PrivateRoute>
                } />
                <Route path='/:empresa/empresas' element={
                    <PrivateRoute><EmpresaPage/></PrivateRoute>
                } />
            </Routes>
        </Router>
    )
}

export default Rotas