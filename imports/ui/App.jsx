import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { myTheme } from './theme'; //import file custom theming

import LandingPageContainer from './LandingPageContainer.jsx';
import CMSPageContainer from './CMSPageContainer.jsx';
import ErrorPage from './ErrorPage.jsx';

const App = () => (
    <React.Fragment>
        <CssBaseline>
            <ThemeProvider theme={myTheme}>
                <Switch>
                    <Route exact path="/" component={LandingPageContainer} />
                    <Route exact path="/cms" component={CMSPageContainer} />
                    <Route path="/:id" component={LandingPageContainer} />
                    <Route component={ErrorPage} />
                </Switch>
            </ThemeProvider>
        </CssBaseline>
    </React.Fragment>

);

export default App;
