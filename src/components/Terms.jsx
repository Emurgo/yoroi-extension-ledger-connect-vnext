import React from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react/index';
import { FormattedHTMLMessage } from 'react-intl';
import { Container, OverflowS } from './../css';
import styled from 'styled-components';
import TermsOfUseText from './TermsOfUseText';

const SectionA = styled.div`
  margin-bottom: 40px;
`;

const Oval = styled.div`
  height: 99px;
  width: 99px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 40px 0 rgba(0,0,0,0.1);
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 505px;
  margin-top: 78px;
`;
const TextFormat = styled.div`
  margin-left: 43.6%;  
  font-size: 30px;
  color: #244BC0;
  font-weight: bold; 
  width: 227px; 
  height: 72px; 
  text-align: left; 
  padding-bottom: 73px;
`;

const getTerms = locale => {
  switch (locale.value) {
    case 'ja':
      return require(`./../terms/ja-JP.md`);
    case 'ko':
      return require(`./../terms/ko-KR.md`);
    case 'zh-Hans':
      return require(`./../terms/zh-Hans.md`);
    case 'zh-Hant':
      return require(`./../terms/zh-Hant.md`);
    case 'en':
    default:
      return require(`./../terms/en-US.md`);
  }
};

const _Terms = ({ locale, intl: { formatMessage } }) => (
  <Container>
    <Oval>
    <img src="/assets/terms-and-conditions.svg" />
    </Oval>
      <TextFormat>
      <span style={{marginLeft:'59px'}} ></span>
        <FormattedHTMLMessage id={'header.terms-and-condtions-part1'}/>
        <br></br>
        <FormattedHTMLMessage id={'header.terms-and-condtions-part2'}/>
      </TextFormat>
    <SectionA>
      <TermsOfUseText localizedTermsOfUse={getTerms(locale)} />
    </SectionA>
  </Container>
);

const Terms = inject('locale')(injectIntl(observer(_Terms)));

export default Terms;
