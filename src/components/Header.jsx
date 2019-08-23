import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject } from 'mobx-react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Container } from './../css';

import Plx from "react-plx";

const data = [
  {
    start: 0,
    end: 400,
    properties: [
      {
        startValue: 0,
        endValue: 0,
        property: "opacity"
      }
    ]
  },
  {
    start: 400,
    duration: 100,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      }
    ]
  },

];

const navFixed = {
  width: '100%',
  height: 60,
  backgroundImage: "linear-gradient(82deg,#1a44b7,#4760ff 30%)",
  color: "#fff",
  left: 0,
  top: 0,
  position: "fixed",
  zIndex: 10,
};

const Content = styled.div`  
  display: flex;
  max-width: 1040px;
  margin: 10px auto;
  a{
    padding-top: 5px;
  }
`;

const NavFixed = styled.div`
  flex: 1;
  text-align: center;
  text-transform: uppercase;
  a{    
    display: inline-block;
    text-decoration: none;
    padding: 10px;  
    img{
      margin-top: -5px;
    }  
    &.active{
      border-bottom: 2px solid white;
      padding-bottom: 3px;      
    }
    &:link,
    &:visited{
      color: white;
    }
  }
`;




const Logo = styled.img`
  font-size: 1.5em;
  text-align: center;
  max-width: 128px;
`;

const VTitleList = styled.div`
  flex: 1;
  margin: 4px;
  text-align: center;
  text-transform: uppercase;

    height: 30px;
  a{
    text-decoration: none;
    display: inline-block;
    height: 30px;
    &.active{
      border-bottom: 2px solid white;
      padding-bottom: 3px;      
    }
    &:link,
    &:visited{
      color: white;
    }
  }
  
`;

/*
 * Background<A,B>
 *
 * @media rules
 * to move blue triangle header responsive
 * an correctly centered.
 *
 * .hasOffset is for different sections, that require
 * diffrent sizes.
 */
const Background = styled.div`
  position: relative; // absolute
  width: 2000px;
  height: ${p => (p.hasOffset ? '370px' : '620px')};

  @media (min-width: 700px) {
    height: ${p => (p.hasOffset ? '370px' : '620px')};
    top: -272px;
    right: 97px;
  }
  @media (max-width: 700px) {
    height: ${p => (p.hasOffset ? '470px' : '720px')};
    top: -372px;
    right: 23px;
  }

  transform: rotate(-10deg);
  border-radius: 30px;
  background-image: linear-gradient(82deg, #1a44b7, #4760ff 30%);
  box-shadow: 0 2px 45px 0 rgba(162, 162, 162, 0.5);
  z-index: -3;
`;

const BackgroundB = styled.div`
  position: relative;
  width: 1800px;
  height: ${p => (p.hasOffset ? '270px' : '520px')};
  border-radius: 30px;
  transform: rotate(-10deg);
  background-image: linear-gradient(82deg, #3256C8, #4760ff 30%);
  z-index: -2;
  
  
  @media (min-width: 700px) {
    height: ${p => (p.hasOffset ? '270px' : '520px')};
    top:  ${p => (p.hasOffset ? '-644px' : '-886px')}; ;
    right: 20px;
  }
  @media (max-width: 700px) {
    height: ${p => (p.hasOffset ? '270px' : '520px')};
    top:  ${p => (p.hasOffset ? '-696px' : '-933px')}; ;
    right: -31px;
  }
  
}
`;

const BackgroundC = styled.div`
  position: relative;
  width: 1600px;
  // transform-origin: -1000px -1800px;
  border-radius: 30px;
  transform: rotate(-2deg);
  background-image: linear-gradient(to right, #4968d5, #4760ff 40%);
  z-index: -1;

  @media (min-width: 700px) {
    top: ${p => (p.hasOffset ? '-789px' : '-1297px')};
    height: ${p => (p.hasOffset ? '120px' : '370px')};
    right: -63px;
  }

  @media (max-width: 700px) {
    top: ${p => (p.hasOffset ? '-820px' : '-1343px')};
    height: ${p => (p.hasOffset ? '120px' : '412')};
    right: -105px;
  }
`;

const HeaderText = styled.span`
  @media (max-width: 700px) {
    display: none;
  }
  position: relative;
  color: white;
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
`;

const HContainer = styled.div`
  margin: 0 auto;
  max-width: 1040px;
  height: 88px;
`;

const Download = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 4px;
  width: 140px;
  box-shadow: 0 2px 48px 0 #184dcf;
  cursor: pointer;
  background: #17d1aa;
  color: #ffffff;
  display: flow;
  flow-orientation: row;

  transition: all .2s;
  &:hover {
    background: rgba(23, 209, 170, .8);
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
  }
`;

const Selector = styled.select`
  background: transparent;
  border: solid 2px white;
  color: white;
  font-size: 15px;
  height: 40px;
  cursor: pointer;
  &:hover{    
    background: white;
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
    color: #405CE4;
  }
`;

const HeaderAlt = styled.div`
  @media (min-width: 700px) {
    display: none;
  }
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const HeaderAltSub = styled.div`
  @media (min-width: 700px) {
    display: none;
  }
  width: 100%;
  height: 200px;
  background-image: linear-gradient(82deg, #1a44b7, #4760ff 30%);
  position: absolute;
  padding-top: 40px;
  padding-bottom: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }

  render() {
    const offsetPaths = ['/about', '/faq', '/support', '/terms_and_conditions'];
    const hasOffset = offsetPaths.some(r => window.location.href.match(r));
    const _Header = ({ locale, intl: { formatMessage } }) => (
      <HContainer>
        <HeaderAltSub>
          <VTitleList>
            <Link onClick={this.toggleMenu} to="/">
              {formatMessage({ id: 'header.home' })}
            </Link>
          </VTitleList>
          <VTitleList>
            <Link onClick={this.toggleMenu} to="/about">
              {formatMessage({ id: 'header.about' })}
            </Link>
          </VTitleList>
          <VTitleList>
            <Link onClick={this.toggleMenu} to="/faq/1">
              {formatMessage({ id: 'header.faq' })}
            </Link>
          </VTitleList>
          <VTitleList>
            <Link onClick={this.toggleMenu} to="/support">
              {formatMessage({ id: 'header.support' })}
            </Link>
          </VTitleList>
          <VTitleList>
            <Selector
              style={{ width: '170px' }}
              value={locale.value}
              onChange={event => (locale.value = event.target.value)}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="zh-Hans">简体中文</option>
              <option value="zh-Hant">繁體中文</option>
              <option value="ru">Pусский</option>
            </Selector>
          </VTitleList>
        </HeaderAltSub>
        <Container>
          <HeaderAlt>
            <Logo src="/assets/logo.png" alt="Yoroi is a Web Light Wallet for Cardano Secure Fast Simple" />
            <div style={{ flex: 1 }} />
            <a style={{ color: 'white', fontSize: '30px' }} href="javascript:void(0);" className="icon" onClick={this.toggleMenu}>
              <i className="fa fa-bars" />
            </a>
          </HeaderAlt>
          <HeaderText>
            <VTitleList>
              <Link to="/">
                <Logo src="/assets/logo.png" alt="Yoroi is a Web Light Wallet for Cardano Secure Fast Simple" />
              </Link>
            </VTitleList>
            <div style={{ flex: 0.1 }} />
            <VTitleList style={{ flex: 0.6 }}>
              <Link to="/">{formatMessage({ id: 'header.home' })}</Link>
            </VTitleList>
            <VTitleList style={{ flex: 0.6 }}>
              <NavLink to="/about">{formatMessage({ id: 'header.about' })}</NavLink>
            </VTitleList>
            <VTitleList style={{ flex: 0.6 }}>
              <NavLink to="/faq/1">{formatMessage({ id: 'header.faq' })}</NavLink>
            </VTitleList>
            <VTitleList style={{ flex: 0.6 }}>
              <NavLink to="/support">{formatMessage({ id: 'header.support' })}</NavLink>
            </VTitleList>
            <div style={{ flex: 0.3 }} />
            <VTitleList>
              <Download onClick={() => this.setState({ show: true })}>
                <div>
                  <img style={{ marginRight: '12px', width: '19px', height: '19px' }} src="/assets/chrome.svg" />
                </div>
                <div style={{ fontSize: '15px' }}>{formatMessage({ id: 'header.download' })}</div>
              </Download>
            </VTitleList>
            <VTitleList>
              <Selector
                style={{ width: '170px' }}
                value={locale.value}
                onChange={event => (locale.value = event.target.value)}
              >
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="zh-Hans">简体中文</option>
                <option value="zh-Hant">繁體中文</option>
                <option value="ru">Pусский</option>
              </Selector>
            </VTitleList>


            <Plx parallaxData={data} style={navFixed}>
              <Content>
                <NavFixed>
                  <Link to="/">
                    <Logo src="/assets/logo.png" alt="Yoroi is a Web Light Wallet for Cardano Secure Fast Simple" />
                  </Link>
                </NavFixed>
                <div style={{ flex: 0.1 }} />
                <NavFixed style={{ flex: 0.6 }}>
                  <Link to="/">{formatMessage({ id: 'header.home' })}</Link>
                </NavFixed>
                <NavFixed style={{ flex: 0.6 }}>
                  <NavLink to="/about">{formatMessage({ id: 'header.about' })}</NavLink>
                </NavFixed>
                <NavFixed style={{ flex: 0.6 }}>
                  <NavLink to="/faq/1">{formatMessage({ id: 'header.faq' })}</NavLink>
                </NavFixed>
                <NavFixed style={{ flex: 0.6 }}>
                  <NavLink to="/support">{formatMessage({ id: 'header.support' })}</NavLink>
                </NavFixed>
                <div style={{ flex: 0.3 }} />
                <NavFixed>
                  <Download onClick={() => {
                    this.setState({ show: false });
                    const win = window.open('https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb', '_blank');
                    win.focus();
                  }}>
                    <div>
                      <img style={{ marginRight: '12px', width: '19px', height: '19px' }} src="/assets/chrome.svg" />
                    </div>
                    <div style={{ fontSize: '15px' }}>{formatMessage({ id: 'header.download' })}</div>
                  </Download>
                </NavFixed>
                <NavFixed>
                  <Selector
                    style={{ width: '170px' }}
                    value={locale.value}
                    onChange={event => (locale.value = event.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="zh-Hans">简体中文</option>
                    <option value="zh-Hant">繁體中文</option>
                    <option value="ru">Pусский</option>
                  </Selector>
                </NavFixed>
              </Content>
            </Plx>




          </HeaderText>
        </Container>
        <Background hasOffset={hasOffset} />
        <BackgroundB hasOffset={hasOffset} />
        <BackgroundC hasOffset={hasOffset} />
      </HContainer>
    );

    const Header = inject('locale')(injectIntl(_Header));

    return <Header />;
  }
}
export default App;
