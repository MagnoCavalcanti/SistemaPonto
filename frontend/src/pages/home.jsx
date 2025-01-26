import Barra_deNavegacao from "../components/sideBar";

import "../styles/home.css"


function Home(){
    return (
        <div className="background">
            <Barra_deNavegacao/>
            <section>
                <table className="tabela">
                    <thead>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>CPF</th>
                        <th>Pis</th>
                        <th>Empresa</th>
                    </thead>
                    <tbody>
                        <td>Magno</td>
                        <td>2002034234091</td>
                        <td>123.456.789-10</td>
                        <td>34892344492192</td>
                        <td>Apple inc.</td>
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Home;