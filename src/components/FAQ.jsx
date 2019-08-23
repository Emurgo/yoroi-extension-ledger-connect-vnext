import React from 'react';
import { injectIntl } from 'react-intl';
import { inject } from 'mobx-react';
import { Container, OverflowS } from './../css';
import styled from 'styled-components';
import { FormattedHTMLMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const Circle = styled.div`
  margin-right: 11px;
  margin-left: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  color: #1d46bc;
  text-align: center;
  font-size: 15px;
  border-radius: 17px;
  background-color: ${p => (p.xstate === p.xid ? 'white' : 'transparent')};
  border: ${p => (p.xstate === p.xid ? '' : 'solid 1.5px #1d46bc')}; 
`;

const StyledLink = styled(Link)`
  display: flex;
  max-height: ${p => ((p.children.props.xstate === p.children.props.xid) ? "100%" : "70px")};
  overflow: hidden;
  transition: all 0.3s;
`

const BoxDark = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  border-radius: 8px;
  background-color: ${p => (p.xstate === p.xid ? '#3253dd' : '#ffffff')};
  box-shadow: ${p => (p.xstate === p.xid ? '0 2px 50px 0 #d5d5d5' : '')};
  color: #ffffff;
  font-size: 15px;
  height: auto;
  overflow: hidden;
`;

const LargeNumber = styled.div`
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 56px;
  transform: rotate(-10deg);
  border-radius: 13.2px;
  background-image: linear-gradient(to right, #1850d7, #4763fb);
  color: #ffffff;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 27px;
`;

const FaqSummaryText = styled.div`
  margin-top: 17px;
  margin-left: 59px;
  color: ${p => (p.xstate === p.xid ? '#8498EB' : '#353535')};
`;

const FaqSummaryTitle = styled.div`
  color: ${p => (p.xstate === p.xid ? '#ffffff' : '#353535')};
`;

const LinkBar = styled.div`
  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }

  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 100px;
  }
  @media (min-width: 700px) {
    width: 300px;
  }
`;

const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
  }
  @media (min-width: 700px) {
    margin-left: 87px;
    flex: 1;
  }
`;

const FaqAndLinkBar = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 220px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const FaqText = styled.div`
  margin-top: 20px;
`;

const FaqAnswer = styled.div`
  margin-bottom: 60px;
`;

const _FAQ = ({ match, intl: { formatMessage } }) => (
  <Container>
    <OverflowS>
      <div style={{ fontSize: '40px', color: 'white', textTransform: 'uppercase', fontWeight: '300' }}>{formatMessage({ id: 'header.faq' })}</div>
    </OverflowS>

    <FaqAndLinkBar>
      <LinkBar>
        <StyledLink to="/faq/1">
          <BoxDark xid={'1'} xstate={match.params.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Circle xid={'1'} xstate={match.params.id}>
                1
              </Circle>
              <FaqSummaryTitle xid={'1'} xstate={match.params.id}>
                {formatMessage({ id: 'faq.faqQuestion-title1' })}
              </FaqSummaryTitle>
            </div>
            <FaqSummaryText xid={'1'} xstate={match.params.id}>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-1' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-2' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-3' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-4' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-5' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-6' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-7' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q1-8' })}</FaqText>
            </FaqSummaryText>
          </BoxDark>
        </StyledLink>

        <StyledLink to="/faq/2">
          <BoxDark xid={'2'} xstate={match.params.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Circle xid={'2'} xstate={match.params.id}>
                2
              </Circle>
              <FaqSummaryTitle xid={'2'} xstate={match.params.id}>
                {formatMessage({ id: 'faq.faqQuestion-title2' })}
              </FaqSummaryTitle>
            </div>
            <FaqSummaryText xid={'2'} xstate={match.params.id}>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-1' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-2' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-3' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-4' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-5' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-6' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-7' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q2-8' })}</FaqText>
            </FaqSummaryText>
          </BoxDark>
        </StyledLink>
        
        <StyledLink to="/faq/3">
          <BoxDark xid={'3'} xstate={match.params.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Circle xid={'3'} xstate={match.params.id}>
                3
              </Circle>
              <FaqSummaryTitle xid={'3'} xstate={match.params.id}>
                {formatMessage({ id: 'faq.faqQuestion-title3' })}
              </FaqSummaryTitle>
            </div>
            <FaqSummaryText xid={'3'} xstate={match.params.id}>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-1' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-2' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-3' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-4' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-5' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-6' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-7' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-8' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-9' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-10' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-11' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-12' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-13' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-14' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q3-15' })}</FaqText>
            </FaqSummaryText>
          </BoxDark>
        </StyledLink>

        <StyledLink to="/faq/4">
          <BoxDark xid={'4'} xstate={match.params.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Circle xid={'4'} xstate={match.params.id}>
                4
              </Circle>
              <FaqSummaryTitle xid={'4'} xstate={match.params.id}>
                {formatMessage({ id: 'faq.faqQuestion-title4' })}
              </FaqSummaryTitle>
            </div>
            <FaqSummaryText xid={'4'} xstate={match.params.id}>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-1' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-2' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-3' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-4' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-5' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-6' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-7' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-8' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q4-9' })}</FaqText>
            </FaqSummaryText>
          </BoxDark>
        </StyledLink>

        <StyledLink to="/faq/5">
          <BoxDark xid={'5'} xstate={match.params.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Circle xid={'5'} xstate={match.params.id}>
                5
              </Circle>
              <FaqSummaryTitle xid={'5'} xstate={match.params.id}>
                {formatMessage({ id: 'faq.faqQuestion-title5' })}
              </FaqSummaryTitle>
            </div>
            <FaqSummaryText xid={'5'} xstate={match.params.id}>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-1' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-2' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-3' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-4' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-5' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-6' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-7' })}</FaqText>
              <FaqText>{formatMessage({ id: 'faq.faqQuestion-Q5-8' })}</FaqText>
            </FaqSummaryText>
          </BoxDark>
        </StyledLink>
      </LinkBar>

      <FaqContainer>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '44px' }}>
          <LargeNumber>
            <div style={{ transform: 'rotate(10deg)' }}>{match.params.id}</div>
          </LargeNumber>
          <div style={{ display: 'inline-block', fontSize: '30px' }}>{formatMessage({ id: 'faq.faqQuestion-title' + match.params.id })}</div>
        </div>

        {makeAnswerItem(match.params.id, '1', formatMessage)}

        {makeAnswerItem(match.params.id, '2', formatMessage)}

        {makeAnswerItem(match.params.id, '3', formatMessage)}

        {makeAnswerItem(match.params.id, '4', formatMessage)}

        {makeAnswerItem(match.params.id, '5', formatMessage)}

        {makeAnswerItem(match.params.id, '6', formatMessage)}

        {makeAnswerItem(match.params.id, '7', formatMessage)}

        {makeAnswerItem(match.params.id, '8', formatMessage)}

        {['3', '4'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '9', formatMessage)}
        
        {['3'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '10', formatMessage)}
        {['3'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '11', formatMessage)}
        {['3'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '12', formatMessage)}
        {['3'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '13', formatMessage)}
        {['3'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '14', formatMessage)}
        {['3'].indexOf(match.params.id) >= 0 && makeAnswerItem(match.params.id, '15', formatMessage)}


      </FaqContainer>
    </FaqAndLinkBar>
  </Container>
);

const makeAnswerItem = (blockId, answerIdString, formatMessage) => {
  return (
    <FaqAnswer>
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '20px', color: '#353535' }}>{formatMessage({ id: `faq.faqQuestion-Q${blockId}-${answerIdString}` })}</div>
        <div style={{ fontSize: '14px', color: '#847e7e' }}>
          <FormattedHTMLMessage id={`faq.faqQuestion-A${blockId}-${answerIdString}`} />
        </div>
      </div>
    </FaqAnswer>    
  );
}

const FAQ = inject('locale')(injectIntl(_FAQ));

export default FAQ;
