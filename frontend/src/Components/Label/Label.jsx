import React, { useState } from "react";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import classes from "./Label.module.css";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";

const Label = (props) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayAddExpenseModal, setDisplayAddExpenseModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const transactionClickHandler = (transaction) => {
    setDisplayModal(true);
    setModalData(transaction);
  };
  const modalCancelHandler = () => {
    setDisplayModal(false);
    setModalData({});
  };
  const deleteTransactionHandler = ({ id }) => {
    // delete transaction from database
    setDisplayModal(false);
    setModalData({});
  };
  const addBtnClickHandler = () => {
    setDisplayAddExpenseModal(true);
  };
  const addExpenseHandler = (e) =>{
    setDisplayAddExpenseModal(false)
  }
  const addExpenseCanceler = () =>{
    setDisplayAddExpenseModal(false)
  }

  const transactions = [
    {
      name: "Chiya",
      amount: "5",
      id: "t1",
      createdAt: new Date().toISOString(),
    },
    {
      name: "Auto",
      amount: "20",
      id: "t2",
      createdAt: new Date().toISOString(),
    },
  ];
  return (
    <section className={classes.section}>
      {/* {props.id} */}
      {/* Modals start */}
      {displayModal && (
        <Modal
          title="Transaction Details"
          confirmText="Okay"
          confirmColor="green"
          onConfirm={modalCancelHandler}
          onCancel={modalCancelHandler}
        >
          <div
            className={classes.modal__deleteBtn}
            onClick={() => deleteTransactionHandler(modalData)}
          >
            <MdDelete />
          </div>
          <ul className={classes.modal__ul}>
            <li>
              <span className={classes.modal__ul__name}>Name: </span>
              <span className={classes.modal__ul__value}>{modalData.name}</span>
            </li>
            <li>
              <span className={classes.modal__ul__name}>Amount: </span>
              <span className={classes.modal__ul__value}>
                Rs {modalData.amount}
              </span>
            </li>
            <li>
              <span className={classes.modal__ul__name}>Date Created: </span>
              <span className={classes.modal__ul__value}>
                {modalData.createdAt}
              </span>
            </li>
            <li>
              <span className={classes.modal__ul__name}>ID: </span>
              <span className={classes.modal__ul__value}>{modalData.id}</span>
            </li>
          </ul>
        </Modal>
      )}
      {displayAddExpenseModal && (
        <Modal title="Add an Expense" confirmText="Save" onConfirm={addExpenseHandler} onCancel={addExpenseCanceler} submitable="true" >
            <Input name="name" title="Name" required="true" />
            <Input name="amount" type="number" step="0.01" title="Amount" required="true" />
            <Input name="remark" title="Remark" type="textarea" />
        </Modal>
      )}
      {/* Modals Ends */}

      <h1 className={classes.balance}>YOUR BALANCE IS: Rs 5995/-</h1>
      <Card className={classes.card}>
        <div className={classes.card__title}>Budget</div>
        <div className={classes.card__deposit}>Deposit: Rs 6000/-</div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.card__title}>Expenses</div>
        <div className={classes.card__expenses}>Expenses: Rs 3000/-</div>
      </Card>
      <Button
        className={classes.addExpenseBtn}
        animated="true"
        onClick={addBtnClickHandler}
      >
        <span className={classes.addExpenseBtn__icon}>
          <IoAddCircleOutline />
        </span>
        <span>Add an expense</span>
      </Button>

      <div className={classes.history}>
        <h1 className={classes.history__title}>Transaction Details</h1>
        {transactions.map((transaction) => {
          return (
            <div
              key={transaction.id}
              className={classes.history__item}
              onClick={() => transactionClickHandler(transaction)}
            >
              <h1 className={classes.history__item__name}>
                {transaction.name}
              </h1>
              <span className={classes.history__item__amount}>
                Rs {transaction.amount}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Label;
