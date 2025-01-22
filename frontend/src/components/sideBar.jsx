import styles from "../styles/modules/sideBar.module.css"
import { Link } from "react-router-dom";

function Barra_deNavegacao(){
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
                            <Link to="">
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
                        <Link to="/">
                            <i className="bi bi-box-arrow-left" id={styles.exit}></i>
                        </Link>
                    </section>
                </nav>
            </nav>
        </div>
    )
}

export default Barra_deNavegacao;