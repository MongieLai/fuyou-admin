import React from 'react';
import { Form, Label, TextBox, CheckBox, ComboBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

const AddRoomWrapper = styled.div`
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
            roomInfo: {
                roomName: ``
            },
            rules: {
                roomName: "required"
            },
            errors: {
                accountName: 'required'
            },
        }
    }
    getError = (name) => {
        const { errors } = this.state;
        return errors[name] && errors[name].length
            ? errors[name][0]
            : null;
    }


    handleChange = (name, value) => {
        console.log(name, value)
        let roomInfo = Object.assign({}, this.state.roomInfo);
        roomInfo[name] = value;
        this.setState({ roomInfo })
    }

    handleSubmit = () => {
        this.form.validate(errors => {
            // ...
        })
    }
    render() {
        const { roomInfo, rules, operateUserName } = this.state;
        return (
            <AddRoomWrapper>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.goBack() }} plain>返回</LinkButton>
                <h2>新增科室</h2>
                <Form ref={ref => this.form = ref}
                    model={roomInfo}
                    rules={rules}
                    onChange={this.handleChange} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label htmlFor="name" align="top">科室名称： </Label>
                        <TextBox style={{ width: 300 }} inputId="name" name="roomName" value={roomInfo.roomName}></TextBox>
                        <div className="error">{this.getError('roomName')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">操作人： </Label>
                        <TextBox disabled style={{ width: 300 }} value={operateUserName}></TextBox>
                        {/* <div className="error">{this.getError('email')}</div> */}
                    </FormItem>
                    <AddButton>添加</AddButton>
                </Form>
            </AddRoomWrapper>
        );
    }
}

export default App;