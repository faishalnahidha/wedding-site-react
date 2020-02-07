import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';


const styles = {
    root: {
        padding: '48px 0 0',
        flexGrow: 1,
        backgroundColor: "#fff"
    },
    container: {
        textAlign: "center"
    },
    icon: {
        width: '40px%'
    },
    card: {
        borderRadius: 8,
        minWidth: 256,
        textAlign: 'center',
    },
    cardHeader: {
        fontSize: 16,
        fontFamily: "Nunito Sans, Arial",
        backgroundColor: '#fafafa'
    },
};

class ContentSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth="xs" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Assalamu&apos;alaikum Wr. Wb.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Bismillahirrahmannirahim
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Dengan memohon rahmat Allah SWT, kami mengundang Saudara/i untuk hadir pada acara resepsi pernikahan kami
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom color="primary">
                                <strong>Mutik Hidayati</strong>
                            </Typography>
                            <Typography variant="body1">
                                Putri Bp. H. Idris Sardi (Alm) & Ibu Sri Handayani
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                <strong>dengan</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom color="primary">
                                <strong>Faishal Izzan Nahidha</strong>
                            </Typography>
                            <Typography variant="body1">
                                Putra Bp. H. Hikmatullah & Ibu Hj. Idha Merahwati
                            </Typography>
                        </Grid>

                        {/* ################## Cards Section ################## */}
                        <Grid item xs={12}>
                            <Box marginTop={3} marginBottom={3}>
                                <img src="/img/icon-altar.svg" alt="Altar Icon" className={classes.icon} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Card raised width="100%" className={classes.card}>
                                <CardHeader title="Akad Nikah" disableTypography className={classes.cardHeader} />
                                <Divider />
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        <strong>Sabtu, 22 Februari 2020</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>pukul 15:30 WIB</Typography>
                                    <Typography variant="body2">
                                        di kediaman mempelai wanita<br />Balong RT 05/RW 01, Kemasan, Sawit, Boyolali.&nbsp;
                                        <Link href="https://goo.gl/maps/8Zh7u1zrAmAthoGF9" target="_blank" color="primary">
                                            Lihat peta
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card raised width="100%" className={classes.card}>
                                <CardHeader title="Resepsi" disableTypography className={classes.cardHeader} />
                                <Divider />
                                <CardContent>
                                    <Typography variant="h6">
                                        <strong>Minggu, 23 Februari 2020</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>pukul 09:00 WIB</Typography>
                                    <Typography variant="body2">
                                        di Gedung Kapujanggan Pengging <br />RT 15/RW 03 Bendan, Banyudono, Boyolali
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Box marginTop={3} marginBottom={3}>
                                <img src="/img/icon-location.svg" alt="Location Icon" className={classes.icon} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

ContentSection.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContentSection);