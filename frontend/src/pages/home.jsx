import { useLocation, useParams } from "react-router-dom";
import Barra_deNavegacao from "../components/sideBar";
import { TabelaFuncionarios } from "../components/Table";

import "../styles/global.css"
import { Fab, Grid2, Icon, Paper, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import EmployeeModal from "../components/EmployeeModal";

const inputFields = [
    { label: 'Matrícula', type: 'number', required: true, nome: 'matricula' },
    { label: 'Nome', type: 'text', required: true,  nome: 'nome' },,
    { label: 'CPF', type: 'text', required: true, nome: 'cpf', length: 14 },
    { label: 'Função', type: 'text', required: true, nome: 'funcao' },
    { label: 'Empresa', type: 'select', required: true, nome: 'empresa_id' },
    { label: 'Pis', type: 'number', required: true, nome: 'pis', length: 11 },
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

function Funcionarios(){
    const location = useLocation()
    const [open, setOpen] = useState(false);
    const { empresa } = useParams(); //O nome da empresa recebido pela URL
    const [ empresaId, setEmpresaId ] = useState(null);

    useEffect(() => {
        const fetchEmpresaId = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/empresas/${empresa}`);
                console.log("ID da empresa:", response.data.id_empresa);
                setEmpresaId(response.data.id_empresa)
                
            } catch (error) {
                console.error("Erro ao buscar ID da empresa:", error);
            }
        };
        
        fetchEmpresaId();
    }, [empresa]);


    const handleAdd = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExport = async () => {
        // Implement export logic here
        try {
            const response = await axios.get(`http://localhost:8000/${empresa}/pdf/generate`, {
                responseType: 'blob', // Importante para receber o PDF como blob
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const newWindow = window.open(url, "_blank");
            
        } catch (error) {
            console.error("Erro ao exportar PDF:", error);
        }
        
        
    }

    return (
        <div className="background">
            <Barra_deNavegacao location={location}/>
            <main>
                <section className="cabeçalho" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "30px 40px 30px ",
                    width: "1230px"
                    }}>
                    <Grid2 sx={{ display: "flex", gap: "20px", }}>
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
                            <Fab variant="extended" onClick={handleExport} sx={{
                                backgroundColor: "white",
                                height: 30,
                                borderRadius: "4px",
                            }}>
                                <Icon>local_printshop</Icon>
                                <p>Exportar</p>
                            </Fab>
                        </Tooltip>
                    </Grid2>
                   
                </section>
                <TabelaFuncionarios inputFields={inputFields} handleCpfMask={handleCpfMask} empresa={empresa} />
            </main>
            <EmployeeModal open={open} handleClose={handleClose} inputFields={inputFields} handleCpfMask={handleCpfMask} empresa={empresa} empresa_id={empresaId} />
        </div>
    )
}

export default Funcionarios;