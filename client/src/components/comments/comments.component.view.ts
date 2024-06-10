import { html, View } from 'wayofjs';
import { Base } from '@/models/base.model';
import { commentStyles } from './comments.styles';

interface CommentsProps {
    id?: number;
    postSlug?: string;
}

export class CommentsView extends View<Base, CommentsProps> {
    private props: CommentsProps;
    private commentsFetched: boolean = false;

    constructor(parent: Element, props: CommentsProps) {
        super(parent, Base.default(), false, true);
        this.props = props;
    }

    styles(): string {
        return commentStyles;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`
            <div class="container">
                <h1 class="title">Comments</h1>
                <div class="write">
                    <textarea class="input" placeholder="write a comment..."></textarea>
                    <button class="button" onclick="${this.handleCommentSubmit.bind(this)}">Send</button>
                </div>
                <div id="comments" class="comments"></div>
            </div>
        `;
    }

    onRender(): void {
        if (!this.commentsFetched) {
            this.fetchComments();
            this.commentsFetched = true;
        }
    }

    async fetchComments() {
        const commentsContainer = this.parent.querySelector(`#comments`) as HTMLElement;

        if (commentsContainer) {
            try {
                const response = await fetch(`http://localhost:3000/comments?slug=${this.props.postSlug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }

                const comments = await response.json();
                commentsContainer.innerHTML = '';

                comments.forEach((comment: any) => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <div class="user">
                            ${comment.user.image ? `<div class="imageContainer"><img src="${comment.user.image}" class="image" alt="${comment.user.name}" /></div>` : ''}
                            <div class="userInfo">
                                <span class="username">${comment.user.name}</span>
                                <span class="date">${new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <p class="desc">${comment.desc}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });

                // Apply scoped classes
                this.applyScopedClassesToAll(commentsContainer);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
    }

    async handleCommentSubmit() {
        const textarea = this.parent.querySelector(`.${this.getUniqueId()}-input`) as HTMLTextAreaElement;
        const commentText = textarea.value;

        if (!commentText) {
            alert('Please write a comment');
            return;
        }

        const commentData = {
            desc: commentText,
            postSlug: this.props.postSlug,
        };

        try {
            const response = await fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const newComment = await response.json();

            // Clear the textarea after successful submission
            textarea.value = '';

            
            
            // Append the new comment directly to the list
            const commentsContainer = this.parent.querySelector(`#comments`) as HTMLElement;
            const commentElement = document.createElement('div');
            // return;
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="user">
                    ${newComment.image ? `<div class="imageContainer"><img src="${newComment.image}" class="image" alt="${newComment.name}" /></div>` : ''}
                    <div class="userInfo">
                        <span class="username">${newComment.name}</span>
                        <span class="date">${new Date(newComment.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <p class="desc">${newComment.desc}</p>
            `;
            commentsContainer.appendChild(commentElement);

            this.applyScopedClassesToAll(commentElement);
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment');
        }
    }
}
