import React, { FC } from 'react';
import { SourceContext } from '../componentEditor';
import useField from '@/components/propsEditor/useField';

const PageEdit: FC<{}> = ({ children }) => {
  const [sourceEditor, value] = useField('源码位置');
  return (
    <div>
      {sourceEditor}
      <SourceContext.Provider value={{ sourceCode: value }}>
        {children}
      </SourceContext.Provider>
    </div>
  );
};

export default PageEdit;
