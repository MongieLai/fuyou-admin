import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, TextBox, PasswordBox, LinkButton } from 'rc-easyui';
const LoginWrapper = styled.div`
    background:url('/images/login-wapper.jpg') no-repeat;
    min-height:100vh;
    position:relative;
    .login-container{
        position:absolute;
        top:50%;
        left:50%;
        background:white;
        border-radius:8px;
        height:380px;
        width:500px;
        transform:translate(-50%,-50%);
        display:flex;
        align-items:center;
        justify-content:center;
        .input-dis{
            width:100%;
        }
        .login-button{
            width:100%;
            background:#3080da;
            color:white;
        }

    }
`

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: null,
                password: null
            }
        }
    }

    handleChange = (name, value) => {
        let user = this.state.user;
        user[name] = value;
        this.setState({ user: user })
    }

    submitLogin = ({ username, password }) => {
        console.log(username)
        console.log(password)
        //发送登录请求
        if (true) {
            console.log(this.props.history.push('/'))
        }
    }
    render() {
        return (
            <LoginWrapper>
                <div className='login-container'>
                    <Form model={this.state.user} onChange={this.handleChange}>
                        <img height={200} style={{ marginBottom: 10, borderRadius: `50%` }} src='/images/login-wapper.jpg'></img>
                        <div style={{ marginBottom: 20 }}>
                            <TextBox name="username" className='input-dis' value={this.state.user.username} placeholder="请输入账号" iconCls="icon-man"></TextBox>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <PasswordBox name="password" className='input-dis' value={this.state.user.password} placeholder="请输入密码" iconCls="icon-lock"></PasswordBox>
                        </div>
                        <div>
                            <LinkButton className="login-button" onClick={() => this.submitLogin(this.state.user)}>登录</LinkButton>
                        </div>
                    </Form>
                </div>
            </LoginWrapper >
        )
    }
}

export default Login
