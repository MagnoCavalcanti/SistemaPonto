import { Paper } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
//import CustomToolbar from "./CustomToolbar";

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
    const [selectionModel, setSelectionModel] = useState([]);

    const handleEdit = () => {
        // Implementa a lógica de edição para as linhas selecionadas
        console.log('Editar:', selectionModel);
      };
    
      const handleDelete = async () => {
        // Implementa a lógica de exclusão para as linhas selecionadas
        await axios.delete(`http://localhost:8000/funcionarios/${selectionModel}`);
        console.log('Excluir:', selectionModel);
      };

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
                checkboxSelection
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                paginationMode="server"
                rowCount={funcionarios.length}
                /*onRowSelectionModelChange={(selectionModel) => {
                    console.log(selectionModel);
                }}
                components={{
                    Toolbar: () => (
                        <CustomToolbar
                            selectedCount={selectionModel.length}
                            onDelete={handleDelete}
                        />
                    )
                }}*/
            />
        </Paper>
    )
}