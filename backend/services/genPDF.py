import pdfkit
from sqlalchemy.orm import Session

import os
import sys
absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.models import Funcionario



class PDFGenerator_Repo:
    def __init__(self, dbsession: Session):
        self.config = pdfkit.configuration(wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
        self.options = {
            'page-size': 'A4',
            'margin-top': '0in',
            'margin-right': '0in',
            'margin-bottom': '0in',
            'margin-left': '0in',
            'encoding': "UTF-8",
            'custom-header': [
                ('Accept-Encoding', 'gzip')
            ],
            'no-outline': None
        }
        self.db: Session = dbsession

    def generate_html(self) -> str:
        # Fetch data from the database
        funcionarios = self.db.query(Funcionario).all()  # Assuming you have a Funcionario model

        # Generate HTML with data
        rows = ""
        for func in funcionarios:
            rows += f"""
            <tr>
                <td>{func.matricula}</td>
                <td>{func.nome}</td>
                <td>{func.cpf}</td>
                <td>{func.pis}</td>
                <td>{func.funcao}</td>
            </tr>
            """

        html = f"""
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Funcionarios</title>
            <style>
                body {{
                    font-family: Helvetica, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }}
                header {{
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 20px;
                }}
                h1 {{
                    margin: 0;
                }}
                main {{
                    padding: 20px;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }}
                th, td {{
                    border: none;
                    padding: 8px;
                    text-align: left;
                }}
                th {{
                    background-color: #333;
                    color: #fff;
                }}
                tr:nth-child(even) {{
                    background-color: #f2f2f2;
                }}
            </style>
        </head>
        <body>
            <header>
                <h1>Lista de Funcionarios</h1>
            </header>
            <main>
                <table>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Pis</th>
                        <th>Cargo</th>
                    </tr>
                    {rows}
                </table>
            </main>
        </body>
        </html>
        """
        return html

    def generate_pdf(self, html: str) -> bytes:
        # Convert HTML to PDF
        pdf = pdfkit.from_string(html, False, configuration=self.config, options=self.options)
        return pdf