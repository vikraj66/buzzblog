export const categoryListStyles = `
  .container {
    margin-top: 30px;
  }
  #categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  }
  .category {
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: capitalize;
    width: 15%;
    height: 80px;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden; /* Ensure images don't overflow */
  }
  .category img {
    width: 32px; /* Fixed width for images */
    height: 32px; /* Fixed height for images */
    object-fit: cover; /* Ensure the image covers the area without distortion */
    border-radius: 105px; /* Optional: Add border-radius for images */
  }
  .category.style {
    background-color: #57c4ff31;
  }
  .category.fashion {
    background-color: #da85c731;
  }
  .category.food {
    background-color: #7fb88133;
  }
  .category.travel {
    background-color: #ff795736;
  }
  .category.culture {
    background-color: #ffb04f45;
  }
  .category.coding {
    background-color: #5e4fff31;
  }
  @media screen and (max-width: 1280px) {
    .category {
      width: 20%;
    }
  }
  @media screen and (max-width: 1024px) {
    .category {
      width: 25%;
    }
  }
  @media screen and (max-width: 768px) {
    .category {
      width: 45%;
    }
  }
  @media screen and (max-width: 640px) {
    .category {
      width: 100%;
    }
  }
`;
