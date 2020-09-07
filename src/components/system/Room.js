import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, TextBox, NumberBox, Label, LinkButton, ButtonGroup } from 'rc-easyui';
import styled from 'styled-components';

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

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            rules: {
                'itemid': 'required',
                'name': ['required', 'length[5,10]']
            },
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
            { "U_ID": "K001", "C_DEPARTMENT_NAME": "胸外科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K002", "C_DEPARTMENT_NAME": "内科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K003", "C_DEPARTMENT_NAME": "外科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K004", "C_DEPARTMENT_NAME": "体检科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K005", "C_DEPARTMENT_NAME": "五官科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
            { "U_ID": "K006", "C_DEPARTMENT_NAME": "血管科", "C_ADD_NAME": "陈三", "D_UPDATETIME": "2018-09-10" },
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
        this.props.history.push('/system/ksgl/add')
    }

    render() {
        return (
            <Container>
                <SearchBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => { this.skipRouteToAdd() }}>新增科室</LinkButton>
                    <span style={{ marginLeft: 24 }}>请输入科室名称:</span>
                    <TextBox onChange={searchInputValue => this.setState({ searchInputValue })} placeholder="请输入科室名称" style={{ width: 220 }} value={this.state.searchInputValue}></TextBox>
                    <LinkButton iconCls="icon-search" plain onClick={() => { this.handelSearch() }}>查询</LinkButton>
                    <LinkButton iconCls="icon-reload" plain onClick={() => { this.handelResetSearch() }}>重置</LinkButton>
                </SearchBar>
                <DataGrid data={this.state.data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center"></GridColumn>
                    <GridColumn sortable field="C_DEPARTMENT_NAME" title="科室名称" align="center"></GridColumn>
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center"></GridColumn>
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
            </Container>
        );
    }
}

export default Room
