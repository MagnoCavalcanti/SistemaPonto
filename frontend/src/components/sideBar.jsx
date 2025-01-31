import styles from "../styles/modules/sideBar.module.css"
import { Link, useNavigate } from "react-router-dom";

function Barra_deNavegacao(){
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className={styles.sideBar}>
            <nav className={styles.navBar}>
                <i className="bi bi-list" id={styles.menu}></i>
                <nav className={styles.botoes}>
                    <ul className={styles.navigation}>
                        <li>
                            <Link to="">
                                <i className="bi bi-people-fill" id={styles.image}></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/espelho_ponto">
                                <i className="bi bi-buildings-fill" id={styles.image}></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <i className="bi bi-bar-chart-line-fill" id={styles.image}></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <i className="bi bi-calendar2-week-fill" id={styles.image}></i>
                            </Link>
                        </li>
                    </ul>
                    <section className={styles.footerSideBar}>
                        <i className="bi bi-person-circle" id={styles.perfil}></i>
                        <i className="bi bi-box-arrow-left" id={styles.exit} onClick={handleLogOut}></i>
                    </section>
                </nav>
            </nav>
        </div>
    )
}

export default Barra_deNavegacao;