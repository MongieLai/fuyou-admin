import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, TextBox, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

// 最外层容器样式
const Container = styled.div` 
    height:100%;
    padding: 4px;
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
//添加查询栏
const ActionsBar = styled.div`
    display:flex;
    padding:8px 8px 8px 20px;
    align-items:center;
    span{
        margin-right:10px;
    }
`

class User extends Component {
    constructor() {
        super();
        this.state = {
            data: this.getData(),
            searchInputValue: '',
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

    getData = () => {
        return [
            { "U_ID": "XW-01", "C_NAME": "陈龙", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "chenlong", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "Nk-01", "C_NAME": "陈斐", "C_DEPARTMENT_NAME": "内科", "C_SEX": "1", "C_STAT": 0, "C_USER_NAME": "chenfei", "D_UPDATETIME": "2018-08-14" },
            { "U_ID": "FI-SW-01", "C_NAME": "赵雪有", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "zhaoxueyou", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "FI-SW-01", "C_NAME": "Koi", "C_DEPARTMENT_NAME": "胸外科", "C_SEX": "2", "C_STAT": 1, "C_USER_NAME": "limengjie", "D_UPDATETIME": "2018-09-10" }
        ]
    }

    handelEdit = (row) => {
        console.log('你点了编辑按钮')
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
        this.props.history.push('/system/yhgl/add')
    }

    render() {
        return (
            <Container>
                <ActionsBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => { this.skipRouteToAdd() }}>新增用户</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入用户名称:</span>
                    <TextBox onChange={searchInputValue => this.setState({ searchInputValue })} placeholder="请输入用户名称" style={{ width: 220 }} value={this.state.searchInputValue}></TextBox>
                    <LinkButton iconCls="icon-search" plain onClick={() => { this.handelSearch() }}>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain onClick={() => { this.handelResetSearch() }}>重置</LinkButton>
                </ActionsBar>
                <DataGrid data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center" />
                    <GridColumn sortable field="C_USER_NAME" title="用户名称" align="center" />
                    <GridColumn sortable field="C_NAME" title="姓名" align="center" />
                    <GridColumn field="C_SEX" title="性别" align="center"
                        render={({ row }) => (
                            row.C_SEX === `1` ? '男' : '女'
                        )}></GridColumn>
                    <GridColumn sortable field="C_DEPARTMENT_NAME" title="所属科室" align="center" />
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" width={110} />
                    <GridColumn field="C_STAT" title="用户状态" align="center" width={110}
                        render={({ row }) => (
                            row.C_STAT === `1` ? '正常' : '禁用'
                        )}></GridColumn>
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

export default User
