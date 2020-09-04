import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, Form, Dialog, TextBox, NumberBox, Label, LinkButton, ButtonGroup } from 'rc-easyui';
import styled from 'styled-components';
import { Modal, Button } from 'antd';

const SearchBar = styled.div`
    display:flex;
    padding:8px 8px 8px 20px;
    align-items:center;
    span{
        margin-right:10px;
    }
`

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            editingRow: null,
            model: {},
            rules: {
                'itemid': 'required',
                'name': ['required', 'length[5,10]']
            },
            errors: {},
            title: '',
            closed: true,
            ModalText: 'Content of the modal',
            visible: false,
            defaultVisible: true,
            confirmLoading: false,
            pageNumber: 1,
            pageSize: 50,
            total: 50,
            layout: [
                "list",
                "first",
                "prev",
                "links",
                "next",
                "last",
            ],
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handelDelete = (row) => {
        console.log(row)
        this.setState({
            visible: true,
        });
    };
    getData() {
        return [
            { "U_ID": "K001", "C_DEPARTMENT_NAME": "胸外科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K002", "C_DEPARTMENT_NAME": "内科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K003", "C_DEPARTMENT_NAME": "外科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K004", "C_DEPARTMENT_NAME": "体检科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K005", "C_DEPARTMENT_NAME": "五官科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K006", "C_DEPARTMENT_NAME": "血管科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
        ]
    }
    getError(name) {
        const { errors } = this.state;
        return errors[name] && errors[name].length
            ? errors[name][0]
            : null;
    }
    editRow(row) {
        this.setState({
            editingRow: row,
            model: Object.assign({}, row),
            title: 'Edit',
            closed: false
        });
    }
    saveRow() {
        this.form.validate(() => {
            if (this.form.valid()) {
                let row = Object.assign({}, this.state.editingRow, this.state.model);
                let data = this.state.data.slice();
                let index = data.indexOf(this.state.editingRow);
                data.splice(index, 1, row);
                this.setState({
                    data: data,
                    closed: true
                })
            }
        })
    }
    deleteRow(row) {
        this.setState({
            data: this.state.data.filter(r => r !== row)
        })
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div style={{ padding: 4 }}>
                <SearchBar>
                    <LinkButton iconCls="icon-add" onClick={() => { console.log(this.props.history.push('/system/ksgl/add')) }}>新增科室</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入科室名称:</span>
                    <TextBox inputId="tt1" placeholder="请输入科室名" style={{ width: 220 }}></TextBox>
                    <LinkButton iconCls="icon-search" plain>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain>重置</LinkButton>
                </SearchBar>
                <DataGrid border={false} data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center"></GridColumn>
                    <GridColumn sortable field="C_DEPARTMENT_NAME" title="科室名称" align="center"></GridColumn>
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center"></GridColumn>
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" width={110} />
                    <GridColumn title="操作" align="center" width={150}
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                <LinkButton iconCls='icon-edit' style={{ marginRight: 4 }}>编辑</LinkButton>
                                <LinkButton iconCls='icon-no' onClick={() => this.handelDelete(row)} > 删除</LinkButton>
                            </div>
                        )}
                    />
                </DataGrid>
                <Modal
                    title="删除确认"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText={'确认'}
                    cancelText={'取消'}
                >
                    <p>{`确认要删除该用户吗？`}</p>
                </Modal>
                <Pagination
                    pageList={[50]}
                    total={this.state.total}
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    layout={this.state.layout}
                    onPageChange={event => this.handlePageChange(event)}
                />
            </div >
        );
    }
}

export default User
