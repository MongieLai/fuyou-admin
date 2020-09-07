import React from 'react';
import { Form, Label, TextBox, CheckBox, ComboBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

const AddUserWrapper = styled.div`
    padding:24px;
    h2{
        margin-top:18px;
        margin-bottom:18px;
        font-size:24px;
    }
    label{
        min-width:100px;
        text-align:right;
    }
`

const AddButton = styled.button`
    background:#1890ff;
    margin-left:100px;
    color:white;
    border-radius:4px;
    padding:10px;
    outline:none;
    border:none;
    cursor:pointer;
    &:hover{
        background:#40a9ff;
    }
`

const FormItem = styled.div`
    display:flex;
    align-items:center;
`
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            operateUserName: '王五', //sestion获取当前用户登陆账号名
            user: {
                accountName: null,
                password: null,
                department: null,
                name: '',
                gender: null
            },
            rules: {
                accountName: "required",
                password: "required",
                department: "required",
                name: "required",
                gender: "required"
            },
            errors: {},
        }
    }
    getError(name) {
        const { errors } = this.state;
        return errors[name] && errors[name].length
            ? errors[name][0]
            : null;
    }
    hasError(name) {
        return this.getError(name) != null;
    }
    handleChange(name, value) {
        console.log(name, value)
        let user = Object.assign({}, this.state.user);
        user[name] = value;
        this.setState({ user: user })
    }
    handleSubmit() {
        this.form.validate(errors => {
            // ...
        })
    }
    render() {
        const { user, rules, heroes, operateUserName } = this.state;
        return (
            <AddUserWrapper>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.goBack() }} plain>返回</LinkButton>
                <h2>新增动态</h2>
                <Form ref={ref => this.form = ref}
                    model={user}
                    rules={rules}
                    onChange={this.handleChange.bind(this)} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors: errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="name" align="top">标题： </Label>
                        <TextBox onFocus={() => { console.log(111) }} style={{ width: 300 }} inputId="name" name="accountName" value={user.accountName}></TextBox>
                        {/* <div className="error">{this.getError('name')}</div> */}
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">内容： </Label>
                        <TextBox disabled style={{ width: 300 }} value={operateUserName}></TextBox>
                        {/* <div className="error">{this.getError('email')}</div> */}
                    </FormItem>
                    <AddButton onClick={() => { console.log(111) }}>添加</AddButton>
                </Form>
                {/* <p>{JSON.stringify(user)}</p> */}
            </AddUserWrapper>
        );
    }
}

export default App;