import { Paper } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'matrícula', headerName: 'Matrícula', width: 120 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 120 },
    { field: 'função', headerName: 'Função', width: 70 },
    { field: 'empresa', headerName: 'Empresa', width: 70 },
    { field: 'pis', headerName: 'Pis', width: 70 },
]

export const Tabela = () => {
    return (
        <Paper sx={{ height: "auto", width: 'auto', margin: "20px" }}>
            <DataGrid
            columns={columns}
            />
        </Paper>
    )
}