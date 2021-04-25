import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForwardIcon from '@material-ui/icons/Forward';
import ReplyIcon from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import ReactTooltip from 'react-tooltip';

import URLClassifier from '../../../controllers/URLClassifier/URLClassifier'

import styles from './Email.module.css';

export default function Email(props) {

    const [urlDetection, setUrlDetection] = useState()

    const email = props.email;

    const text = email.body.text;
    const html = email.body.html;

    useEffect(() => {
        // const links = Array.prototype.slice.call(document.getElementsByTagName("a")).filter(e => e.hostname != 'localhost');
        const links = Array.prototype.slice.call(document.links).filter(e => e.hostname !== window.location.hostname);
        if (links.length !== 0) {
            for (let i = 0; i < links.length; i++) {
                URLClassifier.classify(links[i].href).then(
                    response => {

                        const attHTML = document.createAttribute("data-html");
                        attHTML.value = true
                        links[i].setAttributeNode(attHTML);

                        const att = document.createAttribute("data-tip");
                        att.value = "<pre id=\"json\">" + response + "</pre>"
                        // response.replaceAll("\n", "<br>").replaceAll("\t", "          ")
                        links[i].setAttributeNode(att);
                        if (i === links.length - 1) {
                            setUrlDetection(true)
                        }
                    }
                );
            }
        }
        else {
            setUrlDetection(true)
        }
    }, []);

    useEffect(() => {
        setTimeout(function () {
            ReactTooltip.rebuild();
        }, 2000);
    }, [urlDetection])

    return (
        <>
            <Box pl="10px" pr="10px" pb="30px" display="flex">
                <Grid item xs={1} >
                    <AccountCircleIcon style={{ fontSize: 40, paddingTop: "100" }} color="action" />
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={11}>
                            <Grid container justify="flex-start" alignItems="center">
                                <p style={{ fontSize: "140%", margin: "1rem 0rem", textAlign: "left" }}>
                                    <strong>
                                        {email.subject}
                                    </strong>
                                </p>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container justify="flex-end" style={{margin: "1rem 0rem" }}>
                                {
                                    urlDetection ?
                                        (
                                            <CheckCircleOutlineIcon style={{ color: "#606060" }} />
                                        ) :
                                        (
                                            <CircularProgress size={20} style={{ color: "#606060" }} />
                                        )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{ paddingBottom: "20px" }}>
                        <Divider />
                    </Grid>
                    <Grid container>
                        <Grid container justify="flex-start" item xs={6}>
                            <p style={{ fontSize: "90%", display: "flex" }} >
                                <strong>
                                    {(email['from'] ? email['from'].split("<")[0].replace(/['"]+/g, '') : "")}
                                </strong>
                                <div style={{ fontSize: "80%", color: "grey" }}>
                                    {"<" + (email['from'] ? email['from'].split("<")[1] : "")}
                                </div>
                            </p>
                        </Grid>
                        <Grid container justify="flex-end" item xs={6}>
                            <p style={{ fontSize: "90%", color: "grey", display: "flex" }}>
                                {email.date}
                            </p>
                        </Grid>
                    </Grid>
                    <Grid>
                        {html ?
                            (
                                <div style={{ textAlign: "left" }} dangerouslySetInnerHTML={{ __html: html }} />
                            ) :
                            (
                                <div>
                                    <pre style={{ whiteSpace: "pre-wrap", textAlign: "left", fontFamily: "inherit" }}>
                                        {text}
                                    </pre>
                                </div>
                            )
                        }
                        <ReactTooltip type="info" className={styles.mw} />
                    </Grid>
                    <Grid container justify="flex-start">
                        <Box py={5} pr={2}>
                            <Button
                                variant="contained"
                                disabled
                                startIcon={<ReplyIcon />}
                            >
                                Reply
                    </Button>
                        </Box>
                        <Box py={5}>
                            <Button
                                variant="contained"
                                disabled
                                startIcon={<ForwardIcon />}
                            >
                                Forward
                    </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}