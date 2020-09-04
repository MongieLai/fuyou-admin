import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    height:100%;
    background:#1890ff;
    img{
        padding:5px;
    }
`
export default class Header extends React.Component {
    render() {
        return (
            <HeaderWrapper>
                <img src='/images/egolure-logo.png' alt='logo'></img>
            </HeaderWrapper >
        )
    }
}