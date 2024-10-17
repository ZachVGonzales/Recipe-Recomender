import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TouchableOpacity, Keyboard } from 'react-native';

const LoginBox: React.VFC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleTextChange = (text: string) => {
    setInputValue(text);
  };

  const handleBlur = () => {
    if (inputValue) {
      setIsTyping(true); // Hide the box after user finishes typing
    }
  };

  const clearText = () => {
    setInputValue('');
    setIsTyping(false); // Show the input again if cleared
  };

  return (
    !isTyping ? (
      <Search>
        <StyledTextInput
          placeholder="Search"
          value={inputValue}
          onChangeText={handleTextChange}
          onBlur={handleBlur}  // Hides after user is done typing
          onFocus={() => setIsTyping(false)} // Ensures the box doesn't disappear on focus
        />
        <SearchSpacer />
        {inputValue ? (
          <TouchableOpacity onPress={clearText}>
          </TouchableOpacity>
        ) : null}
      </Search>
    ) : null
  );
};

const Search = styled.View`
  border-radius: 99px;
  top: 120px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #02542d;
  height: 50px;
`;

const SearchSpacer = styled.View`
  width: 8px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  max-width: 150px;
  height: 100%;
  font-family: Inter;
  font-weight: 600; /* Semi-bold */
  font-size: 14px;
  line-height: 20px;
  color: #1e1e1e;
`;

const XImage = styled.View`
  height: 16px;
  width: 16px;
  background-color: #ffffff;
  border-radius: 50px;
  border: 1px solid #000;
`;

export default LoginBox;
