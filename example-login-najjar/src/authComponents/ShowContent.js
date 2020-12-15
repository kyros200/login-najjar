import React from 'react';
import Context from './Context';
const ShowContent = (props) => {
    return <Context.Consumer>
        {(user) => {
            return (user ? (props.show ? props.children : <></>) : (!props.show ? props.children : <></>))
        }}
    </Context.Consumer>
}
export default ShowContent;