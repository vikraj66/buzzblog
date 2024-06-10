export const homePageStyles = `
  .content {
    display: flex;
    gap: 50px;
  }
    #menu{
    flex:2;
    min-width: 300px;
  }

  #card-list {
                flex: 5;
            }

  @media screen and (max-width: 1280px) {
   #menu{
    min-width: 0px;
    flex:0;
   }
    #card-list{
    flex:21;
    }
    .content{
      gap: 0px;
    }
  }
  @media screen and (max-width: 1024px) {
    
  }
  @media screen and (max-width: 768px) {
    
  }
  @media screen and (max-width: 640px) {
    
  }
`;
