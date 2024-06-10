export const featuredStyles = `
  .container {
    margin-top: 30px;
  }
  .title {
    font-size: 96px;
    font-weight: 300;
  }
  .post {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 50px;
  }
  .imgContainer {
    flex: 1;
    height: 500px;
    position: relative;
  }
  .image {
   position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
  .textContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .postTitle {
    font-size: 40px;
  }
  .postDesc {
    font-size: 20px;
    font-weight: 300;
    color: var(--softTextColor);
  }
  .button {
    padding: 16px 20px;
    border: none;
    border-radius: 5px;
    width: max-content;
  }
  @media screen and (max-width: 1280px) {
    .title {
      font-size: 72px;
    }
  }
  @media screen and (max-width: 1024px) {
    .title {
      font-size: 64px;
    }
    .imgContainer {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .title {
      font-size: 48px;
    }
  }
  @media screen and (max-width: 640px) {
    .title {
      font-size: 36px;
    }
  }
`;
