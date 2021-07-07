import React from 'react'
import { makeStyles , withStyles } from '@material-ui/core/styles';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Header from '../components/Header.jsx'


const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    text: {
        margin: 'auto',
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export default function Details(props) {

    const classes = useStyles();
    return (
        <AccordionDetails>
            <div className={classes.text} >
                <Header text={props.header} /> 
                {props.content}
            </div>
        </AccordionDetails>
    )
}