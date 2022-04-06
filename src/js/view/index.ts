import 'CSS/reset.css';
import 'CSS/normalize.css';
import 'CSS/navigationBar.css';

import { initialRoutes } from 'Router/router';
import { connectNavToStaticFooter } from 'View/navigationBar';

connectNavToStaticFooter();
initialRoutes();

// window.onpopstate = pop
