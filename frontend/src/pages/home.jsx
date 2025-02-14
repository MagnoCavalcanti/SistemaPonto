import { useLocation } from "react-router-dom";
import Barra_deNavegacao from "../components/sideBar";
import { Tabela } from "../components/Table";

import "../styles/home.css"
import { Fab, Grid2, Icon, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EmployeeModal from "../components/EmployeeModal";

const inputFields = [
    { label: 'Matrícula', type: 'number', required: true, nome: 'matricula' },
    { label: 'Nome', type: 'text', required: true,  nome: 'nome' },,
    { label: 'CPF', type: 'text', required: true, nome: 'cpf', length: 14 },
    { label: 'Função', type: 'text', required: true, nome: 'funcao' },
    { label: 'Empresa', type: 'number', required: true, nome: 'empresa_id' },
    { label: 'Pis', type: 'number', required: true, nome: 'pis' },
    { label: 'Grupo', type: 'text', required: true, nome: 'grupo' },
];

const handleCpfMask = (e) => {
    let value = e.target.value;
    
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    
    // Apply CPF mask
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    // Limit to 14 characters (including dots and dash)
    value = value.substring(0, 14);
    
    // Update the input value
    e.target.value = value;
};

function Home(){
    const location = useLocation()
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="background">
            <Barra_deNavegacao location={location}/>
            <main>
                <section className="cabeçalho">
                    <Grid2 sx={{ display: "flex", gap: "20px"}}>
                        <Typography variant="h5" component="h2">Funcionarios</Typography>
                        <Tooltip title="Adicionar funcionários">
                            <Fab 
                            variant="extended"
                            onClick={handleAdd}
                            sx={{ 
                            backgroundColor: "#515EA6", 
                            color: "white", 
                            height: 30, 
                            borderRadius: "4px",
                            "&:hover": {
                                backgroundColor: "#465193"
                            }
                            }}>
                                <Icon>add</Icon>
                                <p>Adicionar</p>
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Exportar dados">
                            <Fab variant="extended" sx={{
                                backgroundColor: "white",
                                height: 30,
                                borderRadius: "4px",

                            }}>
                                <Icon>local_printshop</Icon>
                                <p>Exportar</p>
                            </Fab>
                        </Tooltip>
                    </Grid2>
                    <Grid2 sx={{ display: "flex", gap: "10px"}}>
                        <Tooltip title="buscar">
                            <Fab 
                            variant="extended" 
                            sx={{
                                backgroundColor: "white",
                                height: 30, 
                                width: 30,
                                borderRadius: "4px"
                            }}>
                                <Icon sx={{ fontSize: 22}}>search</Icon>
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Filtro">
                            <Fab
                            variant="extended"
                            sx={{
                                backgroundColor: "#515EA6",
                                color: "white",
                                height: 30,
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: "#465193"
                                }
                            }}>
                                <Icon sx={{ fontSize: "small"}}>chevron_left</Icon>
                                Filtrar
                            </Fab>
                        </Tooltip>
                    </Grid2>
                </section>
                <Tabela inputFields={inputFields} handleCpfMask={handleCpfMask} />
            </main>
            <EmployeeModal open={open} handleClose={handleClose} inputFields={inputFields} handleCpfMask={handleCpfMask} />
        </div>
    )
}

export default Home;