import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";

import { MdDeleteForever } from "react-icons/md";

import { API_BASE_URL } from "../../config";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import { useNavigate } from "react-router-dom";

function formatText(text = "") {
  return text[0].toUpperCase() + text.slice(1);
}

const Profile = ({ name, email }) => {
  const navigate = useNavigate("");
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    fetch(`${API_BASE_URL}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError(
            "Some server error occured. Try logging out and logging in back"
          );
        }
        return response.json();
      })
      .then((resData) => {
        setUserData({
          name: formatText(resData.name),
          email: resData.email,
        });
      })
      .catch((err) => {
        setError(
          "Some server error occured. Try logging out and logging in back"
        );
      });
  }, [token, navigate]);

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const deleteAccountBtnClickHandler = () => {
    fetch(`${API_BASE_URL}/account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify({
        password: enteredPassword,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          return setError("Incorrect Password");
        }
        if (!response.ok) {
          return setError(
            "Some server error occured. Try logging out and logging in back"
          );
        }
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("username");
        return navigate("/login");
      })
      .catch((err) => {
        setError(
          "Some server error occured. Try logging out and logging in back"
        );
      });
    setShowDeleteAccountModal(false);
  };
  return (
    <section className={classes.section}>
      {showDeleteAccountModal && (
        <Modal
          title="Account Delete Confirmation"
          confirmText="Delete"
          confirmColor="red"
          onConfirm={deleteAccountBtnClickHandler}
          onCancel={() => {
            setShowDeleteAccountModal(false);
          }}
          submitable={true}
        >
          <Input
            title="Type your password here to delete your account"
            name="Email"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            style={{ width: "90%", marginLeft: "0.5rem" }}
            autoComplete="off"
          />
        </Modal>
      )}
      {error && (
        <Modal
          title="Error !!"
          confirmText="Okay"
          onConfirm={() => setError("")}
          onCancel={() => setError("")}
        >
          <h2>{error}</h2>
        </Modal>
      )}

      <table className={classes.table}>
        <caption>My Information</caption>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{userData.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{userData.email}</td>
          </tr>
        </tbody>
      </table>
      <Button
        variant="danger"
        className={classes.deleteAccountBtn}
        onClick={() => {
          setShowDeleteAccountModal(true);
        }}
      >
        <MdDeleteForever />
        <span>Delete My Account</span>
      </Button>
    </section>
  );
};

export default Profile;
