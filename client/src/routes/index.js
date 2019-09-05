import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './home/home'
import NotFound from './notFound/notFound'

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;