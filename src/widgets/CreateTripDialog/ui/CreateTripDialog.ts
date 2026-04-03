import styles from './style.module.scss';

import { Field } from '@/shared/ui';

import template from './CreateTripDialog.hbs?compiled';
import { CreateTripDialogProps } from '../model/types';
import { injectComponents, stringToElement } from '@/shared/utils';
import { focusField } from '@/shared/lib';

export class CreateTripDialog {
    private element?: HTMLElement;
    private fields: Record<string, Field> = {};

    constructor(private props: CreateTripDialogProps) {
        this.fields['title'] = new Field({
            id: 'title-input',
            label: 'Название поездки',
            type: 'text',
            attributes: {
                name: 'title',
                maxlength: 20,
                placeholder: 'например, хотите уехать жить в Лондон',
            }
        })

        this.fields['place'] = new Field({
            className: 'field--rounded',
            id: 'place-input',
            label: 'Направление',
            type: 'text',
            attributes: {
                name: 'place',
                maxlength: 50,
                placeholder: 'Куда',
            },
            leftIcon: '/icons/search.svg',
            onLeftIconClick: focusField,
        })
    }

    public render(): HTMLElement {
        this.element = stringToElement(template({
            ...this.props,
            fields: Object.keys(this.fields),
            styles,
        }));

        injectComponents(this.element, this.fields)

        return this.element;
    }

}
