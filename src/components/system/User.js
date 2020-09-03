import React, { Component } from 'react'
import { DataGrid, GridColumn, Form, Dialog, TextBox, NumberBox, Label, LinkButton, ButtonGroup } from 'rc-easyui';
import styled from 'styled-components';
import { Modal, Button } from 'antd';

const DataWrapper = styled.div`
    display:flex;
    flex-direction:column;
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
            confirmLoading: false,
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

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    getData() {
        return [
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
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
            <div>
                <div>
                    <span>输入用户名称:</span>
                    <input placeholder='输入后点击查询按钮查询'></input>
                    <Button type="primary" onClick={this.showModal}>
                        查询
                    </Button>
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
                </div>
                <DataGrid border={false} data={this.state.data} style={{ border: `1px solid #cccccc` }}>
                    <GridColumn field="U_ID" title="序号" align="center"></GridColumn>
                    <GridColumn field="C_USER_NAME" title="用户名称" align="center"></GridColumn>
                    <GridColumn field="C_NAME" title="姓名" align="center"></GridColumn>
                    <GridColumn field="C_SEX" title="性别" align="center"
                        render={({ row }) => (
                            row.C_SEX === 1 ? '男' : '女'
                        )}></GridColumn>
                    <GridColumn field="C_DEPARTMENT_NAME" title="所属科室" align="center"></GridColumn>
                    <GridColumn field="D_UPDATETIME" title="操作时间" align="center" width={110} />
                    <GridColumn field="C_STAT" title="用户状态" align="center" width={110}
                        render={({ row }) => (
                            row.C_STAT === 1 ? '正常' : '禁用'
                        )}></GridColumn>
                    <GridColumn field="操作" title="操作" align="center" width={110}

                        render={({ row }) => (
                            <div>
                                <ButtonGroup>
                                    <LinkButton>编辑</LinkButton>
                                    <LinkButton>删除</LinkButton>
                                </ButtonGroup>
                            </div>
                        )}
                    />
                </DataGrid>
            </div>
        );
    }
}

export default User
