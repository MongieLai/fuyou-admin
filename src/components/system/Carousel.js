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

class Department extends Component {
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
    //     U_ID
    // C_BANNER_NAME
    // D_ADDTIME
    // C_IS_DEL
    // C_ADD_NAME
    // N_ORDERS
    // C_IS_PUBLISH
    // D_PUBLISHTIME
    // C_PUBLISH_NAME

    getData() {
        return [
            { "U_ID": "T01", "C_BANNER_NAME": "三八妇女宣传图", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "0" },
            { "U_ID": "T02", "C_BANNER_NAME": "宣传图", "C_ADD_NAME": "李四", "D_ADDTIME": "2018-09-10", "C_IS_PUBLISH": "1" },
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
        const { visible, confirmLoading } = this.state;
        return (
            <Container style={{ padding: 4 }}>
                <SearchBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => { console.log(this.props.history.push('/system/lbgl/add')) }}>新增轮播图片</LinkButton>
                </SearchBar>
                <DataGrid data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center"></GridColumn>
                    <GridColumn sortable field="C_BANNER_NAME" title="图片名称" align="center"></GridColumn>
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center"></GridColumn>
                    <GridColumn sortable field="D_ADDTIME" title="操作时间" align="center" width={110} />
                    <GridColumn sortable field="C_IS_PUBLISH" title="发布状态" align="center" width={110}
                        render={({ row }) => (
                            row.C_IS_PUBLISH === `0` ? '未发布' : '已发布'
                        )} />
                    <GridColumn title="操作" align="center" width={220}
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                {row.C_IS_PUBLISH === '0' ? <LinkButton iconCls='icon-ok' style={{ marginRight: 4 }}>发布</LinkButton> : null}
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
            </Container >
        );
    }
}

export default Department
