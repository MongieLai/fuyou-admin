import React from 'react';
import { Form, Label, TextBox, ComboBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

const Container = styled.div`
    padding:24px;
    h2{
        margin-top:18px;
        margin-bottom:18px;
        font-size:24px;
    }
    label{
        min-width:150px;
        text-align:right;
    }
`

const AddButton = styled.button`
    background:#1890ff;
    margin-left:140px;
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
    title: `动态标题`,
    content: '动态内容',
    isSort: '是否排序',
    type: '类型'
}

class NotificationAnnouncementAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            operateUserName: '王五', //sestion获取当前用户账号名
            publishDepartment: '信息部', //sestion获取当前用户所属部门
            newsType: '通知公告',
            errors: {},
            hospitalDynamicInfo: {
                title: '',
                addTime: null,
                content: '',
                isSort: null,
                type: null
            },
            rules: {
                isSort: "required",
                title: 'required',
                content: 'required'
            },
            sortList: [
                { value: 1, text: '是' },
                { value: 0, text: '否' }
            ]
        }
    }

    getErrorMessage = (name) => {
        const { errors } = this.state;
        if (!errors) { return }
        return errors[name] ? `${verifyFields[name]}不能为空` : null;
    }

    handleChange = (name, value) => {
        console.log(name, value)
        let hospitalDynamicInfo = { ...this.state.hospitalDynamicInfo };
        hospitalDynamicInfo[name] = value;
        this.setState({ hospitalDynamicInfo })
    }

    submitForm = (event) => {
        event.preventDefault()
        const { hospitalDynamicInfo } = this.state
        if (this.state.errors) {
            return
        }
        console.log(hospitalDynamicInfo)
    }

    handelTextAreaChange = (e) => {
        console.log(e)
    }
    render() {
        const { rules, operateUserName, publishDepartment, sortList, hospitalDynamicInfo, newsType } = this.state;
        return (
            <Container>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.push('/newsCenter/yydt') }} plain>返回</LinkButton>
                <h2>新增通知公告</h2>
                <Form
                    ref={ref => this.form = ref}
                    model={hospitalDynamicInfo}
                    onSubmit={(event) => { this.submitForm(event) }}
                    rules={rules}
                    onChange={this.handleChange} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors: errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top"><RedStart>*</RedStart>公告标题： </Label>
                        <TextBox style={{ width: "50%" }} name='title' value={hospitalDynamicInfo.title}></TextBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('title')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top"><RedStart>*</RedStart>公告内容： </Label>
                        {/* <TextBox style={{ width: 300 }} name='content' value={hospitalDynamicInfo.content}></TextBox> */}
                        <TextBox style={{ width: "50%", height: 400 }} multiline name='content' value={hospitalDynamicInfo.content} />
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('content')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top"><RedStart>*</RedStart>是否排序： </Label>
                        <ComboBox style={{ width: "25%" }} name='isSort' data={sortList} value={hospitalDynamicInfo.isSort}></ComboBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('isSort')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">类型： </Label>
                        <TextBox disabled style={{ width: "25%" }} value={newsType}></TextBox>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">发布部门： </Label>
                        <TextBox disabled style={{ width: "25%" }} value={publishDepartment}></TextBox>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">操作人： </Label>
                        <TextBox disabled style={{ width: "25%" }} value={operateUserName}></TextBox>
                    </FormItem>
                    <AddButton>添加</AddButton>
                </Form>
            </Container>
        );
    }
}

export default NotificationAnnouncementAdd;