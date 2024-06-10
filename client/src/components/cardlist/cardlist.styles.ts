export const cardListStyles = `
            .container {
                flex: 5;
            }
            .title {
                margin: 50px 0px;
            }
            .posts {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .pagination {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
            }
            .button {
                padding: 10px 20px;
                border: none;
                background-color: crimson;
                color: white;
                cursor: pointer;
            }
            .button:disabled {
                background-color: rgba(220, 20, 60, 0.473);
                cursor: not-allowed;
            }
        `