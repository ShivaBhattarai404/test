import React, { useEffect, useState } from "react";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import classes from "./Label.module.css";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";

function formatDate(date, format) {
  return format
    .replace("yy", date.getFullYear())
    .replace("mm", ("0" + (date.getMonth() + 1)).slice(-2))
    .replace("dd", ("0" + date.getDate()).slice(-2))
    .replace("hh", ("0" + (date.getHours() % 12)).slice(-2))
    .replace("min", ("0" + date.getMinutes()).slice(-2))
    .replace("sec", ("0" + date.getSeconds()).slice(-2))
    .replace("am", date.getHours() < 12 ? "am" : "pm");
}
function formatText(text) {
  return text[0].toUpperCase() + text.slice(1);
}
const Label = (props) => {
  const [transactions, setTransactions] = useState(props.expenses);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayAddExpenseModal, setDisplayAddExpenseModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setTransactions(props.expenses);
  }, [props.expenses]);
  const transactionClickHandler = (transaction) => {
    setDisplayModal(true);
    setModalData(transaction);
  };
  const modalCancelHandler = () => {
    setDisplayModal(false);
    setModalData({});
  };
  const deleteTransactionHandler = ({ _id: id }) => {
    // delete transaction from database
    fetch("http://localhost:8080/expense", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
        labelId: props.id,
      }),
    })
      .then((reponse) => {
        return reponse.json();
      })
      .then((resData) => {
        setTransactions((prevData) =>
          prevData.filter(
            (transaction) => transaction._id !== resData.deletedExpense._id
          )
        );
      })
      .catch((err) => {
        setErrors({message: "Failed to delete expense&"+err.message, status: err.status || 500})
      });
    setDisplayModal(false);
    setModalData({});
  };
  const addBtnClickHandler = () => {
    setDisplayAddExpenseModal(true);
  };
  const addExpenseHandler = (e) => {
    setDisplayAddExpenseModal(false);
  };
  const addExpenseCanceler = () => {
    setDisplayAddExpenseModal(false);
  };

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
              <span className={classes.modal__ul__value}>
                {formatText(modalData.name)}
              </span>
            </li>
            <li>
              <span className={classes.modal__ul__name}>Amount: </span>
              <span className={classes.modal__ul__value}>
                Rs {modalData.amount}
              </span>
            </li>
            <li>
              <span className={classes.modal__ul__name}>Date Created: </span>
              <span
                className={classes.modal__ul__value}
                style={{ wordSpacing: "10px" }}
              >
                {formatDate(
                  new Date(modalData.createdAt),
                  `yy/mm/dd hh:min:secam`
                )}
              </span>
            </li>
            <li>
              <span className={classes.modal__ul__name}>ID: </span>
              <span className={classes.modal__ul__value}>{modalData._id}</span>
            </li>
          </ul>
        </Modal>
      )}
      {displayAddExpenseModal && (
        <Modal
          title="Add an Expense"
          confirmText="Save"
          onConfirm={addExpenseHandler}
          onCancel={addExpenseCanceler}
          submitable="true"
        >
          <Input name="name" title="Name" required="true" />
          <Input
            name="amount"
            type="number"
            step="0.01"
            title="Amount"
            required="true"
          />
          <Input name="remark" title="Remark (optional)" type="textarea" />
        </Modal>
      )}
      {errors && (
        <Modal
          title="Error Occured!!!"
          confirmText="Okay"
          onConfirm={()=>setErrors(null)}
          onCancel={()=>setErrors(null)}
        >
          <h2>{[errors.status, " ", errors.message.split("&")[0]]}</h2>
          <h2>{errors.message.split("&")[1]}</h2>
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
              key={transaction._id}
              className={classes.history__item}
              onClick={() => transactionClickHandler(transaction)}
            >
              <h1 className={classes.history__item__name}>
                {formatText(transaction.name)}
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
