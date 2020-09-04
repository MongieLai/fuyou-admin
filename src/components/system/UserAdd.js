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
            heroes: [
                { value: 11, text: "Mr. Nice" },
                { value: 12, text: "Narco" },
                { value: 13, text: "Bombasto" },
                { value: 14, text: "Celeritas" },
                { value: 15, text: "Magneta" },
                { value: 16, text: "RubberMan" },
                { value: 17, text: "Dynama" },
                { value: 18, text: "Dr IQ" },
                { value: 19, text: "Magma" },
                { value: 20, text: "Tornado" }
            ]
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
        console.log(name,value)
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
        const { user, rules, heroes, roomList } = this.state;
        return (
            <AddUserWrapper>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.goBack() }} plain>返回</LinkButton>
                <h2>新增用户</h2>
                <Form ref={ref => this.form = ref}
                    model={user}
                    rules={rules}
                    onChange={this.handleChange.bind(this)} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors: errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="name" align="top">登陆用户名： </Label>
                        <TextBox style={{ width: 300 }} inputId="name" name="accountName" value={user.accountName}></TextBox>
                        {/* <div className="error">{this.getError('name')}</div> */}
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="email" align="top">登陆密码： </Label>
                        <TextBox style={{ width: 300 }} inputId="email" name="password" value={user.password}></TextBox>
                        {/* <div className="error">{this.getError('email')}</div> */}
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="hero" align="top">所属部门： </Label>
                        <ComboBox style={{ width: 300 }} inputId="hero" name='department' data={roomList} value={user.department}></ComboBox>
                        {/* <div className="error">{this.getError('hero')}</div> */}
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="email" align="top">姓名： </Label>
                        <TextBox style={{ width: 300 }} inputId="email" name="name" value={user.name}></TextBox>
                        {/* <div className="error">{this.getError('email')}</div> */}
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="email" align="top">性别： </Label>
                        <TextBox style={{ width: 300 }} inputId="email" name="gender" value={user.gender}></TextBox>
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