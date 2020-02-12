import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        height: '100vh',
        padding: '24px 0',
        background: 'linear-gradient(153deg, #4568dc, #b06ab3)',
        flexGrow: 1,
    },
    container: {
        margin: 0,
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },
    logoWhite: {
        width: '100%'
    },
    mainIllustration: {
        width: '100%',
    },
    recipientColumn: {
        color: '#fff',
    }
};

class IntroSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            recipientName,
            scrollToContentSection,
            scrollToLocationSection
        } = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth="xs" className={classes.container}>
                    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <img src="/img/logo-white.svg" alt="Mutik Izzan Wedding Logo" className={classes.logoWhite} />
                        </Grid>
                        <Grid item xs={10}>
                            <img src="/img/illustration-intro.png" className={classes.mainIllustration} alt="Mutik Izzan Wedding Illustration" />
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.recipientColumn} marginBottom={2}>
                                <Typography variant="body2" color="inherit" align="center">Kepada</Typography>
                                <Typography variant="h6" color="inherit" align="center">
                                    <strong>{recipientName}</strong>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                                <Grid item xs={10}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        disableElevation
                                        fullWidth
                                        onClick={scrollToContentSection}
                                    >Lihat Undangan</Button>
                                </Grid>
                                <Grid item xs={10}>
                                    <Button
                                        color="secondary"
                                        size="large"
                                        fullWidth
                                        onClick={scrollToLocationSection}
                                    >Lihat Lokasi</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

IntroSection.propTypes = {
    classes: PropTypes.object.isRequired,
    recipientName: PropTypes.string,
    scrollToContentSection: PropTypes.func,
    scrollToLocationSection: PropTypes.func
};

export default withStyles(styles)(IntroSection);