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
            { "U_ID": "XW-01", "C_NAME": "黎梦杰", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "Nk-01", "C_NAME": "陈斐", "C_DEPARTMENT_NAME": "内科", "C_SEX": "1", "C_STAT": 0, "C_USER_NAME": "chenfei", "D_UPDATETIME": "2018-08-14" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" }]
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
                    <LinkButton iconCls="icon-add" onClick={() => { console.log(this.props.history.push('/system/yhgl/add')) }}>新增用户</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入用户名称:</span>
                    <TextBox inputId="tt1" placeholder="请输入用户名" style={{ width: 220 }}></TextBox>
                    <LinkButton iconCls="icon-search" plain>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain>重置</LinkButton>
                </SearchBar>
                <DataGrid border={false} data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center"></GridColumn>
                    <GridColumn sortable field="C_USER_NAME" title="用户名称" align="center"></GridColumn>
                    <GridColumn sortable field="C_NAME" title="姓名" align="center"></GridColumn>
                    <GridColumn field="C_SEX" title="性别" align="center"
                        render={({ row }) => (
                            row.C_SEX === `1` ? '男' : '女'
                        )}></GridColumn>
                    <GridColumn sortable field="C_DEPARTMENT_NAME" title="所属科室" align="center"></GridColumn>
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" width={110} />
                    <GridColumn field="C_STAT" title="用户状态" align="center" width={110}
                        render={({ row }) => (
                            row.C_STAT === `1` ? '正常' : '禁用'
                        )}></GridColumn>
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
