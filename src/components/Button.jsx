import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2),
        background: 'rgba(42,110,181,1)',
        color: '#fff',
        width: '90%',    
    }
}));

export default function MakeButton(props) {
    const classes = useStyles();
    let classe = props.className
    return (
        <Button
            variant="contained"
            color="default"
            className={classe ? classe : classes.button}
            startIcon={props.welches}
            onClick={(e) => { props.action(e) }}
        >
            {props.text}
        </Button>
    )

}
