export const navbarStyles = `
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
}

.social {
  display: flex;
  gap: 10px;
  flex: 1;
}

.logo {
  flex: 1;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}

.links {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  font-size: 20px;
}

@media screen and (max-width: 1280px) {
  .logo {
    font-size: 32px;
  }
  .links {
    font-size: 18px;
    gap: 15px;
  }
}
@media screen and (max-width: 1024px) {
  .social {
    display: none;
  }
  .logo {
    text-align: left;
  }
}
@media screen and (max-width: 768px) {
  .logo {
    font-size: 24px;
  }
}
@media screen and (max-width: 640px) {
  .links {
    justify-content: flex-end;
  }
  .link {
    display: none;
  }
}
`;
