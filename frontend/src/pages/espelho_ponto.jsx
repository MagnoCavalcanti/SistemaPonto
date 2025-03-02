import React, { useEffect } from "react";
import Barra_deNavegacao from "../components/sideBar";
import { useLocation, useParams } from "react-router-dom";
import { Box, Fab, Grid2, Icon, Paper, Stack, Tooltip, Typography } from "@mui/material";
//import DatePicker  from "react-datepicker"; analizar se vai ser necessario
//import "react-datepicker/dist/react-datepicker.css";
import "../styles/global.css";
import "../styles/espelho_ponto.css";

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

                    {/* Grupo de Botoes */}
                    <Grid2 sx={{
                        display: "flex",
                        flexDirection: "column",
                        allignItems: "flex-end",
                        gap: "20px",
                        marginRight: "20px"
                    }}>    
                        <Tooltip title="Alterar Funcionário" placement="left">
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
                          <Box sx={{ display: "flex", flexDirection:"column", gap: "10px", backgroundColor: "#B6BFF2", borderRadius: "4px", padding: "10px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.5)" }}>
                              <Tooltip title="Início do período" placement="right">
                                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                                      <Icon>calendar_month</Icon>
                                      <input type="date" name="data-inicio" id="data" 
                                       />
                                  </Box>
                              </Tooltip>
                              <Tooltip title="Fim do período" placement="right" >
                                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                                      <Icon>calendar_month</Icon>
                                      <input type="date" name="data-fim" id="data" />
                                  </Box>
                              </Tooltip>
                        </Box>
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
                    
                </Grid2>
                
                <Paper>
                    <table border="1px solid #000">
                        <tr>
                            <th>    </th>
                            <th>Período</th>
                            <th>1º Entrada</th>
                            <th>1º Saída</th>
                            <th>2º Entrada</th>
                            <th>2º Saída</th>
                            <th>   </th>
                            <th>Faltas</th>


                        </tr>

                        <tr>
                            <td>1</td>
                            <td>01/01/2023</td>
                            <td>08:00</td>
                            <td>12:00</td>
                            <td>13:00</td>
                            <td>17:00</td>
                            <td>00:00</td>
                            <td>00:00</td>
                        </tr>
                    </table>
                </Paper>
            </main>
        </div>
    );
}