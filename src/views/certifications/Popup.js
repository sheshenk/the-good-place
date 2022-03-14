
import React from 'react'
import { styled } from '@mui/material';


const Background  = styled.div`
    width:100%
    he
`


export const Popup = ({showPopup, setShowPopup}) => {
    return <>{showPopup ? <div>Modal </div> : null}</>;
};

