import './styles/_base.scss';
import './styles/_reset.scss';
import './styles/_typography.scss';

import Handlebars from 'handlebars';

import { mapUser } from '@/entities/User';
import { API } from '@/shared/api';
import { appState, config } from '@/shared/config';
import { navigate } from '@/shared/router';

export const App = async () => {
    Handlebars.registerHelper('s', function (this: any, className: string): string {
        return this.styles?.[className] || className;
    });

    Handlebars.registerHelper('eq', function (a: any, b: any): boolean {
        return a === b;
    });

    Handlebars.registerHelper('url', function(...segments: any[]): string {
        segments = segments.slice(0, -1);

        const path = segments.join('/');

        for (const { hrefRegex } of Object.values(config)) {
            if (path.match(hrefRegex)) {
                return path;
            }
        }

        return '#';
    })

    try {
        const user = mapUser(await API.me());
        appState.currentUser = user;
    } catch {
        appState.currentUser = null;
    }

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const link = target.closest('[data-link]') as HTMLAnchorElement;

        if (link) {
            event.preventDefault();

            const path = new URL(link.href).pathname;
            navigate(path);
        }
    });

    navigate(window.location.pathname);
};
