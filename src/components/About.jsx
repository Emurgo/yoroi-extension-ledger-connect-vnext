import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react/index';
import { Container, ContainerBlue, OverflowS } from './../css';
import styled from 'styled-components';
import ModalVideo from 'react-modal-video';
import { FormattedHTMLMessage } from 'react-intl';

const SectionA = styled.div``;

const BoxLogo = styled.div`
  width: 132.8px;
  height: 126.7px;
  transform: rotate(-10deg);
  border-radius: 30px;
  background-image: linear-gradient(to right, #1850d7, #4763fb);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BowWrapper = styled.div`
  @media (min-width: 700px) {
    margin-left: 100px;
    flex: 0.3;
  }
  @media (max-width: 700px) {
    margin-left: 10px;
  }
`;

const BoxLogoI = styled.img`
  transform: rotate(10deg);
  width: 60px;
`;

const VideoTitle = styled.div`
  color: white;
  font-size: 30px;
  padding-bottom: 40px;
`;

const ContainerA = Container.extend`
  display: flex;
  @media (min-width: 700px) {
    flex-direction: row
  }
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Meaning = Container.extend`
  justify-content: center;
  flex-direction: column; 
  display: flex;
  
  @media (min-width: 700px) {
    flex: 1,
  }
  @media (max-width: 700px) {
  }
`;

class Video extends ModalVideo {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
    };
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: false,
    };
    this.openVideo = this.openVideo.bind(this);
  }

  openVideo() {
    this.setState({ video: true });
  }

  render() {
    const _About = ({ intl: { formatMessage } }) => (
      <span>
        <Video isOpen={this.state.video} channel="youtube" videoId="DHtEgLMslIQ" onClose={() => this.setState({ video: false })} />

        <Container>
          <OverflowS style={{ height: '180px' }}>
            <div style={{ fontSize: '40px', color: 'white', fontWeight: '300' }}>{formatMessage({ id: 'header.about' })}</div>
          </OverflowS>
        </Container>

        <SectionA style={{ padding: '0 0 90px 0' }}>
          <ContainerA>
            <div style={{ textAlign: 'center' }}>
              <a target="_blank" href="https://emurgo.io">
                <img
                  style={{
                    margin: '30px',
                    width: '160px',
                    transform: 'rotate(-10deg)',
                    borderRadius: '30px',
                    boxShadow: '0 2px 48px 0 #ababab',
                  }}
                  src="/assets/emurgo-logo.jpg"
                />
              </a>
            </div>
            <Meaning>
              <div style={{ color: '#353535', fontSize: '30px', paddingBottom: '23px' }}>{formatMessage({ id: 'about.the-meaning-title' })}</div>
              <div style={{ color: '#847e7e', fontSize: '14px', maxWidth: '700px' }}>
                <FormattedHTMLMessage id={'about.the-meaning-p1'} />
              </div>
              <br />
              <div style={{ color: '#847e7e', fontSize: '14px', maxWidth: '700px' }}>
                <FormattedHTMLMessage id={'about.the-meaning-p2'} />
              </div>
            </Meaning>
          </ContainerA>
        </SectionA>

        <SectionA style={{ backgroundColor: '#edeef2', padding: '90px 0 90px 0' }}>
          <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', display: 'flex', maxWidth: '700px' }}>
              <div style={{ color: '#353535', fontSize: '30px', paddingBottom: '23px' }}>{formatMessage({ id: 'about.why-yoroi-title' })}</div>
              <div style={{ color: '#847e7e', fontSize: '14px', maxWidth: '700px' }}>{formatMessage({ id: 'about.why-yoroi-text' })}</div>
            </div>
            <BowWrapper>
              <BoxLogo>
                <BoxLogoI src="/assets/yoroiicon.svg" />
              </BoxLogo>
            </BowWrapper>
          </Container>
        </SectionA>

        <ContainerBlue style={{ paddingBottom: '40px' }}>
          <Container style={{ display: 'flex', flexDirection: 'row', paddingTop: '90px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <VideoTitle>{formatMessage({ id: 'about.emurgo-announcement' })}</VideoTitle>
              <div
                onClick={this.openVideo}
                style={{
                  background: 'black',
                  width: '423px',
                  height: '246px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img src="/assets/playbtn.svg" style={{ width: '80px' }} />
              </div>
            </div>
            {/*<div style={{flex: 1, display: 'none'}}>*/}
            {/*<VideoTitle>{formatMessage({id: "yoroi-launch"})}</VideoTitle>*/}
            {/*<div onClick={this.openVideo} style={{background: 'black', width: '423px', height: '246px'}}></div>*/}
            {/*</div>*/}
          </Container>
        </ContainerBlue>
      </span>
    );

    const About = inject('locale')(injectIntl(observer(_About)));
    return <About />;
  }
}
export default App;
