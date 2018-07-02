import React from 'react';
import styled from 'styled-components';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: gray;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 3em;
  background: #110000;
`;


export default () => (
  <Wrapper>
    <Title>
      Login and enjoy game
    </Title>
  </Wrapper>
);
