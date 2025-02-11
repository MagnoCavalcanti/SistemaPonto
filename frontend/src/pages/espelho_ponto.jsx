import React from "react";
import Barra_deNavegacao from "../components/sideBar";
import { useLocation } from "react-router-dom";

export default function EspelhoPonto() {
    const location = useLocation()

    return (
        <div>
            <Barra_deNavegacao location={location} />
        </div>
    );
}