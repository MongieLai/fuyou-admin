import React from 'react';
import { Form, Label, TextBox, CheckBox, ComboBox, FileButton, LinkButton } from 'rc-easyui';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const FormItem = styled.div`
    display:flex;
    align-items:center;
`
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            operateUserName: '王五', //sestion获取当前用户账号名
            issueDepartment: '信息部', //sestion获取当前用户所属部门
            fielName: '',
            user: {
                accountName: null,
                password: null,
                department: null,
                name: '',
                gender: null
            },
            fileList: [],
            sortable: 0,
            rules: {
                accountName: "required",
                password: "required",
                department: "required",
                name: "required",
                gender: "required"
            },
            errors: {},
            sortdata: [{ value: 0, text: 0 },
            { value: 1, text: 1 }],
            value: null
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
    // handleChange(name, value) {
    //     console.log(name, value)
    //     let user = Object.assign({}, this.state.user);
    //     user[name] = value;
    //     this.setState({ user: user })
    // }
    handleSubmit() {
        this.form.validate(errors => {
            // ...
        })
    }
    handleSelect(e) {
        console.log(e)
        // const a = window.URL.createObjectURL(e[0].name)
        this.setState({ filename: e[0].name });
    }


    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = (e) => {
        console.log(e)
        // return this.setState({ fileList })
    }
    render() {
        const { user, rules, heroes, operateUserName, issueDepartment, fielName } = this.state;
        const { previewVisible, previewImage, fileList, previewTitle, } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <AddUserWrapper>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.goBack() }} plain>返回</LinkButton>
                <h2>新增轮播图片</h2>
                <Form ref={ref => this.form = ref}
                    model={user}
                    rules={rules}
                    onChange={this.handleChange.bind(this)} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors: errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">选择本地图片： </Label>
                        <>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={this.handleCancel}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">发布部门： </Label>
                        <TextBox disabled style={{ width: 300 }} value={issueDepartment}></TextBox>
                        {/* <div className="error">{this.getError('email')}</div> */}
                    </FormItem>

                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">操作人： </Label>
                        <TextBox disabled style={{ width: 300 }} value={operateUserName}></TextBox>
                        {/* <div className="error">{this.getError('email')}</div> */}
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">是否排序： </Label>
                        <ComboBox
                            inputId="c1"
                            data={this.state.sortdata}
                            value={this.state.value}
                            onChange={(value) => this.setState({ value })}
                        />
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