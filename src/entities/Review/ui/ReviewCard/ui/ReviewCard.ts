import styles from './style.module.scss';
import template from './ReviewCard.hbs?compiled';
import { ReviewCardProps } from '../model/types';
import { formatDate, stringToElement } from '@/shared/utils';

export class ReviewCard {
    element?: HTMLElement;

    constructor(private props: ReviewCardProps) { }

    public render(): HTMLElement {
        this.element = stringToElement(template({
            ...this.props,
            ...formatDate(this.props.review.createdAt),
            styles
        }));

        this.element.style.setProperty('--rating', this.props.review.rating.toString());
        return this.element;
    }
}
