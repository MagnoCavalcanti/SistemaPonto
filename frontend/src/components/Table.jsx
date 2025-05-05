import { Paper, Icon, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid2 } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
//import CustomToolbar from "./CustomToolbar";

export const TabelaFuncionarios = ({ inputFields, handleCpfMask, empresa }) => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    //const [selectionModel, setSelectionModel] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (row) => {
        // Implementa a lógica de edição para as linhas selecionadas
        setSelectedRow(row);
        setFormData(row);
        console.log('Editar:', row.id);
        setOpenModal(true);
        
      };
    
    const handleCancel = () => {
        // Implementa a lógica de cancelamento da edição
        setOpenModal(false);
      };

    const handleUpdate = async () => {
        console.log(formData);
        // Implementa a lógica de atualização das linhas selecionadas
        await axios.put(`http://localhost:8000/${empresa}/funcionarios/${selectedRow.id}/atualizar`, formData);
        console.log('Atualizar:', selectedRow);
        setOpenModal(false);
        //window.location.reload();
    };

    const handleInputChange = (e) =>{
        setFormData((dataForm) => ({ 
            ...dataForm, 
            [e.target.name]: e.target.value 
        }));
    }
      
    
    const handleDelete = async () => {
        // Implementa a lógica de exclusão para as linhas selecionadas
        await axios.delete(`http://localhost:8000/funcionarios/${selectionModel}`);
        console.log('Excluir:', selectionModel);
    };

    

    
    const colunas = [
        { field: 'matricula', headerName: 'Matrícula', width: 120 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'cpf', headerName: 'CPF', width: 120 },
        { field: 'funcao', headerName: 'Função', width: 170 },
        { field: 'empresa', headerName: 'Empresa', width: 200 },
        { field: 'pis', headerName: 'Pis', width: 130 },
        { field: 'grupo', headerName: 'Grupo', width: 120 },
        {field: 'edit', headerName: 'Editar', width: 60, renderCell: (params) => <IconButton style={{ backgroundColor: "#515ea6", color: "white", height: "30px", width: "30px", borderRadius: "4px", "&:hover": {backgroundColor: "#465193"}}} onClick={() => handleEdit(params.row)}><Icon sx={{fontSize: "md"}}>edit</Icon></IconButton> }
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Buscar funcionários
                const funcionariosResponse = await axios.get(`http://localhost:8000/${empresa}/funcionarios`);
                
                // Buscar empresas
                const empresasResponse = await axios.get("http://localhost:8000/empresas");
                
                // Mapear empresas para um objeto de lookup para facilitar a busca
                const empresasMap = empresasResponse.data.reduce((acc, empresa) => {
                    acc[empresa.id] = empresa.nome;
                    return acc;
                }, {});

                // Adicionar nome da empresa aos funcionários
                const funcionariosComEmpresas = funcionariosResponse.data.map(funcionario => ({
                    ...funcionario,
                    empresa: empresasMap[funcionario.empresa_id] || ''
                }));

                setFuncionarios(funcionariosComEmpresas);
                setEmpresas(empresasResponse.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper sx={{ height: "auto", width: 'auto', margin: "20px" }}>
            <DataGrid
                rows={funcionarios}
                columns={colunas}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 25 },
                    },
                }}
                pageSizeOptions={[25, 50, 100]}
                paginationMode="server"
                rowCount={funcionarios.length}
                rowHeight={35}
                /*onRowSelectionModelChange={(selectionModel) => {
                    console.log(selectionModel);
                }} Não lembro o que é isso
                components={{
                    Toolbar: () => (
                        <CustomToolbar
                            selectedCount={selectionModel.length}
                            onDelete={handleDelete}
                        />
                    )
                }}*/
            />
            <Dialog open={openModal} onClose={handleCancel}>
                <DialogTitle>Editar Dados</DialogTitle>
                <DialogContent>
                    <Grid2 container spacing={2} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {inputFields.map((field, index) => (
                            <Grid2 item="true" xs={6} key={index}>
                                <div className="input-container">
                                    {field.type === 'select' ? (
                                        <select
                                            name={field.nome}
                                            className={field.label}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedInput(index)}
                                            onBlur={() => setFocusedInput(null)}
                                            defaultValue={formData[field.nome]}
                                            style={{
                                                width: "250px",
                                                height: "40px",
                                                padding: "10px",
                                                border: focusedInput === index ? "2px solid #515ea6" : "1px solid #ccc",
                                                borderRadius: "5px",
                                                transition: "border-color 0.3s ease",
                                                fontSize: "14px",
                                                outline: "none",
                                            }}
                                        >
                                            <option value="" selected >{empresa}</option>
                                            
                                            
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            required
                                            name={field.nome}
                                            className={field.label}
                                            placeholder={field.label}
                                            {...(field.type === 'text' ? { maxLength: field.length || 255 } : {})}
                                            {...(field.type === 'number' ? { max: Math.pow(10, field.length || 10) - 1 } : {})}
                                            defaultValue={formData[field.nome] || ''}
                                            onKeyUp={field.label === 'CPF' ? handleCpfMask : undefined}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedInput(index)}
                                            onBlur={() => setFocusedInput(null)}
                                            style={{
                                                width: "250px",
                                                height: "40px",
                                                padding: "10px",
                                                border: focusedInput === index ? "2px solid #515ea6" : "1px solid #ccc",
                                                borderRadius: "5px",
                                                transition: "border-color 0.3s ease",
                                                fontSize: "14px",
                                                outline: "none",
                                            }}
                                        />
                                    )}
                                </div>
                            </Grid2>
                        ))}
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} sx={{ color: "#515EA6"}}>Cancelar</Button>
                    <Button variant="contained" onClick={handleUpdate} sx={{ backgroundColor: "#515EA6"}}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export const TabelaEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);

    const colunas = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'nome', headerName: 'Nome', width: 300 },
        { field: 'cnpj', headerName: 'CNPJ', width: 120 },
        { field: 'endereco', headerName: 'Endereço', width: 180 },
    ]

    
    return (
        <Paper sx={{ height: "auto", width: 'auto', margin: "20px" }}>
            <DataGrid 
            columns={colunas}
            rows={empresas}
            rowHeight={35}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10, 25]}
            paginationMode="server"
            rowCount={empresas.length}
            />
        </Paper>
    )
}