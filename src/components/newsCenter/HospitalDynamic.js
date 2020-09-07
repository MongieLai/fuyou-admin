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

const Container = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    > div:nth-child(2){
        flex-grow:1;
        overflow-y:auto;
        > .panel-body{
            border-color: #cccccc !important;
        }
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
            { "U_ID": "XW-01", "C_TITLE": "公司粗暴发工作证后大批员工离职公司粗暴发工作证后大批员工离职公司粗暴发工作证后大批员工离职公司粗暴发工作证后大批员工离职公司粗暴发工作证后大批员工离职", "D_APPLYTIME": "2010-07-15", "N_LOOKTIME": "201", "C_PUBLISH_NAME": '信息部', "C_TYPES": "102", "C_IS_PUBLISH": "0", "D_UPDATETIME": '1998-01-31', "C_ADD_NAME": '曾轶可' },
            { "U_ID": "XW-01", "C_TITLE": "男子被顶引擎盖雨中疾驰", "D_APPLYTIME": "2010-07-15", "N_LOOKTIME": "201", "C_PUBLISH_NAME": '信息部', "C_TYPES": "102", "C_IS_PUBLISH": "0", "D_UPDATETIME": '1998-01-31', "C_ADD_NAME": '曾轶可' },
            { "U_ID": "XW-01", "C_TITLE": "阿娇头部受重伤被送医", "D_APPLYTIME": "2010-07-15", "N_LOOKTIME": "201", "C_PUBLISH_NAME": '信息部', "C_TYPES": "102", "C_IS_PUBLISH": "0", "D_UPDATETIME": '1998-01-31', "C_ADD_NAME": '曾轶可' },
            { "U_ID": "XW-01", "C_TITLE": "德约科维奇误伤裁判被取消美网资格", "D_APPLYTIME": "2010-07-15", "N_LOOKTIME": "201", "C_PUBLISH_NAME": '信息部', "C_TYPES": "102", "C_IS_PUBLISH": "0", "D_UPDATETIME": '1998-01-31', "C_ADD_NAME": '曾轶可' },
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
            <Container>
                <SearchBar>
                    <LinkButton iconCls="icon-add" onClick={() => { console.log(this.props.history.push('/newsCenter/hosplitDynamic/add')) }}>新增动态</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入标题:</span>
                    <TextBox inputId="tt1" placeholder="请输入用户名" style={{ width: 220 }}></TextBox>
                    <LinkButton iconCls="icon-search" plain>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain>重置</LinkButton>
                </SearchBar>
                <DataGrid data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center"></GridColumn>
                    <GridColumn sortable field="C_TITLE" title="标题" align="left" width={400}></GridColumn>
                    <GridColumn sortable field="D_APPLYTIME" title="添加时间" align="center" />
                    <GridColumn sortable field="C_PUBLISH_NAME" title="发布部门" align="center" />
                    <GridColumn sortable field="N_LOOKTIME" title="浏览量" align="center" />
                    <GridColumn sortable field="C_TYPES" title="类型" align="center" />
                    <GridColumn sortable field="C_IS_PUBLISH" title="发布状态" align="center" />
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" />
                    <GridColumn sortable field="D_UPDATETIME" title="操作人" align="center" />
                    <GridColumn field="C_STAT" title="用户状态" align="center"
                        render={({ row }) => (
                            row.C_STAT === `1` ? '正常' : '禁用'
                        )}></GridColumn>
                    <GridColumn title="操作" align="center" width={220}

                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                {row.C_IS_PUBLISH === 0 ? <LinkButton iconCls='icon-ok' style={{ marginRight: 4 }}>发布</LinkButton> : null}
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
            </Container>
        );
    }
}

export default User