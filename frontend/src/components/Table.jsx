import { Paper } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const colunas = [
    { field: 'matrícula', headerName: 'Matrícula', width: 120 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 120 },
    { field: 'função', headerName: 'Função', width: 120 },
    { field: 'empresa', headerName: 'Empresa', width: 70 },
    { field: 'pis', headerName: 'Pis', width: 130 },
]

async function buscarFuncionarios() {
    const resposta = await axios.get("http://localhost:8000/funcionarios")
    return resposta.data
}

export const Tabela = () => {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
            const dados = await buscarFuncionarios();
            const dadosFormatados = dados.map((funcionario) => ({
                id: funcionario.id,
                matrícula: funcionario.matricula,
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                função: funcionario.funcao,
                empresa: funcionario.empresa,
                pis: funcionario.pis,
            }));
            setFuncionarios(dadosFormatados);
            
        };
        carregarDados();
    }, []);

    return (
        <Paper sx={{ height: "auto", width: 'auto', margin: "20px" }}>
            <DataGrid
                rows={funcionarios}
                columns={colunas}
            />
        </Paper>
    )
}