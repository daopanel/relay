import styled from 'styled-components';

export default function MobileLoadingEnsName() {
  return (
    <MainContainer>
      <Header>Resolving ENS Name...</Header>
      <DotContainer>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </DotContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  z-index: -100;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  color: #7349e5;
  font-size: 2rem;
  text-align: center;
  margin-top: -20vh;
  margin-bottom: 50px;
  font-style: italic;
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  > * {
    background: #c3c2c2;
  }

  > :first-child {
    animation: jump1 1500ms ease-in-out infinite;
    @keyframes jump1 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(-15px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(2) {
    animation: jump2 1500ms ease-in-out infinite;
    @keyframes jump2 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(-15px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(3) {
    animation: jump3 1500ms ease-in-out infinite;
    @keyframes jump3 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(-0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(-15px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(4) {
    animation: jump4 1500ms ease-in-out infinite;
    @keyframes jump4 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(-15px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(5) {
    animation: jump5 1500ms ease-in-out infinite;
    @keyframes jump5 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(-15px);
      }
      72% {
        transform: translateY(0px);
      }
      84% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  > :nth-child(6) {
    animation: jump6 1500ms ease-in-out infinite;
    @keyframes jump6 {
      0% {
        transform: translateY(0px);
      }
      12% {
        transform: translateY(0px);
      }
      24% {
        transform: translateY(0px);
      }
      36% {
        transform: translateY(0px);
      }
      48% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(0px);
      }
      72% {
        transform: translateY(-15px);
      }
      84% {
        transform: translateY(0px);
      }
      96% {
        transform: translateY(0px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
