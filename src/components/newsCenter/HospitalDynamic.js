import React, { Component } from 'react'
import { DataGrid, GridColumn, Pagination, LinkButton } from 'rc-easyui';
import styled from 'styled-components';

const ActionsBar = styled.div`
    display:flex;
    padding:8px 8px 8px 20px;
    align-items:center;
    span{
        margin-right:10px;
    }
    &:hover{
        
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

class HospitalDynamic extends Component {
    constructor() {
        super();
        this.state = {
            data: this.getData(),
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

    componentDidMount = () => {

    }

    getData() {
        return [
            { "U_ID": "T01", "C_TITLE": "澳情报人员突击搜查中国记者住所", "D_APPLYTIME": "2018-07-08", "C_PUBLISH_NAME": "信息部", "N_LOOKTIME": "10001", "C_TYPES": "102", "C_IS_PUBLISH": 0, "D_UPDATETIME": "2016-08-07", "C_ADD_NAME": "张三" },
            { "U_ID": "T02", "C_TITLE": "马路积水铲车运送市民10元一位 新", "D_APPLYTIME": "2019-02-08", "C_PUBLISH_NAME": "信息部", "N_LOOKTIME": "4001", "C_TYPES": "102", "C_IS_PUBLISH": 1, "D_UPDATETIME": "2016-08-07", "C_ADD_NAME": "张三" },
            { "U_ID": "T03", "C_TITLE": "美国新冠肺炎超632万例", "D_APPLYTIME": "2011-01-08", "C_PUBLISH_NAME": "信息部", "N_LOOKTIME": "201", "C_TYPES": "102", "C_IS_PUBLISH": 1, "D_UPDATETIME": "2016-08-07", "C_ADD_NAME": "张三" },
            { "U_ID": "T04", "C_TITLE": "网易邮箱回应万茜被盗号事件", "D_APPLYTIME": "2016-10-08", "C_PUBLISH_NAME": "信息部", "N_LOOKTIME": "55001", "C_TYPES": "102", "C_IS_PUBLISH": 0, "D_UPDATETIME": "2016-08-07", "C_ADD_NAME": "张三" },
        ]
    }

    fuck = () => {

    }
    handelEdit = (row) => {
        console.log('你点了编辑按钮')
    }

    handelDelete = (row) => {
        console.log('你点了删除按钮')
    }

    handelPublish = () => {
        console.log('你点了发布按钮')
    }

    skipRouteToAdd = () => {
        this.props.history.push('/newsCenter/yydt/add')
    }

    render() {
        const { data, total, pageNumber, pageSize, layout } = this.state
        return (
            <Container style={{ padding: 4 }}>
                <ActionsBar>
                    <LinkButton iconCls="icon-add" plain onClick={() => this.skipRouteToAdd()}>新增医院动态</LinkButton>
                </ActionsBar>
                <div>
                    <button></button>
                </div>
                <DataGrid data={data}>
                    <GridColumn sortable field="U_ID" title="序号" align="center" />
                    <GridColumn field="C_TITLE" title="新闻标题" width={400} />
                    <GridColumn sortable field="D_APPLYTIME" title="添加时间" align="center" />
                    <GridColumn sortable field="C_PUBLISH_NAME" title="发布部门" align="center" />
                    <GridColumn sortable field="N_LOOKTIME" title="浏览量" align="center" />
                    <GridColumn sortable field="D_UPDATETIME" title="操作时间" align="center" />
                    <GridColumn sortable field="C_ADD_NAME" title="操作人" align="center" />
                    <GridColumn field="C_TYPES" title="类型" align="center" width={110}
                        render={({ row }) => (
                            row.C_TYPES === `102` ? '医院动态' : '-'
                        )} />
                    <GridColumn sortable field="C_IS_PUBLISH" title="发布状态" align="center" width={110}
                        render={({ row }) => (
                            row.C_IS_PUBLISH === 0 ? '未发布' : '已发布'
                        )} />
                    <GridColumn title="操作" align="center" width={220}
                        render={({ row }) => (
                            <div style={{ padding: 4 }}>
                                {row.C_IS_PUBLISH === 0 ? <LinkButton iconCls='icon-ok' onClick={() => this.handelPublish()} style={{ marginRight: 4 }}>发布</LinkButton> : null}
                                <LinkButton iconCls='icon-edit' onClick={() => this.handelEdit(row)} style={{ marginRight: 4 }}>编辑</LinkButton>
                                <LinkButton iconCls='icon-no' onClick={() => this.handelDelete(row)} > 删除</LinkButton>
                            </div>
                        )}
                    />
                </DataGrid>
                <Pagination
                    pageList={[50]}
                    total={total}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    layout={layout}
                    onPageChange={event => this.handlePageChange(event)}
                />
            </Container >
        );
    }
}

export default HospitalDynamic
