import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject } from 'mobx-react';
import ModalVideo from 'react-modal-video';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FormattedHTMLMessage } from 'react-intl';
import { Container, ContainerGrey, Overflow, SectionTitle } from './../css';
import HowItWorks from './HowItWorks';
import styled from 'styled-components';

const MainTitle = styled.div`
  font-size: 33px;
  color: white;
`;

const SubTitle = styled.div`
  margin-top: 6px;
  font-size: 28px;
  font-weight: 300;
  color: white;
`;

const SubSubTitle = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 300;
  margin-top: 6px;
  display: flex;
  align-items: center;
  // justify-content: center;
`;

const MainText = styled.div`
  flex: 1;
`;

const MainImage = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
  flex: 1;
  max-width: 390px;
  background-image: url('/assets/computer.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

const Right = styled.div`
  @media (min-width: 700px) {
    margin: 0 0 0 50%;
  }
  @media (max-width: 700px) {
    margin: 0 8px 0 8px;
    min-height: 280px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  @media (min-width: 700px) {
    margin: 0 50% 0 0;
  }
  @media (max-width: 700px) {
    margin: 0 8px 0 8px;
    min-height: 320px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Square = styled.div`
  flex: 0 0 132px;
  margin-right: 30px;
  width: 132px;
  height: 126px;
  transform: rotate(-10deg);
  border-radius: 30px;
  background-image: linear-gradient(to right, #1c45ba, #4c65ff);
`;

const SquareImage = styled.img`
  transform: rotate(10deg) translate(-4px, -4px);
`;

const SquareText = styled.div`
  flex: 1;
`;

const SquareTextTitle = styled.div`
  color: #353535;
  font-size: 30px;
  margin-bottom: 23px;
`;

const SquareTextText = styled.div`
  font-size: 14px;
  color: #847e7e;
  line-height: 1.54;
`;

const MainButtons = styled.div`
  display: flex;
  @media (min-width: 700px) {
    flex-direction: row;
    max-width: 410px;
    margin-top: 70px;
  }
  @media (max-width: 700px) {
    margin-top: 40px;

    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  align-items: center;
  justify-content: center;
`;

const DownloadB = styled.div`
  @media (min-width: 700px) {
    flex: 1;
  }
  @media (max-width: 700px) {
    width: 210px;
  }
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-right: 10px;
  border-radius: 4px;
  width: 200px;
  box-shadow: 0 2px 48px 0 #184dcf;
  padding-left: 8px;
  padding-right: 8px;
  background: #17d1aa;
  color: #ffffff;
  cursor: pointer;
  display: flow;
  flow-orientation: row;
  
  transition: all .2s;
  &:hover {
    background: rgba(23, 209, 170, .8);
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
  }
`;

const DownloadBChrome = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`;

const DownloadBChromeTextA = styled.div`
  text-transform: uppercase;
  font-size: 15px;
`;

const DownloadBChromeTextB = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 300;
`;

const WatchVideo = styled.div`
  @media (min-width: 700px) {
    flex: 1;
  }
  @media (max-width: 700px) {
    width: 208px;
    margin-top: 16px;
  }

  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  height: 46px;
  margin-right: 10px;
  border-radius: 4px;
  width: 200px;
  box-shadow: 0 2px 48px 0 #184dcf;
  padding-left: 8px;
  padding-right: 8px;

  border: solid 2px white;
  background: #ffffff00;
  color: #ffffff;
  cursor: pointer;
  display: flow;
  flow-orientation: row;

  transition: all .2s;
  &:hover{    
    background: white;
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
    color: #405CE4;
  }
  &:hover span{
    background-image: url('/assets/playbtn-reverse.svg');
    background-repeat: no-repeat; 
  }
`;

const WatchVideoImage = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  margin-right: 10px;
  background: url('/assets/playbtn.svg') center no-repeat;
  border: 0;
`;

const WatchVideoText = styled.div`
  font-size: 15px;
`;

const MarketButtons = styled.div`
  display: flex;
  margin-top: 10px;

  @media (max-width: 700px) {
    flex-direction: row;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }  
`;

const AppStoreButton = styled.a`
  display: block;
  width: 193px;
  height: 50px;
  margin-right: 10px;
  position: relative;
  background: black;
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 700px) {
    width: 228px;
  }
`;

const AppStoreLogo = styled.img`
  position: absolute;
  top: -55px;
  left: 0;
  width: 193px;
  height: 160px;

  @media (max-width: 700px) {
    left: 17.5px;
  }
`;

const GooglePlayButton = styled.a`
  display: block;
  width: 197px;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background: black;

  &::before, &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 15px;
    background: black;
    z-index: 1;
  }

  &::after {
    right: 0;
  }

  @media (max-width: 700px) {
    margin-top: 15px;
    margin-right: 10px;
    width: 226px;

    &::before, &::after {
      width: 30px;
    }
  }
`;

const GooglePlayLogo = styled.img`
  position: absolute;
  top: -15px;
  left: -5px;
  height: 80px;

  @media (max-width: 700px) {
    left: 9px;
  }
`;

const YoroiInfo = styled.span`
  margin-right: none;
`;

const CheckMark = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  padding-bottom: 3px;
`;

const CheckMark2 = CheckMark.extend`
  margin-left: 14px;
  padding-bottom: 3px;
`;

const EmurgoLogo = styled.img`
  margin-left: 6px;
  width: 115px;
`;

const ContainerBottom = Container.extend`
  padding-bottom: 60px;
`;

// YOROI TECHNOLOGY
const YoroiTechBlocks = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (mix-width: 700px) {
    flex-direction: row;
  }
  margin-bottom: 10px;
  width: 100%;
`;

const YoroiTechBlockContainerText = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #847e7e;
  text-align: center;
`;

const YoroiTechBlockContainerTextL = styled.div`
  margin-top: 16px;
  font-size: 12px;
  color: #847e7e;
  text-align: left;
  color: white;
  position: relative;
  top: 32px;
`;

const YoroiTechImage = styled.img`
  margin-top: 4px;
  margin-bottom: 4px;
  max-width: 114px;
  max-height: 114px;
  min-height: 114px;
`;
const YoroiTechLink = styled.a`
  font-size: 20px;
  text-decoration: none;
`;

const YoroiTechBlueBackground = styled.div`
  border-radius: 30px;
  background-image: linear-gradient(to right, #1850d7, #4763fb 20%);
  width: 400px;
  height: 400px;
  z-index: 1;
  transform: rotate(-10deg);
  top: -200px;
  right: -194px;
  position: relative;
`;

const YoroiTechPad = styled.div`
  padding-left: 10px;
`;

// YOROI ROADMAP
const YoroiRoadMapBlocks = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;

  @media (min-width: 700px) {
    flex-direction: row;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const YoroiRoadMapBlock = styled.div`
  text-align: center;
  width: 240px;
`;

const YoroiRoadMapBlockX = styled.div`
  text-align: center;
  // width: 240px;
  flex: 1;
  margin-top: 8px;
  
  a{
    text-decoration: none;
    transition: all 5s;
    &:hover > div{
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
      border: 1px solid #a6b4f4;
    }
  }
`;

const YoroiRoadMapBlockLarge = styled.div`
  text-align: center;
  // width: 480px;
  flex: 2.15;

  a{
    text-decoration: none;
    transition: all 5s;    
    &:hover > div{
      box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
      border: 1px solid #a6b4f4;
    }
  }
`;

const YoroiHideResponsive = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

const YoroiRoadBar = YoroiHideResponsive.extend`
  width: 100%;
  height: 3px;
  background-color: #dedee3;
`;

const YoroiRoadCircleGrey = YoroiHideResponsive.extend`
  width: 26px;
  height: 26px;
  background-color: #dedee3;
  border-radius: 13px;
  position: relative;
  top: -16px;
  margin: 0 auto;
`;

const YoroiRoadCircleGreyLarge = YoroiRoadCircleGrey.extend`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const YoroiRoadBarCircleBlue = YoroiHideResponsive.extend`
  width: 14px;
  height: 14px;
  background-color: #2f5ae9;
  border-radius: 7px;
  position: relative;
  top: -36px;
  margin: 0 auto;
`;
const YoroiRoadBarCircleGreen = YoroiRoadBarCircleBlue.extend`
  background-color: #17d1aa;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  top: -44px;
`;

const YoroiRoadBlock = styled.div`
  // width: 210px;
  border-radius: 20px;
  border: 1px solid white;
  background-color: #f4f4f7;
  margin: 0 auto;
  @media (max-width: 700px) {
    margin-top: 20px;
  }

`;

const YoroiRoadBlockBlue = YoroiRoadBlock.extend`
  background-image: linear-gradient(to right, #1850d7, #4763fb);
  color: white;
  position: relative;
  @media (min-width: 700px) {
    top: -14px;
  }
`;

const YoroiRoadBlockWhite = YoroiRoadBlock.extend`
  background-color: white;
  @media (min-width: 700px) {
    min-height: 364px;
  }
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
`;

const YoroiRoadBlockWhiteLarge = YoroiRoadBlock.extend`
  background-color: white;
  // width: 450px;
  flex: 2.15;
  overflow: hidden;
  height: 220px;
`;

const YoroiRoadBlockWhiteLargeFlex = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TechFlex = styled.div`
  flex: 0.8;
`;

const YoroiTechLinkLarge = YoroiTechLink.extend`
  color: white;
  position: relative;
  font-size: 25px;
  font-weight: 300;
`;

const YoroiRoadBlockTitle = styled.div`
  font-size: 24px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YoroiRoadBlockTitleRel = YoroiRoadBlockTitle.extend`
  color: white;
  position: relative;
  top: 30px;
  justify-content: normal;
`;

const YoroiRoadBlockContainer = styled.div`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  color: #847e7e;
  padding-bottom: 20px;
`;

const YoroiRoadBlockContainerNoLPad = styled.div`
  text-align: left;
  padding-left: 0px;
  padding-right: 10px;
  font-size: 13px;
  color: #847e7e;
  padding-bottom: 20px;
`;

const YoroiRoadBlockContainerFlex = YoroiRoadBlockContainer.extend`
  flex: 1;
`;

const YoroiRoadBlockContainerBlue = YoroiRoadBlockContainer.extend`
  color: white;
`;

const YoroiRoadBlockContainerText = styled.div`
  display: flex;
  margin-top: 8px;
`;

const YoroiRoadBlockContainerCheck = styled.img`
  flex:0;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  margin-left: 6px;
`;

// Wise

const YoroiWiseWorks = styled.div`
  margin-top: 55px;
  margin-bottom: 33px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const YoroiWiseWorksContainer = styled.div`
  color: #847e7e;
  width: 462px;
  height: 126px;
  border-radius: 15px;
  background-color: #e4e4ec;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const YoroiWiseWorksTextA = styled.div`
  font-size: 20px;
`;

const YoroiWiseWorksTextB = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Arrow = styled.i`
  font-size: 12px;
  margin-left: 9px;
  font-weight: 100;
  position: relative;
  top: -3px;
`;

/**
 *  This Component is to be able to pass isOpen
 *  to ModalVideo. Example did not work as intenteded:
 *  Prop was passed by isOpen={this.state.video} but
 *  not binded to state isOpen.
 */
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
      showSupportModal: false,
    };
    this.openVideo = this.openVideo.bind(this);
  }

  openVideo() {
    this.setState({ video: true });
  }

  render() {
    const _Home = ({ intl: { formatMessage } }) => (
      <span>
        <ContainerBottom>
          <Video isOpen={this.state.video} channel="youtube" videoId="DHtEgLMslIQ" onClose={() => this.setState({ video: false })} />

          <Overflow>
            <MainText>
              <MainTitle>
                <YoroiInfo>{formatMessage({ id: 'home.title.Yoroi' })}</YoroiInfo>
                {formatMessage({ id: 'home.title.YoroiDescription' })}
              </MainTitle>
              <SubTitle>
                <CheckMark src="/assets/check.png" />
                {formatMessage({ id: 'home.title.Secure' })}
                <CheckMark2 src="/assets/check.png" />
                {formatMessage({ id: 'home.title.Fast' })}
                <CheckMark2 src="/assets/check.png" />
                {formatMessage({ id: 'home.title.Simple' })}
              </SubTitle>
              <SubSubTitle>
                By <EmurgoLogo src="/assets/emurgo_logo.png" alt="Emurgo - Creating a more connected and equitable world through Cardano blockchain" border="0" />
              </SubSubTitle>

              <MainButtons>
                <DownloadB onClick={() => {
                  this.setState({ show: false });
                  const win = window.open('https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb', '_blank');
                  win.focus();
                }}>
                  <div>
                    <DownloadBChrome src="/assets/chrome.svg" />
                  </div>
                  <DownloadBChromeTextB>
                    <DownloadBChromeTextA> {formatMessage({ id: 'home.title.download-chrome-a' })}</DownloadBChromeTextA>
                    <DownloadBChromeTextB> {formatMessage({ id: 'home.title.download-chrome-b' })}</DownloadBChromeTextB>
                  </DownloadBChromeTextB>
                </DownloadB>
                <WatchVideo onClick={this.openVideo}>
                  <span>
                    <WatchVideoImage />
                  </span>
                  <div>
                    <WatchVideoText> {formatMessage({ id: 'home.title.watch-the-video' })} </WatchVideoText>
                  </div>
                </WatchVideo>

              </MainButtons>
              
              <MarketButtons style={{ display: 'flex' }}>
                <AppStoreButton href="https://itunes.apple.com/app/emurgos-yoroi-cardano-wallet/id1447326389?mt=8" target="_blank" rel="noopener noreferrer">
                  <AppStoreLogo src="../../assets/app-store-badge.svg" />
                </AppStoreButton>

                <GooglePlayButton href="https://play.google.com/store/apps/details?id=com.emurgo" target="_blank" rel="noopener noreferrer">
                  <GooglePlayLogo src="../../assets/google-play-badge.svg" />
                </GooglePlayButton>
              </MarketButtons>
            </MainText>
            <MainImage />
          </Overflow>

          <Right>
            <Square>
              <SquareImage src="./assets/secure.png" alt="Yoroi is a Web Light Wallet for Cardano Secure Fast Simple" />
            </Square>
            <SquareText>
              <SquareTextTitle>{formatMessage({ id: 'home.properties.secure' })}</SquareTextTitle>
              <SquareTextText>
                <span style={{ color: '#353535', fontWeight: '500' }}>{formatMessage({ id: 'home.properties.secure-text-highlight' })}</span>
                {formatMessage({ id: 'home.properties.secure-text' })}
              </SquareTextText>
            </SquareText>
          </Right>

          <Left>
            <Square>
              <SquareImage src="./assets/fast.png" alt="Yoroi - Fast Our innovation" />
            </Square>
            <SquareText>
              <SquareTextTitle>{formatMessage({ id: 'home.properties.fast' })}</SquareTextTitle>
              <SquareTextText>
                <span style={{ color: '#353535', fontWeight: '500' }}>{formatMessage({ id: 'home.properties.fast-text-highlight' })}</span>
                {formatMessage({ id: 'home.properties.fast-text' })}
              </SquareTextText>
            </SquareText>
          </Left>

          <Right>
            <Square>
              <SquareImage src="./assets/simple.png" alt="Yoroi - Simple Our passion" />
            </Square>
            <SquareText>
              <SquareTextTitle>{formatMessage({ id: 'home.properties.simple' })}</SquareTextTitle>
              <SquareTextText>
                <span style={{ color: '#353535', fontWeight: '500' }}>{formatMessage({ id: 'home.properties.simple-text-highlight' })}</span>
                {formatMessage({ id: 'home.properties.simple-text' })}
              </SquareTextText>
            </SquareText>
          </Right>
        </ContainerBottom>

        <ContainerGrey>
          <Container>
            <SectionTitle>{formatMessage({ id: 'home.collaborators.our-collaborators' })}</SectionTitle>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '23px',
              }}
            >
              <div style={{ margin: '16px' }}>
                <a target="_blank" href="https://emurgo.io/">
                  <img style={{ height: '50px' }} src="/assets/emurgo_logo_grey.png" alt="Emurgo - Creating a more connected and equitable world through Cardano blockchain" />
                </a>
              </div>
              <div style={{ margin: '16px' }}>
                <a target="_blank" href="https://iohk.io/">
                  <img style={{ height: '50px' }} src="/assets/iohk.png" alt="iohk" />
                </a>
              </div>
            </div>
          </Container>
        </ContainerGrey>

        <HowItWorks />

        <Container style={{ paddingBottom: '100px' }}>
          <SectionTitle style={{ paddingBottom: '80px' }}>{formatMessage({ id: 'home.roadmap.yoroi-roadmap' })}</SectionTitle>

          <YoroiRoadMapBlocks>
            <YoroiRoadMapBlock>
              <YoroiRoadBar />
              <YoroiRoadCircleGreyLarge />
              <YoroiRoadBarCircleGreen />
              <YoroiRoadBlockBlue>
                <YoroiRoadBlockTitle>
                  {formatMessage({ id: 'home.roadmap.q1-title' })}
                </YoroiRoadBlockTitle>
                <YoroiRoadBlockContainerBlue>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check.png" /> {formatMessage({ id: 'home.roadmap.q1-a' })}
                  </YoroiRoadBlockContainerText>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check.png" /> {formatMessage({ id: 'home.roadmap.q1-b' })}
                  </YoroiRoadBlockContainerText>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check.png" /> {formatMessage({ id: 'home.roadmap.q1-c' })}
                  </YoroiRoadBlockContainerText>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check.png" /> {formatMessage({ id: 'home.roadmap.q1-d' })}
                  </YoroiRoadBlockContainerText>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check.png" /> {formatMessage({ id: 'home.roadmap.q1-e' })}
                  </YoroiRoadBlockContainerText>
                </YoroiRoadBlockContainerBlue>
              </YoroiRoadBlockBlue>
            </YoroiRoadMapBlock>

            <div style={{ flex: 0.2 }}>
              <YoroiRoadBar />
            </div>

            <YoroiRoadMapBlock>
              <YoroiRoadBar />
              <YoroiRoadCircleGrey />
              <YoroiRoadBarCircleBlue />
              <YoroiRoadBlock>
                <YoroiRoadBlockTitle>
                  {formatMessage({ id: 'home.roadmap.q2-title' })}
                </YoroiRoadBlockTitle>
                <YoroiRoadBlockContainer>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check-green.png" />
                    {formatMessage({ id: 'home.roadmap.q2-a' })}
                  </YoroiRoadBlockContainerText>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check-green.png" />
                    {formatMessage({ id: 'home.roadmap.q2-b' })}
                  </YoroiRoadBlockContainerText>
                </YoroiRoadBlockContainer>
              </YoroiRoadBlock>
            </YoroiRoadMapBlock>

            <div style={{ flex: 0.2 }}>
              <YoroiRoadBar />
            </div>

            <YoroiRoadMapBlock>
              <YoroiRoadBar />
              <YoroiRoadCircleGrey />
              <YoroiRoadBarCircleBlue />
              <YoroiRoadBlock>
                <YoroiRoadBlockTitle>
                  {formatMessage({ id: 'home.roadmap.q3-title' })}
                </YoroiRoadBlockTitle>
                <YoroiRoadBlockContainer>
                  <YoroiRoadBlockContainerText>
                    <YoroiRoadBlockContainerCheck src="/assets/check-green.png" />
                    {formatMessage({ id: 'home.roadmap.q3-a' })}
                  </YoroiRoadBlockContainerText>
                </YoroiRoadBlockContainer>
              </YoroiRoadBlock>
            </YoroiRoadMapBlock>
          </YoroiRoadMapBlocks>
        </Container>

        <ContainerGrey>
          <Container style={{ paddingBottom: '30px' }}>
            <SectionTitle style={{ paddingBottom: '40px' }}>{formatMessage({ id: 'home.technologies.technologies' })}</SectionTitle>

            <YoroiTechBlocks>
              <YoroiRoadMapBlockX>
                <a target="_blank" href="https://github.com/rust-lang/rust">
                  <YoroiRoadBlockWhite>
                    <YoroiTechImage src="/assets/rust.png" alt="Rust is a systems programming language that runs very quickly" />
                    <YoroiRoadBlockTitle>
                      <YoroiTechLink>
                        {formatMessage({ id: 'home.technologies.tech1-title' })}
                        <Arrow className="fa fa-arrow-right" />
                      </YoroiTechLink>
                    </YoroiRoadBlockTitle>
                    <YoroiRoadBlockContainer>
                      <YoroiTechBlockContainerText>{formatMessage({ id: 'home.technologies.tech1-text' })}</YoroiTechBlockContainerText>
                    </YoroiRoadBlockContainer>
                  </YoroiRoadBlockWhite>
                </a>
              </YoroiRoadMapBlockX>

              <div style={{ flex: 0.15 }} />
              <YoroiRoadMapBlockX>
                <a target="_blank" href="https://github.com/nodejs">
                  <YoroiRoadBlockWhite>
                    <YoroiTechImage src="/assets/nodejs2.png" alt="Node.js is an open source" />
                    <YoroiRoadBlockTitle>
                      <YoroiTechLink >
                        {formatMessage({ id: 'home.technologies.tech2-title' })}
                        <Arrow className="fa fa-arrow-right" />
                      </YoroiTechLink>
                    </YoroiRoadBlockTitle>
                    <YoroiRoadBlockContainer>
                      <YoroiTechBlockContainerText>{formatMessage({ id: 'home.technologies.tech2-text' })}</YoroiTechBlockContainerText>
                    </YoroiRoadBlockContainer>
                  </YoroiRoadBlockWhite>
                </a>
              </YoroiRoadMapBlockX>
              <div style={{ flex: 0.15 }} />

              <YoroiRoadMapBlockX>
                <a target="_blank" href="https://github.com/webassembly">
                  <YoroiRoadBlockWhite>
                    <YoroiTechImage src="/assets/webassembly.png" alt="WebAssembly is a binary instruction format for a stack-based virtual machine" />
                    <YoroiRoadBlockTitle>
                      <YoroiTechLink>
                        {formatMessage({ id: 'home.technologies.tech3-title' })}
                        <Arrow className="fa fa-arrow-right" />
                      </YoroiTechLink>
                    </YoroiRoadBlockTitle>
                    <YoroiRoadBlockContainer>
                      <YoroiTechBlockContainerText>{formatMessage({ id: 'home.technologies.tech3-text' })}</YoroiTechBlockContainerText>
                    </YoroiRoadBlockContainer>
                  </YoroiRoadBlockWhite>
                </a>
              </YoroiRoadMapBlockX>
              <div style={{ flex: 0.15 }} />

              <YoroiRoadMapBlockX>
                <a target="_blank" href="https://github.com/input-output-hk/cardano-sl">
                  <YoroiRoadBlockWhite>
                    <YoroiTechImage src="/assets/cardano.png" alt="Cardano is a third-generation blockchain platform evolved out of a scientific philosophy" />
                    <YoroiRoadBlockTitle>
                      <YoroiTechLink>
                        {formatMessage({ id: 'home.technologies.tech4-title' })}
                        <Arrow className="fa fa-arrow-right" />
                      </YoroiTechLink>
                    </YoroiRoadBlockTitle>
                    <YoroiRoadBlockContainer>
                      <YoroiTechBlockContainerText>{formatMessage({ id: 'home.technologies.tech4-text' })}</YoroiTechBlockContainerText>
                    </YoroiRoadBlockContainer>
                  </YoroiRoadBlockWhite>
                </a>
              </YoroiRoadMapBlockX>
            </YoroiTechBlocks>

            <YoroiRoadMapBlocks style={{ marginTop: '40px' }}>
              <YoroiRoadMapBlockLarge>
                <a target="_blank" href="https://github.com/Emurgo/yoroi-frontend">
                  <YoroiRoadBlockWhiteLarge>
                    <YoroiRoadBlockWhiteLargeFlex>
                      <TechFlex>
                        <img style={{ width: '100px' }} src="/assets/yoroiicon_black.png" alt="Yoroi - We believe in the spirit of open source" />
                      </TechFlex>
                      <YoroiRoadBlockContainerFlex>
                        <YoroiTechPad>
                          <YoroiRoadBlockTitleRel>
                            <YoroiTechLinkLarge >
                              {formatMessage({ id: 'home.technologies.tech5-title' })}
                              <Arrow className="fa fa-arrow-right" />
                            </YoroiTechLinkLarge>
                          </YoroiRoadBlockTitleRel>
                          <YoroiRoadBlockContainerNoLPad>
                            <YoroiTechBlockContainerTextL>
                              <FormattedHTMLMessage id="home.technologies.tech5-text" />
                            </YoroiTechBlockContainerTextL>
                          </YoroiRoadBlockContainerNoLPad>
                        </YoroiTechPad>
                      </YoroiRoadBlockContainerFlex>
                    </YoroiRoadBlockWhiteLargeFlex>
                    <YoroiTechBlueBackground />
                  </YoroiRoadBlockWhiteLarge>
                </a>
              </YoroiRoadMapBlockLarge>

              <div style={{ flex: 0.15 }} />

              <YoroiRoadMapBlockLarge>
                <a target="_blank" href="https://github.com/input-output-hk/cardano-sl">
                  <YoroiRoadBlockWhiteLarge>
                    <YoroiRoadBlockWhiteLargeFlex>
                      <TechFlex>
                        <img style={{ width: '100px' }} src="/assets/cardano.png" alt="Cardano is a decentralised public blockchain and cryptocurrency developed by IOHK" />
                      </TechFlex>
                      <YoroiRoadBlockContainerFlex>
                        <YoroiTechPad>
                          <YoroiRoadBlockTitleRel>
                            <YoroiTechLinkLarge>
                              {formatMessage({ id: 'home.technologies.tech6-title' })}
                              <Arrow className="fa fa-arrow-right" />
                            </YoroiTechLinkLarge>
                          </YoroiRoadBlockTitleRel>
                          <YoroiRoadBlockContainerNoLPad>
                            <YoroiTechBlockContainerTextL>{formatMessage({ id: 'home.technologies.tech6-text' })}</YoroiTechBlockContainerTextL>
                          </YoroiRoadBlockContainerNoLPad>
                        </YoroiTechPad>
                      </YoroiRoadBlockContainerFlex>
                    </YoroiRoadBlockWhiteLargeFlex>
                    <YoroiTechBlueBackground />
                  </YoroiRoadBlockWhiteLarge>
                </a>
              </YoroiRoadMapBlockLarge>
            </YoroiRoadMapBlocks>

            {/*<YoroiWiseWorks style={{ display: 'none' }}>*/}
            {/*<YoroiWiseWorksContainer>*/}
            {/*<YoroiWiseWorksTextA> "{formatMessage({id: 'wise-title'})}" </YoroiWiseWorksTextA>*/}
            {/*<YoroiWiseWorksTextB> {formatMessage({id: 'wise-subtitle'})} </YoroiWiseWorksTextB>*/}
            {/*</YoroiWiseWorksContainer>*/}
            {/*</YoroiWiseWorks>*/}
          </Container>
        </ContainerGrey>
      </span>
    );

    const Home = inject('locale')(injectIntl(_Home));

    return <Home />;
  }
}

export default App;
