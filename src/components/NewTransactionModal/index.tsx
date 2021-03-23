import React, { FormEvent, useState, useContext } from "react";
import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImage from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTransactions();

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName='react-modal-overlay' className="react-modal-content">
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImage} alt="Fechar modal"></img>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}></input>
                <input placeholder="Valor" type="number" value={amount} onChange={event => setAmount(Number(event.target.value))}></input>
                <TransactionTypeContainer>
                    <RadioBox type="button" onClick={() => { setType('deposit'); }} isActive={type === 'deposit'} activeColor="green">
                        <img src={incomeImg} alt="Entrada"></img>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button" onClick={() => { setType('withdraw'); }} isActive={type === 'withdraw'} activeColor="red">
                        <img src={outcomeImg} alt="Saída"></img>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}></input>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}