import { formatDate, stringToElement } from '@/shared/utils';

import { TripCardProps } from '../model/types';
import styles from './style.module.scss';
import template from './TripCard.hbs?compiled';
import { eventBus } from '@/shared/lib';

export class TripCard {
    element?: HTMLElement;

    constructor(private props: TripCardProps) {}

    private initListeners(): void {
        if (!this.element) return;

        this.element.querySelector<HTMLButtonElement>('[data-edit-button]')?.addEventListener('click', this.handleEditButtonClick);
    }

    private handleEditButtonClick = (event: Event): void => {
        // TODO pass trip id and stuff
        const target = event.currentTarget as HTMLButtonElement;
        eventBus.emit('TripCard:edit', this.props);
    }

    public render(): HTMLElement {
        this.element = stringToElement(template({
            ...this.props,
            ...formatDate(this.props.startDate, this.props.endDate),
            styles,
        }));

        this.initListeners();
        return this.element;
    }
}
