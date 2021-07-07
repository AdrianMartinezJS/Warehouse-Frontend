import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Button from '../components/Button'
import $ from 'jquery'
import Details from '../components/AccordionDetails'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Rating from './Rating';
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgb(42,110,181,1)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

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
    },
    image: {
        width: '50%',
        height: 'auto'
    }
}));


export default function MakeAccordion(props) {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const history = useHistory()
    const guest = props.guest

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const url = 'https://cocktail-warehouse.herokuapp.com/product/'
    const urlLocal = 'http://localhost:5000/product/'

    const del = () => {
        $.ajax({
            url: `${urlLocal}${props.id}`,
            method: 'delete',
            success: (res) => {
                history.push('/')
                window.location.reload();
                store.addNotification({
                    message: res.message,
                    type: 'default',
                    container: 'bottom-center',
                    insert: 'top',
                    dismiss: {
                        duration: 4000
                    }
                })
            },
            error: (res) => {
                console.log(res)
                store.addNotification({
                    message: res.message,
                    type: 'danger',
                    container: 'bottom-center',
                    insert: 'top',
                    dismiss: {
                        duration: 4000
                    }
                })
            }
        })
    }
    const upd = () => {
        let data = [props.id, props.name, props.ingredients, props.description, props.picture]
        history.push({ data: data, pathname: '/UpdateCocktail' })
    }

    if (!guest) {
        return (
            <div>
                <Accordion square expanded={expanded === `panel${props.nummer}`} onChange={handleChange(`panel${props.nummer}`)}>
                    <AccordionSummary aria-controls={`panel${props.nummer}d-content`} id={`panel${props.nummer}d-header`}>
                        <h3 className={classes.text} >{props.name}</h3>
                        <Rating rating={props.rating} id={props.id}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.text} >
                            <img src={props.picture} className={classes.image} />
                        </div>
                    </AccordionDetails>
                    <Details content={props.ingredients} header="INGREDIENTS" />
                    <Details content={props.description} header="DESCRIPTION" />
                    <Button welches={<DeleteIcon />} text="Delete" action={del} />
                    <Button welches={<BorderColorIcon />} text="Edit" action={upd} />
                </Accordion>
            </div>
        )
    } else if (guest) {
        return (
            <div>
                <Accordion square expanded={expanded === `panel${props.nummer}`} onChange={handleChange(`panel${props.nummer}`)}>
                    <AccordionSummary aria-controls={`panel${props.nummer}d-content`} id={`panel${props.nummer}d-header`}>
                        <h3 className={classes.text} >{props.name}</h3>
                        <Rating rating={props.rating} id={props.id}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.text} >
                            <img src={props.picture} className={classes.image} />
                        </div>
                    </AccordionDetails>
                    <Details content={props.ingredients} header="INGREDIENTS" />
                    <Details content={props.description} header="DESCRIPTION" />
                </Accordion>
            </div>
        )
    }
}