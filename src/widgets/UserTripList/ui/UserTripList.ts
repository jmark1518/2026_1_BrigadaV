import './style.scss';

import { TripCard } from '@/entities/Trip';
import { stringToElement } from '@/shared/utils';

import { UserTripListProps } from '../model/types';
import template from './UserTripList.hbs?compiled';

export class UserTripList {
    element?: HTMLElement;

    constructor(private props: UserTripListProps) { }

    private async loadTrips(): Promise<void> {
        // TODO add API call
        if (!this.element) return;

        this.element.appendChild((new TripCard({
            trip: {
                id: 1,
                title: 'Поиск лепреконов',
                startDate: new Date(2026, 2, 5),
                endDate: new Date(2026, 2, 17),
                location: 'Англия',
                preview: '/mock/place/trip1.png',
            }
        })).render());

        this.element.appendChild((new TripCard({
            trip: {
                id: 12,
                title: 'Отдых на курорте',
                startDate: new Date(2026, 11, 25),
                endDate: new Date(2027, 0, 5),
                location: 'Дубай',
                preview: '/mock/place/trip2.png',
            }
        })).render());
    }


    public render(): HTMLElement {
        this.element = stringToElement(template());
        this.loadTrips();
        return this.element;
    }
}
