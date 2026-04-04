import styles from './style.module.scss';

import template from './TripDetailPage.hbs?compiled';
import { AppState, IPage } from '@/shared/model';
import { Header } from '@/widgets/Header';
import { injectComponents } from '@/shared/utils';

export class TripDetailPage implements IPage {
    private element?: HTMLElement;
    private header?: Header;

    constructor(private appState: AppState) {
        this.header = new Header({
            userSessionProps: {
                user: appState.currentUser,
            },
        });
    }

    private get user() {
        return this.appState.currentUser!;
    }

    public render(): HTMLElement {
        this.element = document.createElement('div');
        const html = template({ styles });

        this.element.classList.add(styles['trip-detail-page']);
        this.element.innerHTML = html;

        injectComponents(this.element, {
            'header': this.header,
        });

        return this.element;
    }

    public destroy(): void { }
}
