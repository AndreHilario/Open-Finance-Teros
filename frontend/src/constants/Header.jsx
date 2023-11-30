import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <BackGround>
        <Title>
          Open Finance
        </Title>
      </BackGround>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
    font-size: 50px;
`;

const BackGround = styled.div`
    background-color: #030322;
    box-shadow: 0 0 33px 0 rgba(0,0,0,.2);
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: #fff;
`;
