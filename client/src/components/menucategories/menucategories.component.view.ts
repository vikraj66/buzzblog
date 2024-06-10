import { html, View } from 'wayofthejs';
import { Base } from '@/models/base.model';
import { base } from '@/props/base.props';



export class MenuCategoriesView extends View<Base, base> {
    styles(): string {
        return `
            .categoryList {
                margin-top: 35px;
                margin-bottom: 60px;
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
            }
            .categoryItem {
                padding: 10px 25px;
                border-radius: 10px;
                font-size: 14px;
            }
            .categoryItem.style { background-color: #57c4ff31; }
            .categoryItem.fashion { background-color: #da85c731; }
            .categoryItem.food { background-color: #7fb88133; }
            .categoryItem.travel { background-color: #ff795736; }
            .categoryItem.culture { background-color: #ffb04f45; }
            .categoryItem.coding { background-color: #5e4fff31; }
        `;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`<div class="categoryList"></div>`;
    }

    onRender(): void {
        const categoryList = this.parent.querySelector('.categoryList') as HTMLElement;
        
        if (categoryList) {
            const categories = [
                { name: 'style', label: 'Style' },
                { name: 'fashion', label: 'Fashion' },
                { name: 'food', label: 'Food' },
                { name: 'travel', label: 'Travel' },
                { name: 'culture', label: 'Culture' },
                { name: 'coding', label: 'Coding' },
            ];

            categories.forEach(category => {
                const link = document.createElement('a');
                link.href = `/blog/${category.name}`;
                link.className = `categoryItem ${category.name}`;
                link.textContent = category.label;
                categoryList.appendChild(link);
            });
        }
    }
}
