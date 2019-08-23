import styled from 'styled-components';

const Overflow = styled.div `
  @media (max-width: 700px) {
    margin-top: 46px;
  }
  
  @media (min-width: 700px) {
    margin-top: 86px;
  }
  height:450px;
  display: flex;
`;

const OverflowS = styled.div `
  @media (max-width: 700px) {
    margin-top: 43px;
  }
  
  @media (min-width: 700px) {
    margin-top: 43px;
  }
  height:280px;
  display: flex;
`;


const Container = styled.div `
  @media (max-width: 700px) {
    margin-right: 8px;
    margin-left: 8px;
  }
  margin: 0 auto;
  max-width: 1040px;
  
  padding-left: 20px;
  padding-right: 20px;
`;

const ContainerGrey = styled.div `
  background-color: #f4f4f7;
`;

const ContainerBlue = styled.div `
  color: white;
  background-image: url('/assets/background_square.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
`;

const Download = styled.div `
  background: #17D1AA;
  color: #ffffff;
  padding-left:8px;
  padding-right:8px;
  padding-top:4px;
  padding-bottom:4px;
`;


const SectionTitle = styled.div `
  font-size: 30px;
  margin-bottom: 23px
  width: 100%;
  text-align: center;
  padding-top:60px;
`;
const SectionTitleLight = SectionTitle.extend `
  color: white;
`;


export {
  Container,
  ContainerGrey,
  ContainerBlue,
  Download,
  Overflow,
  OverflowS,
  SectionTitle,
  SectionTitleLight,

}