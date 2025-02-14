import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Barra_deNavegacao from "../components/sideBar";
import { Grid2, Typography } from "@mui/material";
import { TabelaEmpresas } from "../components/Table";



const EmpresaPage = () => {
    const location = useLocation()
    const [open, setOpen] = useState(false);

    return(
        <div className="background">
            <Barra_deNavegacao location={location}/>
            <main>
                <Grid2>
                    <Typography variant="h5" component="h2" align="center">Empresas</Typography>
                </Grid2>
                <TabelaEmpresas />
            </main>
        </div>
    )
}
export { EmpresaPage }