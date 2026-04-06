import { stringToElement } from "@/shared/utils";
import template from './AbstractList.hbs?compiled';

export abstract class AbstractList<T, P> {
    protected element: HTMLElement;

    constructor(private props: P) {
        this.element = stringToElement(template(props));
    }

    protected abstract loadData(): Promise<T[]>;
    protected abstract renderItem(item: T): HTMLElement;

    private async init(): Promise<void> {
        try {
            const data = await this.loadData();

            data.forEach(item => {
                this.element.appendChild(this.renderItem(item));
            });
        } catch (error) {
            console.error('Failed to load list data:', error);
        }
    }

    public render(): HTMLElement {
        // TODO add loading animation
        this.init();
        return this.element;
    }
}
