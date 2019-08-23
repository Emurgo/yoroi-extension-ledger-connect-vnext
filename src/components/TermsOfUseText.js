import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
import Terms from './Terms';
import { Container } from '../css';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 40px;
  display: block;
`;

@observer
export default class TermsOfUseText extends Component {
  render() {
    return (
      <Wrapper>
        <ReactMarkdown source={this.props.localizedTermsOfUse} escapeHtml={false} />
      </Wrapper>
    );
  }
}
