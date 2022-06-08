import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { myTheme } from './theme'; // import file custom theming

// import LandingPageContainer from './containers/LandingPageContainer.jsx';
// import CMSContainer from './containers/CMSContainer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CMS from './pages/CMS.jsx';

const App = () => (
  <>
    <CssBaseline>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={myTheme}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/ims" component={CMS} />
            <Route path="/:id" component={LandingPage} />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </CssBaseline>
  </>
);

export default App;
