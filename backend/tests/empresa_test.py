import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.repositories.empresa_repo import EmpresaRepositorio  
from backend.models.models import Empresa as Empresa_models

def test_register_empresa():
    # Cria um mock para a sessão do banco de dados
    mock_session = MagicMock()
    repo = EmpresaRepositorio(mock_session)

    # Cria um mock para representar uma empresa
    nova_empresa = MagicMock(nome="Empresa Teste", cnpj="55.555.555/0001-66")

    # Teste de registro bem-sucedido
    repo.register_empresa(nova_empresa)

    # Verifica se o método add foi chamado com uma instância de Empresa_models
    chamado = mock_session.add.call_args[0][0]
    assert isinstance(chamado, Empresa_models)
    assert chamado.nome == "Empresa Teste"
    assert chamado.cnpj ==  "55.555.555/0001-66"

    # Verifica se o commit foi chamado
    mock_session.commit.assert_called_once()

    # Teste de duplicação (simula uma exceção de integridade)
    mock_session.add.side_effect = HTTPException(
        status_code=400, detail="Empresa já existente!"
    )

    # Usa pytest para verificar a exceção
    with pytest.raises(HTTPException) as excinfo:
        repo.register_empresa(nova_empresa)
    assert excinfo.value.detail == "Empresa já existente!"

    # Remove o efeito colateral para evitar interferência em outros testes
    mock_session.add.side_effect = None


def test_read_empresa():
    mock_session = MagicMock()
    repo = EmpresaRepositorio(mock_session)

    # Simula o retorno de empresas do banco
    mock_session.query().all.return_value = [
        MagicMock(nome="Empresa 1", cnpj="11111111000111"),
        MagicMock(nome="Empresa 2", cnpj="22222222000222"),
    ]

    # Testa a leitura de empresas
    empresas = repo.read_empresa()
    assert len(empresas) == 2
    assert empresas[0].nome == "Empresa 1"
    assert empresas[1].nome == "Empresa 2"

def test_update_empresa():
    mock_session = MagicMock()
    repo = EmpresaRepositorio(mock_session)

    # Simula um caso de atualização bem-sucedida
    mock_session.query().filter_by().update.return_value = 1
    repo.update_empresa(1, {"nome": "Empresa Atualizada", "cnpj": "55.555.555/0001-66"})
    mock_session.commit.assert_called_once()

    # Simula um caso de falha na atualização (IntegrityError)
    mock_session.query().filter_by().update.side_effect = HTTPException(
        status_code=400, detail="Falha na atualização! Verifique se os dados são válidos."
    )
    with pytest.raises(HTTPException) as excinfo:
        repo.update_empresa(1, {"nome": "Inválida"})
    assert "Falha na atualização!" in excinfo.value.detail

    # Simula uma exceção genérica
    mock_session.query().filter_by().update.side_effect = Exception("Erro interno")
    with pytest.raises(HTTPException) as excinfo:
        repo.update_empresa(1, {"nome": "Erro"})
    assert "Erro interno" in excinfo.value.detail
