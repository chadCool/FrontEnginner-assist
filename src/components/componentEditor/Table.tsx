import React, { FC, useContext } from 'react';
import {
  SourceContext,
  ComponentProps,
  SourceUpdaterContext,
} from '@/components/componentEditor/index';
import useField from '@/components/propsEditor/useField';
import GroupField from '@/components/propsEditor/groupField';

export interface TableEditorProps extends ComponentProps {}
const TableView: FC<TableEditorProps> = ({}) => {
  const [baseDirEditor, baseDir] = useField('源码位置');
  const [nameEditor, name] = useField('业务前缀');
  // const { baseDir, name } = useContext(SourceContext);
  const { updateSource } = useContext(SourceUpdaterContext);
  return (
    <SourceContext.Provider value={{ baseDir, name }}>
      {baseDirEditor} {nameEditor}
      <div>
        <GroupField
          onChange={() => {}}
          label="列"
          field="columns"
          content={() => <>The Columns</>}
        />
        <GroupField
          onChange={data => {
            updateSource('table@chad', 'query', data, baseDir);
          }}
          label="查询"
          field="query"
          toggleable
          types={[
            { label: '单项查询', filed: 'single' },
            { label: '表单查询', filed: 'form' },
          ]}
          content={type => (
            <>
              {type!.filed} {type!.label}
            </>
          )}
        />
      </div>
    </SourceContext.Provider>
  );
};

export default TableView;
