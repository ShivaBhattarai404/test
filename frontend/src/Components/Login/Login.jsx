import React from 'react'
import classes from "./Login.module.css";
import Card from '../UI/Card/Card';
import { Form } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const Login = () => {
  return (
    <div className={classes.container}>
        <Card className={classes.form}>
            <h1 className={classes.title}>Login</h1>
            <Form method='POST'>
                <Input title="Email" type="email" name="email" />
                <Input title="Password" type="password" name="password" />
                <Button type="submit">Login</Button>
            </Form>
        </Card>
    </div>
  )
}

export default Login