import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject } from 'mobx-react';
import { Container, ContainerBlue, SectionTitleLight } from './../css';
import styled from 'styled-components';

const HowItWorksContainer = styled.div`
  display: flex;

  @media (min-width: 700px) {
    flex-direction: row;
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const HowItWorksButtonSelected = styled.div`
  max-width: 300px;
  height: 60px;
  border-radius: 0 8px 8px 0;

  background-color: ${p => (p.isSelected ? '#ffffff' : '')};
  color: ${p => (p.isSelected ? '#353535' : 'white')};

  display: flow;
  flow-orientation: row;
  align-items: center;
`;

const HowItWorksButtonSIcon = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`;

const MainImageX = styled.div`
  height: 283px;
  background: black;
  margin: 16px;

  @media (min-width: 700px) {
    height: 283px;
    flex: 1;
  }
  @media (max-width: 700px) {
    height: 283px;
    max-width: 600px;
  }
`;

const MainImageXButton = styled.div`
  flex: 1;
  // width: 100%;
  font-weight: 300;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }

  first = () => {
    this.setState({ selected: 1 });
  };
  second = () => {
    this.setState({ selected: 2 });
  };
  third = () => {
    this.setState({ selected: 3 });
  };
  fourth = () => {
    this.setState({ selected: 4 });
  };

  render() {
    const _HowItWorks = ({ intl: { formatMessage } }) => (
      <ContainerBlue style={{ display: 'none' }}>
        <Container>
          <SectionTitleLight>{formatMessage({ id: 'home.howitworks.how-it-works' })}</SectionTitleLight>
          <HowItWorksContainer>
            <MainImageX>.</MainImageX>
            <MainImageXButton>
              <HowItWorksButtonSelected isSelected={this.state.selected === 1} onClick={this.first}>
                <HowItWorksButtonSIcon>
                  {this.state.selected === 1 ? <img src="/assets/howtoinstall_blue.svg" /> : <img src="/assets/howtoinstall.svg" />}
                </HowItWorksButtonSIcon>
                <div>{formatMessage({ id: 'home.howitworks.how-to-install' })}</div>
              </HowItWorksButtonSelected>
              <HowItWorksButtonSelected isSelected={this.state.selected === 2} onClick={this.second}>
                <HowItWorksButtonSIcon>
                  {this.state.selected === 2 ? <img src="/assets/import.svg" /> : <img src="/assets/import_white.svg" />}
                </HowItWorksButtonSIcon>
                <div>{formatMessage({ id: 'home.howitworks.how-to-move' })}</div>
              </HowItWorksButtonSelected>
              <HowItWorksButtonSelected isSelected={this.state.selected === 3} onClick={this.third}>
                <HowItWorksButtonSIcon>
                  {this.state.selected === 3 ? <img src="/assets/send.svg" /> : <img src="/assets/send_white.svg" />}
                </HowItWorksButtonSIcon>
                <div>{formatMessage({ id: 'home.howitworks.send-receive' })}</div>
              </HowItWorksButtonSelected>
              <HowItWorksButtonSelected isSelected={this.state.selected === 4} onClick={this.fourth}>
                <HowItWorksButtonSIcon>
                  {this.state.selected === 4 ? <img src="/assets/recover.svg" /> : <img src="/assets/recover_white.svg" />}
                </HowItWorksButtonSIcon>
                <div>{formatMessage({ id: 'home.howitworks.recover-lost' })}</div>
              </HowItWorksButtonSelected>
            </MainImageXButton>
          </HowItWorksContainer>
        </Container>
      </ContainerBlue>
    );

    const HowItWorks = inject('locale')(injectIntl(_HowItWorks));

    return <HowItWorks />;
  }
}

export default App;
