import React from 'react';
import { Form as XXX, Label, TextBox, PasswordBox, ComboBox, LinkButton } from 'rc-easyui';
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
    padding:12px;
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

const verifyFields = {
    accountName: `用户登陆名`,
    password: '登陆密码',
    department: '所属部门',
    name: '姓名',
    gender: '性别'
}

const RedStart = styled.span`
    color:red;
    padding:0 4px 0 0;
`

class UserAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            genderList: [ //1男，2女
                { value: 1, text: '男' },
                { value: 2, text: '女' }
            ],
            roomList: [
                { value: 1, text: "胸外科" },
                { value: 2, text: "内科" },
                { value: 3, text: "体检科" },
                { value: 4, text: "血液科" },
                { value: 4, text: "五官科" },
                { value: 4, text: "儿童心理科" },
                { value: 4, text: "皮肤科" },
                { value: 4, text: "血液科" },
                { value: 4, text: "血液科" },
                { value: 5, text: "骨科" }
            ],
            userInfo: {
                accountName: '',
                password: '',
                department: '',
                name: '',
                gender: ''
            },
            rules: {
                accountName: "required",
                password: "required",
                department: "required",
                name: "required",
                gender: "required"
            },
            errors: {} //校验的错误信息对象
        }
    }

    handleChange = (name, value) => { //from表单里的元素发生值改变时触发
        console.log(name, value)
        let userInfo = { ...this.state.userInfo };
        userInfo[name] = value;
        this.setState({ userInfo })
    }

    submitForm = (event) => {
        event.preventDefault()
        // const { userInfo } = this.state
        if (this.state.errors) {
            return
        }
    }

    getErrorMessage = (name) => {
        const { errors } = this.state;
        if (!errors) { return }
        return errors[name] ? `${verifyFields[name]}不能为空` : null;
    }

    render() {
        const { userInfo, rules, roomList, genderList } = this.state;
        return (
            <AddUserWrapper>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.goBack() }} plain>返回</LinkButton>
                <h2>新增用户</h2>
                <XXX
                    ref={ref => this.form = ref}
                    model={userInfo}
                    onSubmit={(event) => { this.submitForm(event) }}
                    rules={rules}
                    onChange={this.handleChange.bind(this)} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors: errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="name" align="top"><RedStart>*</RedStart>登陆用户名： </Label>
                        <TextBox style={{ width: 300 }} name="accountName" value={userInfo.accountName}></TextBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('accountName')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="email" align="top"><RedStart>*</RedStart>登陆密码： </Label>
                        <PasswordBox style={{ width: 300 }} name="password" value={userInfo.password}></PasswordBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('password')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="hero" align="top"><RedStart>*</RedStart>所属部门： </Label>
                        <ComboBox style={{ width: 300 }} name='department' data={roomList} value={userInfo.department}></ComboBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('department')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="email" align="top"><RedStart>*</RedStart>姓名： </Label>
                        <TextBox style={{ width: 300 }} name="name" value={userInfo.name}></TextBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('name')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="email" align="top"><RedStart>*</RedStart>性别： </Label>
                        <ComboBox style={{ width: 300 }} name='gender' data={genderList} value={userInfo.gender}></ComboBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('gender')}</div>
                    </FormItem>
                    <AddButton>添加</AddButton>
                </XXX>
            </AddUserWrapper>
        );
    }
}

export default UserAdd;