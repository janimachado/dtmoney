import React from "react";
import Modal from "react-modal";
import { Container } from "./styles";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName='react-modal-overlay' className="react-modal-content">
            <Container>
                <h2>Cadastrar Transação</h2>
                <input placeholder="Título"></input>
                <input placeholder="Valor" type="number"></input>
                <input placeholder="Categoria"></input>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}