import { html, View } from 'wayofthejs';
import { writePageStyles } from './write.styles';
import { WriteAttributes, WriteModel } from '@/models/write.model';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { uploadFileToFirebase } from '../../../utils/firebase';
import { BASEURL } from '@/constants/constant';

interface Category {
    id: string;
    slug: string;
    title: string;
    img: string;
}

interface WriteViewProps {}

export class WriteView extends View<WriteModel, WriteAttributes> {
    private props: WriteViewProps;
    private open: boolean = false;
    private file: File | null = null;
    private quill: Quill;
    private quillContent: string = '';
    private categories: Category[] = [];
    private categoriesLoaded: boolean = false;
    private title: string = '';
    private catSlug: string = '';
    private media: string = '';

    constructor(parent: Element, props: WriteViewProps) {
        super(parent, WriteModel.default());
        this.props = props;
        this.fetchCategories();
    }

    styles(): string {
        return writePageStyles;
    }

    eventsMap(): { [key: string]: (event: Event) => void } {
        return {
            'click:.button': this.toggleMenu.bind(this),
            'click:.publish': this.handleSubmit.bind(this),
            'change:.file-input': this.handleFileChange.bind(this),
            'input:.title-input': this.handleTitleChange.bind(this),
            'change:.select': this.handleCategoryChange.bind(this),
        };
    }

    toggleMenu(): void {
        this.open = !this.open;
        this.render();
    }

    handleTitleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.title = input.value;
    }

    handleCategoryChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        this.catSlug = select.value;
    }

    handleFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.file = input.files[0];
            this.uploadFile();
        }
    }

    async uploadFile(): Promise<void> {
        if (!this.file) return;

        try {
            this.media = await uploadFileToFirebase(this.file);
            console.log('File uploaded successfully:', this.media);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    handleSubmit(): void {
        const content = this.quill.root.innerHTML;
        this.postData({
            title: this.title,
            desc: content,
            img: this.media,
            slug: this.slugify(this.title),
            catSlug: this.catSlug || 'style',
        });
    }

    slugify(str: string): string {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    async postData(data: object): Promise<void> {
        try {
            const response = await fetch(`${BASEURL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Post published:', result);
                window.location.href = '/';
            } else {
                console.error('Failed to publish post');
            }
        } catch (error) {
            console.error('Error publishing post:', error);
        }
    }

    async fetchCategories(): Promise<void> {
        if (this.categoriesLoaded) return;
        this.categoriesLoaded = true;
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

    onRender(): void {
        const editorContainer = this.parent.querySelector('.editor-container') as HTMLElement;
        if (editorContainer) {
            if (this.quill) {
                this.quillContent = this.quill.root.innerHTML;
            }

            this.quill = new Quill(editorContainer, {
                theme: 'bubble',
                placeholder: 'Tell your story...',
            });

            if (this.quillContent) {
                this.quill.root.innerHTML = this.quillContent;
            }
        }
    }

    template(): HTMLElement | HTMLElement[] {
        return html`
            <div class="container">
                <input
                    type="text"
                    placeholder="Title"
                    class="input title-input"
                />
                <select class="select">
                    ${this.categories.map(category =>
                        html`<option value="${category.slug}">${category.title}</option>`
                    )}
                </select>
                <div class="editor">
                    <button class="button" onClick=${this.toggleMenu}>
                        <img src="./images/plus.png" alt="" width="16" height="16" />
                    </button>
                    ${this.open
                ? html`
                              <div class="add">
                                  <input type="file" class="file-input" id="image" style="display: none" />
                                  <button class="addButton">
                                      <label for="image">
                                          <img src="./images/image.png" alt="" width="16" height="16" />
                                      </label>
                                  </button>
                                  <button class="addButton">
                                      <img src="./images/external.png" alt="" width="16" height="16" />
                                  </button>
                                  <button class="addButton">
                                      <img src="./images/video.png" alt="" width="16" height="16" />
                                  </button>
                              </div>
                          `
                : ''}
                    <div class="editor-container textarea" style="width: 100%;"></div>
                </div>
                <button class="publish" onClick=${() => this.handleSubmit()}>Publish</button>
            </div>
        `;
    }
}
