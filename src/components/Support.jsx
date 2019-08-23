import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import HowItWorks from './HowItWorks';
import styled from 'styled-components';
import { Container, OverflowS, ContainerBlue } from './../css';
import './../css/custom.css';

const SectionB = styled.div``;

const SectionC = styled.div``;

// YOROI ROADMAP
const YoroiRoadMapBlocks = styled.div`
  display: flex;
  margin-bottom: 10px;

  @media (min-width: 700px) {
    flex-direction: row;
    padding-bottom: 48px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const YoroiRoadMapBlockLarge = styled.div`
  text-align: center;
  @media (min-width: 700px) {
    width: 480px;
  }

  @media (max-width: 700px) {
  }
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
  @media (max-width: 700px) {
    max-width: 159px;
  }
`;

const YoroiTechLink = styled.a`
  font-size: 20px;
  text-decoration: none;
`;

const YoroiTechLinkLarge = YoroiTechLink.extend`
  color: #3f60f5;
  position: relative;
  font-size: 25px;
  font-weight: 300;
`;

const YoroiRoadBlock = styled.div`
  width: 210px;
  border-radius: 20px;
  background-color: #f4f4f7;
  margin: 0 auto;
`;

const YoroiRoadBlockWhite = YoroiRoadBlock.extend`
  background-color: white;
`;

const YoroiRoadBlockWhiteLarge = YoroiRoadBlockWhite.extend`
  overflow: hidden;
  height: 220px;
  box-shadow: 0 2px 40px 0 rgba(229, 229, 229, 0.5);

  @media (min-width: 700px) {
    width: 450px;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const YoroiRoadBlockContainer = styled.div`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  color: #847e7e;
  padding-bottom: 20px;
`;

const YoroiRoadBlockContainerFlex = YoroiRoadBlockContainer.extend`
  flex: 1;
`;

const YoroiRoadBlockTitle = styled.div`
  font-size: 24px;
  padding-top: 10px;
  color: #3f60f5;
  display: flex;
  align-items: center;
`;

const YoroiTechPad = styled.div`
  padding-left: 40px;
`;

const YoroiRoadBlockContainerNoLPad = styled.div`
  text-align: left;
  padding-left: 0px;
  padding-right: 10px;
  font-size: 13px;
  color: #847e7e;
  padding-bottom: 20px;
`;

const YoroiTechBlockContainerTextL = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #847e7e;
  text-align: left;
  color: #847e7e;
  position: relative;
`;

const YoroiTechBlueBackground = styled.div`
  border-radius: 30px;
  background-image: linear-gradient(to right, #1850d7, #4763fb 20%);
  width: 400px;
  height: 400px;
  zindex: 1;
  transform: rotate(-10deg);
  top: -396px;
  @media (min-width: 700px) {
    right: 228px;
  }
  @media (max-width: 700px) {
    right: 258px;
  }
  position: relative;
  box-shadow: 0 2px 40px 0 rgba(179, 179, 179, 0.5);
`;

const NumberBox = styled.div`
  width: 47px;
  height: 47px;
  transform: rotate(-10deg);
  border-radius: 11px;
  background-image: linear-gradient(to right, #1850d7, #4763fb);
  text-align: center;
  color: #ffffff;
  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberBoxR = styled.div`
  transform: rotate(10deg);
`;

const CheckTheFaqTitle = styled.div`
  color: #353535;
  font-size: 24px;
  margin-left: 20px;
`;

const CheckTheFaqText = styled.div`
  color: #847e7e;
  font-size: 14px;
  margin-left: 70px;
`;

const SupportTitle = styled.div`
  color: white;
  font-size: 30px;
  padding-bottom: 40px;
`;

const SupportSubtitle = styled.div`
  color: white;
  font-size: 15px;
  padding-bottom: 40px;
`;

const SupportFaq = styled.div`
  display: flex;

  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }

  @media (min-width: 700px) {
    flex-direction: row;
    padding-bottom: 48px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const SupportFaqBlock = styled(Link)`
  flex: 1;

  @media (min-width: 700px) {
  }

  @media (max-width: 700px) {
    padding-bottom: 48px;
  }
`;

const FAQList = styled.div`
  padding-bottom: 2px;
`;

const Arrow = styled.i`
  font-size: 12px;
  margin-left: 9px;
  font-weight: 100;
  position: relative;
  top: -3px;
`;

const NeedSupport = styled.div`
  @media (min-width: 700px) {
    flex: 1;
  }
  @media (max-width: 700px) {
    width: 210px;
  }
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 15px;
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSupportModal: false,
    };
  }

  loadScript(src, id) {
    const script = document.createElement('script');
    script.src = src;
    if (id) {
      script.id = id;
    }

    script.addEventListener('load', function () {
      console.log(`SCRIPT LOADED : ${script.src}`);
    });
    script.addEventListener('error', function (e) {
      console.log(`SCRIPT LOAD ERROR : ${e.message}`);
    });
    document.body.appendChild(script);
  }

  componentWillMount() {
    // Start of iohk Zendesk Widget script -->
    this.loadScript('https://static.zdassets.com/ekr/snippet.js?key=116e895c-fb80-48b8-944b-dba17273a512', 'ze-snippet');
    // End of iohk Zendesk Widget script <--
  }

  render() {
    const _Support = ({ intl: { formatMessage } }) => (
      <span>
        <Container>
          <OverflowS>
            <div>
              <div style={{ fontSize: '40px', color: 'white', fontWeight: '300' }}>{formatMessage({ id: 'header.support' })}</div>
              <div style={{ fontSize: '20px', color: 'white', fontWeight: '300', width: '350px' }}>
                {formatMessage({ id: 'support.fast-response' })}
              </div>
            </div>
          </OverflowS>
        </Container>

        <HowItWorks />
        <SectionB style={{ backgroundColor: '#edeef2', paddingTop: '48px', paddingBottom: '48px' }}>
          <Container>
            <div style={{ width: '100%', textAlign: 'center', fontSize: '32px', paddingBottom: '48px' }}>
              {formatMessage({ id: 'support.check-faq' })}
            </div>

            <SupportFaq>
              <SupportFaqBlock to="/faq/1">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <NumberBox>
                    <NumberBoxR>1</NumberBoxR>
                  </NumberBox>
                  <CheckTheFaqTitle style={{ flex: 1 }}>{formatMessage({ id: 'faq.faqQuestion-title1' })}</CheckTheFaqTitle>
                </div>

                <CheckTheFaqText>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-1' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-2' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-3' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-4' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-5' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-6' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-7' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q1-8' })}</FAQList>
                </CheckTheFaqText>
              </SupportFaqBlock>

              <SupportFaqBlock to="/faq/2">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <NumberBox>
                    <NumberBoxR>2</NumberBoxR>
                  </NumberBox>
                  <CheckTheFaqTitle style={{ flex: 1 }}>{formatMessage({ id: 'faq.faqQuestion-title2' })}</CheckTheFaqTitle>
                </div>

                <CheckTheFaqText>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-1' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-2' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-3' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-4' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-5' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-6' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-7' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q2-8' })}</FAQList>
                </CheckTheFaqText>
              </SupportFaqBlock>
            </SupportFaq>

            <SupportFaq>
              <SupportFaqBlock to="/faq/3">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <NumberBox>
                    <NumberBoxR>3</NumberBoxR>
                  </NumberBox>
                  <CheckTheFaqTitle style={{ flex: 1 }}>{formatMessage({ id: 'faq.faqQuestion-title3' })}</CheckTheFaqTitle>
                </div>

                <CheckTheFaqText>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-1' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-2' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-3' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-4' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-5' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-6' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-7' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-8' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-9' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-10' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-11' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-12' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-13' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-14' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q3-15' })}</FAQList>
                </CheckTheFaqText>
              </SupportFaqBlock>

              <SupportFaqBlock to="/faq/4">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <NumberBox>
                    <NumberBoxR>4</NumberBoxR>
                  </NumberBox>
                  <CheckTheFaqTitle style={{ flex: 1 }}>{formatMessage({ id: 'faq.faqQuestion-title4' })}</CheckTheFaqTitle>
                </div>
                <CheckTheFaqText>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-1' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-2' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-3' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-4' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-5' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-6' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-7' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-8' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q4-9' })}</FAQList>
                </CheckTheFaqText>
              </SupportFaqBlock>
            </SupportFaq>
            
            <SupportFaq>
              <SupportFaqBlock to="/faq/5">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <NumberBox>
                    <NumberBoxR>5</NumberBoxR>
                  </NumberBox>
                  <CheckTheFaqTitle style={{ flex: 1 }}>{formatMessage({ id: 'faq.faqQuestion-title5' })}</CheckTheFaqTitle>
                </div>

                <CheckTheFaqText>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-1' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-2' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-3' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-4' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-5' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-6' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-7' })}</FAQList>
                  <FAQList>{formatMessage({ id: 'faq.faqQuestion-Q5-8' })}</FAQList>
                </CheckTheFaqText>
              </SupportFaqBlock>

            </SupportFaq>
          </Container>
        </SectionB>

        <SectionC style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          <Container style={{ paddingLeft: '0' }}>
            <div style={{ width: '100%', textAlign: 'center', fontSize: '32px', paddingBottom: '48px' }}>
              {formatMessage({ id: 'support.community' })}
            </div>

            <YoroiRoadMapBlocks>
              <YoroiRoadMapBlockLarge>
                <YoroiRoadBlockWhiteLarge>
                  <YoroiRoadBlockWhiteLargeFlex>
                    <TechFlex>
                      <img src="/assets/logo-telegram.svg" height="90" width="90" />
                    </TechFlex>
                    <YoroiRoadBlockContainerFlex>
                      <YoroiTechPad>
                        <YoroiRoadBlockTitle>
                          <YoroiTechLinkLarge target="_blank" href="https://t.me/CardanoCommunityTechSupport">
                            {formatMessage({ id: 'support.visit-1' })} <Arrow className="fa fa-arrow-right" />
                          </YoroiTechLinkLarge>
                        </YoroiRoadBlockTitle>
                        <YoroiRoadBlockContainerNoLPad>
                          <YoroiTechBlockContainerTextL>{formatMessage({ id: 'support.visit-1-text' })}</YoroiTechBlockContainerTextL>
                        </YoroiRoadBlockContainerNoLPad>
                      </YoroiTechPad>
                    </YoroiRoadBlockContainerFlex>
                  </YoroiRoadBlockWhiteLargeFlex>
                  <YoroiTechBlueBackground />
                </YoroiRoadBlockWhiteLarge>
              </YoroiRoadMapBlockLarge>

              <YoroiRoadMapBlockLarge>
                <YoroiRoadBlockWhiteLarge>
                  <YoroiRoadBlockWhiteLargeFlex>
                    <TechFlex>
                      <img src="/assets/forums.svg" height="90" width="90" />
                    </TechFlex>
                    <YoroiRoadBlockContainerFlex>
                      <YoroiTechPad>
                        <YoroiRoadBlockTitle>
                          <YoroiTechLinkLarge target="_blank" href="https://forum.cardano.org/c/communitytechnicalsupport">
                            {formatMessage({ id: 'support.visit-2' })} <Arrow className="fa fa-arrow-right" />
                          </YoroiTechLinkLarge>
                        </YoroiRoadBlockTitle>
                        <YoroiRoadBlockContainerNoLPad>
                          <YoroiTechBlockContainerTextL>{formatMessage({ id: 'support.visit-2-text' })}</YoroiTechBlockContainerTextL>
                        </YoroiRoadBlockContainerNoLPad>
                      </YoroiTechPad>
                    </YoroiRoadBlockContainerFlex>
                  </YoroiRoadBlockWhiteLargeFlex>
                  <YoroiTechBlueBackground />
                </YoroiRoadBlockWhiteLarge>
              </YoroiRoadMapBlockLarge>
            </YoroiRoadMapBlocks>
          </Container>
        </SectionC>

        <ContainerBlue style={{ paddingBottom: '40px' }}>
          <Container style={{ display: 'flex', flexDirection: 'row', paddingTop: '90px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <SupportTitle>{formatMessage({ id: 'support.contact-us' })}</SupportTitle>
              <SupportSubtitle>{formatMessage({ id: 'support.contact-us-text' })}</SupportSubtitle>
              <NeedSupport onClick={() => {
                if (typeof window.zE !== "undefined") {
                  window.zE.activate()
                }
              }}>{formatMessage({ id: "support.contact-us-btn" })}</NeedSupport>
            </div>
          </Container>
        </ContainerBlue>
      </span >
    );

    const Support = inject('locale')(injectIntl(_Support));

    return <Support />;
  }
}

export default App;
