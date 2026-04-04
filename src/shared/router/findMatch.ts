import { config } from '../config';
import { Route } from '../config/router';

export const findMatch = (path: string): Route | null => {
    for (const page of Object.values(config)) {
        if (path.match(page.hrefRegex)) {
            return page;
        }
    }

    return null;
};
