import styles from "../styles/modules/sideBar.module.css"
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Drawer, Icon, List, ListItem, ListItemIcon} from '@mui/material'
import { useState } from "react";

import { ItemSideBar } from "./ItemSideBar";


function Barra_deNavegacao({location}){
    const navigate = useNavigate();
    const ativado = {
      content: '""',
      position: "absolute",
      left: 0,
      top: "10%",
      height: "80%",
      width: "4px",
      backgroundColor: "white",
      borderRadius: "0px 4px 4px 0px",
    }
    

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Drawer
      variant="permanent"
      sx={{
        width: 40,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 40,
          boxSizing: "border-box",
          backgroundColor: "#515EA6",
          color: "white",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "100%", py: 2 }}>
        <List sx={{ width: "100%", marginTop: 8}}>
    
          <ItemSideBar icon="group" to="/home" location={location}/>
          <ItemSideBar icon="business" to="" location={location}/>
          <ItemSideBar icon="bar_chart" to="/espelho_ponto" location={location}/>
          <ItemSideBar icon="calendar_month" to="" location={location}/>
          
        </List>

        <Box sx={{ flexGrow: 1 }} /> {/* Empurra os próximos itens para a parte inferior */}

        <List sx={{ width: "100%" }}>
          <ListItem sx={{ justifyContent: "center", py: 1 }}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Avatar sx={{ width: 32, height: 32}}/>
            </ListItemIcon>
          </ListItem>

          <ListItem button={true} onClick={handleLogOut} sx={{ justifyContent: "center", py: 1, cursor: "pointer"}}>
            <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
              <Icon sx={{ fontSize: 23}}>exit_to_app</Icon>
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Drawer>   
    )
}

export default Barra_deNavegacao;