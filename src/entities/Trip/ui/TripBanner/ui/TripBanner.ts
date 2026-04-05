import { Trip } from '@/entities/Trip/model/types';
import { formatDate, stringToElement } from '@/shared/utils';

import { TripBannerProps } from '../model/types';
import styles from './style.module.scss';
import template from './TripBanner.hbs?compiled';

export class TripBanner {
    element?: HTMLElement;

    constructor(private props: TripBannerProps) {}

    private get trip(): Trip {
        return this.props.trip;
    }

    // private initListeners(): void {
    //     if (!this.element) return;

    //     this.element.querySelector<HTMLButtonElement>('[data-edit-button]')?.addEventListener('click', this.handleEditButtonClick);
    // }

    // private handleEditButtonClick = (event: Event): void => {
    //     // TODO pass trip id and stuff
    //     const target = event.currentTarget as HTMLButtonElement;
    //     eventBus.emit('TripCard:edit', this.props);
    // }

    public render(): HTMLElement {
        this.element = stringToElement(template({
            ...this.props,
            ...formatDate(this.trip.startDate, this.trip.endDate),
            styles,
        }));

        // this.initListeners();
        return this.element;
    }
}
