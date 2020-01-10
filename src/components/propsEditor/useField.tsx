import React, { Dispatch, SetStateAction } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;
const useField: (label: string, field: string, setField: Dispatch<SetStateAction<string>>) => [React.ReactNode, string] = (label, field, setField) => {
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
