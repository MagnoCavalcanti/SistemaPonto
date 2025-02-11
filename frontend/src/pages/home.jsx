import { useLocation } from "react-router-dom";
import Barra_deNavegacao from "../components/sideBar";

import "../styles/home.css"
import { Fab, Grid2, Icon, Tooltip, Typography } from "@mui/material";


function Home(){
    const location = useLocation()

    return (
        <div className="background">
            <Barra_deNavegacao location={location}/>
            <main>
                <section className="cabeçalho">
                    <Grid2 sx={{ display: "flex", gap: "20px"}}>
                        <Typography variant="h5" component="h2">Funcionarios</Typography>
                        <Tooltip title="Adicionar funcionários">
                            <Fab variant="extended" sx={{ 
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
                <section className="tabela_section">
                    <table className="tabela">
                        <thead>
                            
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    )
}

export default Home;