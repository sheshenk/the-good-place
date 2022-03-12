import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

export const AppDrawerItem = ({ text, to, children }) => {
    return (
        <ListItem button key={text} component={Link} to={to}>
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
}