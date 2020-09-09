import React from 'react'
// import styled from 'styled-components'
// import { SideMenu, LinkButton, Tree } from 'rc-easyui'

// import { NavLink, HashRouter as Router, withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';
const { SubMenu } = Menu;

// const NavWrapper = styled.div`
//     height:100%;
// `

// const SidebarWrapper = styled.div``

// const routeMap = [
//     { path: '/home', text: '售后服务申请单' },
//     { path: '/xxx', text: '微信用户信息' },
//     { path: '/aaa', text: '售后历史进度查询' },
//     { path: '/sss', text: '客户信息' },
//     { path: '/ddd', text: '项目信息管理' },
//     { path: '/fff', text: '用户' },
//     { path: '/ggg', text: '角色' },
//     { path: '/hhh', text: '用户角色' },
// ]

// export default class Header extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             selection: null,
//             menus:
//                 [
//                     {
//                         text: "系统管理",
//                         state: "open",
//                         state: "open", selected: true,
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "用户管理"
//                             },
//                             {
//                                 text: "科室管理"
//                             },
//                             {
//                                 text: "部门管理",
//                             },
//                             {
//                                 text: "轮播管理",
//                             }
//                         ]
//                     },
//                     {
//                         text: "新闻中心",
//                         state: "open",
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "医院动态"
//                             },
//                             {
//                                 text: "通知公告"
//                             },
//                             {
//                                 text: "视频新闻",
//                             }
//                         ]
//                     },
//                     {
//                         text: "护理园地",
//                         state: "open",
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "护理培训"
//                             }
//                         ]
//                     },
//                     {
//                         text: "健康教育",
//                         state: "open",
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "讲座通知"
//                             },
//                             {
//                                 text: "健康知识"
//                             }
//                         ]
//                     },
//                     {
//                         text: "科研教学",
//                         state: "open",
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "科研动态"
//                             },
//                             {
//                                 text: "学习成果"
//                             },
//                             {
//                                 text: "学习班"
//                             }
//                         ]
//                     },
//                     {
//                         text: "党群建设",
//                         state: "open",
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "党建天地"
//                             },
//                             {
//                                 text: "工会天地"
//                             },
//                             {
//                                 text: "团务天地"
//                             }
//                         ]
//                     },
//                     {
//                         text: "院务公开",
//                         iconCls: "icon-sum"
//                     },
//                     {
//                         text: "联系我们",
//                         iconCls: "icon-more",
//                         children: [
//                             {
//                                 text: "人才招聘"
//                             },
//                             {
//                                 text: "学习成果"
//                             },
//                             {
//                                 text: "学习班",
//                                 href: '/klkl'
//                             }
//                         ]
//                     }
//                 ],
//             collapsed: false,

//         }
//     }

//     handleClick() {
//         this.setState({
//             collapsed: !this.state.collapsed,
//             width: this.state.collapsed ? 200 : 50
//         })
//     }
//     render() {
//         return (
//             <SidebarWrapper>
//                 {/* <Tree data={initialState}></Tree> */}
//                 <NavWrapper>
//                     <Router>
//                         <SideMenu style={{ width: this.state.width }}
//                             border={false}
//                             renderCollapsed={e => console.log(e)}
//                             data={this.state.menus}
//                             collapsed={this.state.collapsed}
//                             onSelectionChange={(selection) => this.setState({ selection: selection })}
//                         />

//                     </Router>
//                 </NavWrapper>
//             </SidebarWrapper >
//         )
//     }
// }

export default class Sider extends React.Component {
    handleClick = e => {
        console.log('click ', e);
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['yhgl']}
                defaultOpenKeys={['system']}
                mode="inline"
                style={{ width: '100% ' }}
            >
                <SubMenu
                    key="system"
                    title={`系统管理`}
                >
                    <Menu.Item key="yhgl"><NavLink to='/system/yhgl'>用户管理</NavLink></Menu.Item>
                    <Menu.Item key="ksgl"><NavLink to='/system/ksgl'>科室管理</NavLink></Menu.Item>
                    <Menu.Item key="mbgl"><NavLink to='/system/bmgl'>部门管理</NavLink></Menu.Item>
                    <Menu.Item key="lbgl"><NavLink to='/system/lbgl'>轮播管理</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu
                    key="a"
                    title={`新闻中心`}
                >
                    <Menu.Item key="yydt"><NavLink to='/newsCenter/yydt'>医院动态</NavLink></Menu.Item>
                    <Menu.Item key="tzgg"><NavLink to='/newsCenter/tzgg'>通知公告</NavLink></Menu.Item>
                    <Menu.Item key="spxw"><NavLink to='/newsCenter/spxw'>视频新闻</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu
                    key="s"
                    title={`护理园地`}
                >
                    <Menu.Item key="hlpx">护理培训</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="d"
                    title={`健康教育`}
                >
                    <Menu.Item key="jztz">讲座通知</Menu.Item>
                    <Menu.Item key="jkzs">健康知识</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}