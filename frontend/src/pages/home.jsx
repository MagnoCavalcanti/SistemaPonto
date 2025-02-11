import { useLocation } from "react-router-dom";
import Barra_deNavegacao from "../components/sideBar";

import "../styles/home.css"


function Home(){
    const location = useLocation()

    return (
        <div className="background">
            <Barra_deNavegacao location={location}/>
            <section>
                <table className="tabela">
                    <thead>
                        
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Home;