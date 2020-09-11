import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, TextBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';
const ActionsBar = styled.div`
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
            searchInputValue: '123',
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
            ]
        }
    }

    getData() {
        return [
            { "U_ID": "B001", "C_DEPARTMENT_NAME": "急诊部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B002", "C_DEPARTMENT_NAME": "技术部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B003", "C_DEPARTMENT_NAME": "网络管理部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B001", "C_DEPARTMENT_NAME": "急诊部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B002", "C_DEPARTMENT_NAME": "技术部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B003", "C_DEPARTMENT_NAME": "网络管理部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B001", "C_DEPARTMENT_NAME": "急诊部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B002", "C_DEPARTMENT_NAME": "技术部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B003", "C_DEPARTMENT_NAME": "网络管理部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B001", "C_DEPARTMENT_NAME": "急诊部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B003", "C_DEPARTMENT_NAME": "网络管理部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B001", "C_DEPARTMENT_NAME": "急诊部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B002", "C_DEPARTMENT_NAME": "技术部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "B003", "C_DEPARTMENT_NAME": "网络管理部", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
        ]
    }

    handelEdit = (row) => {
        console.log('你点了编辑按钮')
        this.setState({ searchInputValue: 'jkljlkjkl' })

    }

    handelDelete = (row) => {
        console.log('你点了删除按钮')
    };

    handelSearch = () => {
        console.log('你点了查询按钮')
        const { searchInputValue } = this.state
        console.log(searchInputValue)
    }

    handelResetSearch = () => {
        console.log('你点了重置按钮')
    }

    skipRouteToAdd = () => {
        this.props.history.push('/system/bmgl/add')
    }

    render() {
        return (
            <Container style={{ padding: 4 }}>
                {this.state.searchInputValue}
                <ActionsBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => { console.log(this.props.history.push('/system/bmgl/add')) }}>新增部门</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入部门名称:</span>
                    <TextBox inputId="tt1" placeholder="请输入部门名" style={{ width: 220 }} onChange={(searchInputValue) => { this.setState({ searchInputValue }) }}></TextBox>
                    <LinkButton iconCls="icon-search" plain onClick={() => this.handelSearch()}>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain onClick={() => this.handelResetSearch()}>重置</LinkButton>
                </ActionsBar>
                <DataGrid data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center" />
                    <GridColumn sortable field="C_DEPARTMENT_NAME" title="部门名称" align="center" />
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center" />
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" width={110} />
                    <GridColumn title="操作" align="center" width={150}
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                <LinkButton iconCls='icon-edit' onClick={() => this.handelEdit(row)} style={{ marginRight: 4 }}>编辑</LinkButton>
                                <LinkButton iconCls='icon-no' onClick={() => this.handelDelete(row)} > 删除</LinkButton>
                            </div>
                        )}
                    />
                </DataGrid>
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
