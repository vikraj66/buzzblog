export const postStyles = `
    .infoContainer {
        display: flex;
        align-items: center;
        gap: 50px;
    }
    .textContainer {
        flex: 1;
    }
    .title {
        font-size: 64px;
        margin-bottom: 50px;
    }
    .user {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .userImageContainer {
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden; /* Ensure the image doesn't overflow the container */
    }

    .avatar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .userTextContainer {
        display: flex;
        flex-direction: column;
        gap: 5px;
        color: var(--softTextColor);
    }
    .username {
        font-size: 20px;
        font-weight: 500;
    }
    .imageContainer {
        flex: 1;
        height: 350px;
        position: relative;
        overflow: hidden; /* Ensure the image doesn't overflow the container */
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .content {
        display: flex;
        gap: 50px;
    }
    .post {
        flex: 5;
        margin-top: 60px;
    }
    .description p {
        font-size: 20px;
        font-weight: 300;
        margin-bottom: 20px;
    }

    #menu-placeholder{
        flex:2;
    }
    @media screen and (max-width: 1536px) {
        .title {
            font-size: 54px;
        }
    }
    @media screen and (max-width: 1280px) {
        .title {
            font-size: 48px;
        }
    }
    @media screen and (max-width: 1024px) {
        .imageContainer {
            display: none;
        }
    }
    @media screen and (max-width: 640px) {
        .title {
            font-size: 36px;
        }
        .description p {
            font-size: 18px;
        }
    }
`;
