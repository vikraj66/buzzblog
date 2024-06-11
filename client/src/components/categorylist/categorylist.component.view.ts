import { html, View } from 'wayofthejs';
import { Base } from '../../models/base.model';
import { categoryListStyles } from './categorylist.styles';
import { BASEURL } from '../../constants/constant';

interface Category {
    id: string;
    title: string;
    slug: string;
    img: string;
}

export class CategoryListView extends View<Base, {}> {
    private categories: Category[] = [];

    constructor(parent: Element, model: Base, useEjs: boolean = false, scopedStylesEnabled: boolean = true) {
        super(parent, model, useEjs, scopedStylesEnabled);
        this.fetchCategories();
    }

    async fetchCategories(): Promise<void> {
        try {
            const response = await fetch(`${BASEURL}/categories`);
            if (response.ok) {
                this.categories = await response.json();
                this.render();
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    styles(): string {
        return categoryListStyles;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`
            <div class="container">
                <h1 class="title">Popular Categories</h1>
                <div id="categories">
                </div>
            </div>
        `;
    }

    afterRender(): void {
        const categoriesContainer = this.parent.querySelector(`#categories`);
        if (categoriesContainer) {
            this.categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = `category ${category.slug}`;
                categoryElement.innerHTML = `
                    <a href="/blog/${category.slug}" style="display:flex; justify-content:space-between; align-items:center; gap:2px;">
                        <img src="${category.img}" alt="${category.title}" class="image" style="margin-right:5px" />
                        <span>${category.title}</span>
                    </a>
                `;
                categoriesContainer.appendChild(categoryElement);
            });
            this.applyScopedClassesToAll(categoriesContainer as HTMLElement);
        }
    }
}
