import React, { useEffect } from "react";
import Barra_deNavegacao from "../components/sideBar";
import { useLocation } from "react-router-dom";
import { Fab, Grid2, Icon, Stack, Tooltip, Typography } from "@mui/material";
//import DatePicker  from "react-datepicker"; analizar se vai ser necessario
//import "react-datepicker/dist/react-datepicker.css";
import "../styles/global.css";

export default function EspelhoPonto() {
    const location = useLocation()

    useEffect(() => {
        
    }, [])

    return (
        <div className="background">
            <Barra_deNavegacao location={location} />
            <main>
                <Grid2 sx={{ display: "flex", gap: "20%", margin: "30px 40px 30px", width: "1230px" }}>
                    {/*Segundo Grupo */}
                    <Grid2 item="true" xs={12} md={6} sx={{ gap: "60px" }}> 
                        <Stack spacing={2}>
                            <Typography variant="body1" component="p" sx={{ fontSize: "18px" }}>Nome:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>Matrícula:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>Empresa:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>Departamento:
                            </Typography>
                        </Stack>
                    </Grid2>


                    
                    {/* Segundo Grupo */}
                    <Grid2 item="true" xs={12} md={6}>
                        <Stack spacing={2}>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>Função:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>Admissão:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>Pis:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ fontSize: "15px" }}>CPF:
                            </Typography>
                        </Stack>
                    </Grid2>
                    <Grid2 sx={{
                        display: "flex",
                        flexDirection: "column",
                        allignItems: "flex-end",
                        gap: "20px",
                        marginRight: "20px"
                    }}>    
                        <Tooltip title="Alterar Funcionário">
                            <Fab variant="extended" sx={{
                                backgroundColor: "#515EA6",
                                color: "white",
                                height: 35,
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: "#465193"
                                }
                            }}>
                                <Icon>edit</Icon>
                                <p>Alterar</p>

                            </Fab>
                        </Tooltip>
                        
                        <Tooltip title="Exportar dados">
                            <Fab variant="extended" sx={{
                                backgroundColor: "white",
                                height: 35,
                                borderRadius: "4px",
                            }}>
                                <Icon>local_printshop</Icon>
                                <p>Exportar</p>
                            </Fab>
                        </Tooltip>
                    </Grid2>
                </Grid2>
            </main>
        </div>
    );
}