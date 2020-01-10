import React, { FC } from 'react';

import { Input } from 'antd';

const { Search } = Input;
const SmartListInput: FC<{
  splitter?: string;
  onChange: (values: string[]) => void;
  placeholder?: string;
}> = ({ onChange, splitter = ' \n', placeholder = '' }) => (
  <Search
    enterButton="Enter"
    allowClear
    placeholder={placeholder}
    onSearch={(rawValue: string) => {
      onChange(rawValue.split(new RegExp(`[${splitter}]`, 'g')).filter(v => v !== ''));
    }}
  />
);
export default SmartListInput;
