export const writePageStyles = `
    .container{
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .select {
        margin-bottom: 50px;
        padding: 10px 20px;
        margin-left: 50px;
        width: max-content;
        border: none;
        border-radius: 5px;
        background-color: var(--bg);
        color: var(--textColor);
        font-size: 16px;
        outline: none;
        cursor: pointer;
        appearance: none;
        background: none;
    }
    .select::after {
        content: '\\25BC';
        font-size: 12px;
        color: var(--textColor);
        position: absolute;
        right: 20px;
        top: calc(50% - 6px);
        pointer-events: none;
    }
    .select:hover {
        border-color: #1a8917;
    }
    .select:focus {
        box-shadow: 0 0 0 3px rgba(26, 137, 23, 0.2);
    }
    .editor {
        display: flex;
        gap: 20px;
        height: 700px;
        position: relative;
    }
    .button,
    .addButton {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: transparent;
        border: 1px solid var(--textColor);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .addButton {
        border-color: #1a8917;
    }
    .add {
        display: flex;
        gap: 20px;
        background-color: var(--bg);
        position: absolute;
        z-index: 999;
        width: 100%;
        left: 50px;
    }
    .input{
        padding: 50px;
        font-size: 64px;
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--textColor);
    }
    .input::placeholder{
        color: #b3b3b1;
    }
    .textArea {
        width: 100%;
    }
    .publish{
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 10px 20px;
        border: none;
        background-color: #1a8917;
        color: white;
        cursor: pointer;
        border-radius: 20px;
    }
`;
