export const menuPostsStyles = `
            #items {
                margin-top: 35px;
                margin-bottom: 60px;
                display: flex;
                flex-direction: column;
                gap: 35px;
            }
            .item {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            .imageContainer {
                flex: 1;
                aspect-ratio: 1/1;
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            
            .textContainer {
                flex: 4;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .category {
                padding: 3px 8px;
                border-radius: 10px;
                font-size: 12px;
                color: white;
                width: max-content;
            }
            .category.travel { background-color: #ff7857; }
            .category.culture { background-color: #ffb14f; }
            .category.food { background-color: #7fb881; }
            .category.fashion { background-color: #ff7887; }
            .category.coding { background-color: #775aec; }
            .category.style { background-color: #789cff; }
            .postTitle { font-size: 18px; font-weight: 500; color: var(--softTextColor); }
            .detail { font-size: 12px; }
            .date { color: gray; }
        `