import React from 'react';
import { Form, Label, TextBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

const Container = styled.div`
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

const RedStart = styled.span`
    color:red;
    padding:0 4px 0 0;
`

const verifyFields = {
    roomName: `科室名称`
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            operateUserName: '王五', //sestion获取当前用户登陆账号名
            roomInfo: {
                roomName: ``
            },
            rules: {
                roomName: "required"
            },
            errors: {
            },
        }
    }

    handleChange = (name, value) => {
        console.log(name, value)
        let roomInfo = Object.assign({}, this.state.roomInfo);
        roomInfo[name] = value;
        this.setState({ roomInfo })
    }

    submitForm = (event) => {
        event.preventDefault()
        // const { roomInfo } = this.state
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
        const { roomInfo, rules, operateUserName } = this.state;
        return (
            <Container>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.push('/system/ksgl') }} plain>返回</LinkButton>
                <h2>新增科室</h2>
                <Form ref={ref => this.form = ref}
                    model={roomInfo}
                    rules={rules}
                    onSubmit={(event) => { this.submitForm(event) }}
                    onChange={this.handleChange} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="name" align="top"><RedStart>*</RedStart>科室名称： </Label>
                        <TextBox style={{ width: 300 }} inputId="name" name="roomName" value={roomInfo.roomName}></TextBox>
                        <div style={{ marginLeft: 8, color: 'red' }} >{this.getErrorMessage('roomName')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">操作人： </Label>
                        <TextBox disabled style={{ width: 300 }} value={operateUserName}></TextBox>
                    </FormItem>
                    <AddButton>添加</AddButton>
                </Form>
            </Container>
        );
    }
}

export default App;