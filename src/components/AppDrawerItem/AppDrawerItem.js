import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import React from "react"
import { NavLink } from "react-router-dom"


export const AppDrawerItem = ({ text, to, children }) => {
    return (
        <NavLink to={to}>
            <ListItem button key={text}>
                <ListItemIcon>
                    {children}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </NavLink>
    )
}