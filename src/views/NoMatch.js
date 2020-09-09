import React, { Component } from 'react'
import styled from 'styled-components'
const Container = styled.div`
    background:#f6f8fd;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    p{
        font-size:64px;
        font-weight:bolder;
        color:#484848;
    }
`
export class NoMatch extends Component {
    render() {
        return (
            <Container>
                <div>
                    <p>404</p>
                    <p>页面不存在</p>
                </div>
            </Container>
        )
    }
}

export default NoMatch
