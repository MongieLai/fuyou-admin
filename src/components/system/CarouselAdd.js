import React from 'react';
import { Form, Label, TextBox, ComboBox, LinkButton } from 'rc-easyui';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

const RedStart = styled.span`
    color:red;
    padding:0 4px 0 0;
`

const verifyFields = {
    carouselPicture: `上传图片`,
    isSort: '是否排序'
}

class CarouselAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            operateUserName: '王五', //sestion获取当前用户账号名
            issueDepartment: '信息部', //sestion获取当前用户所属部门
            errors: {},
            carouselInfo: {
                carouselPicture: null,
                isSort: null
            },
            rules: {
                isSort: "required",
                carouselPicture: 'required'

            },
            sortList: [
                { value: 1, text: '是' },
                { value: 0, text: '否' }
            ],
            //上传文件
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
        }
    }

    getErrorMessage = (name) => {
        const { errors } = this.state;
        if (!errors) { return }
        return errors[name] ? `${verifyFields[name]}不能为空` : null;
    }

    //上传文件
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

    handlePicChange = ({ fileList }) => {
        this.setState({ fileList, carouselInfo: { ...this.state.carouselInfo, carouselPicture: fileList[0] } })
    }

    handleChange = (name, value) => {
        console.log(name, value)
        let carouselInfo = { ...this.state.carouselInfo };
        carouselInfo[name] = value;
        this.setState({ carouselInfo })
    }

    submitForm = (event) => {
        event.preventDefault()
        const { carouselInfo } = this.state
        if (this.state.errors) {
            return
        }
        console.log(carouselInfo)
    }
    render() {
        const { rules, operateUserName, issueDepartment, previewVisible, previewImage, sortList, fileList, previewTitle, carouselInfo } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Container>
                <LinkButton iconCls="icon-back" onClick={() => { this.props.history.push('/system/lbgl') }} plain>返回</LinkButton>
                <h2>新增轮播图片</h2>
                <Form
                    ref={ref => this.form = ref}
                    model={carouselInfo}
                    onSubmit={(event) => { this.submitForm(event) }}
                    rules={rules}
                    onChange={this.handleChange} //隐式传递name和value
                    onValidate={(errors) => this.setState({ errors: errors })}
                >
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top"><RedStart>*</RedStart>选择本地图片： </Label>
                        <>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handlePicChange}
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
                    <FormItem style={{ marginBottom: '20px', marginTop: '-20px' }}>
                        <TextBox style={{ display: 'none' }} name='carouselPicture' value={carouselInfo.carouselPicture}></TextBox>

                        <div style={{ marginLeft: 140, color: 'red' }}>{this.getErrorMessage('carouselPicture')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top"><RedStart>*</RedStart>是否排序： </Label>
                        <ComboBox style={{ width: "25%" }} name='isSort' data={sortList} value={carouselInfo.isSort}></ComboBox>
                        <div style={{ marginLeft: 8, color: 'red' }}>{this.getErrorMessage('isSort')}</div>
                    </FormItem>
                    <FormItem style={{ marginBottom: '20px' }}>
                        <Label align="top">发布部门： </Label>
                        <TextBox disabled style={{ width: "25%" }} value={issueDepartment}></TextBox>
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

export default CarouselAdd;