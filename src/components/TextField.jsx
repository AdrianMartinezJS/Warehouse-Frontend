import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    TextField: {
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}));


export default function Field(props) {
    const classes = useStyles()

    return(
        <TextField 
            className={classes.TextField} 
            type={props.type} 
            id={props.what} 
            label={props.label} 
            variant="outlined" 
            onChange={(e) => { props.onChange(e) }} 
            value={props.what} 
        />
    )
}