import React, { useState } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;
const useField: (label: string) => [React.ReactNode, string] = label => {
  const [field, setField] = useState<string>('');
  const SourceCodeEditor = (
    <span>
      {label}:
      <Text
        style={{ display: 'inline-block', margin: '0 16px 0 0', minWidth: 200 }}
        editable={{ onChange: setField }}
      >
        {field}
      </Text>
    </span>
  );
  return [SourceCodeEditor, field];
};
export default useField;
