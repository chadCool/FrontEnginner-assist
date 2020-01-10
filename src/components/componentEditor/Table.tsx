import React, { FC, useEffect, useContext, useState, Dispatch, SetStateAction } from 'react';
import { Button, Checkbox, Tag, Divider } from 'antd';
import { useLocalStorage } from 'react-use';
import {
  SourceContext,
  ComponentProps,
  SourceUpdaterContext,
} from '@/components/componentEditor/index';
import useField from '@/components/propsEditor/useField';
import GroupField from '@/components/propsEditor/groupField';
import SmartListInput from '../propsEditor/smartListInput';

const QueryContent = ({
  setContentValue,
  type,
}: {
  setContentValue?: Dispatch<SetStateAction<{}>>;
  type?: { field: string };
}) => {
  useEffect(() => {
    setContentValue!({
      buttons: { reset: true },
    });
  }, []);
  function onChange(checkedValues: any[]) {
    setContentValue!({
      buttons: checkedValues.map(k => ({ [k]: true })).reduce((p, n) => ({ ...p, ...n }), {}),
    });
  }
  switch (type!.field) {
    case 'single':
      return <>Single</>;
    case 'form':
      return (
        <div>
          <Checkbox.Group
            options={[{ label: '重置', value: 'reset' }]}
            defaultValue={['reset']}
            onChange={onChange}
          />
        </div>
      );
    default:
      return <div>Type为空</div>;
  }
};

const ColumnsContent = ({
  setContentValue,
}: {
  setContentValue?: Dispatch<SetStateAction<{}>>;
  type?: { field: string };
}) => {
  const [columns, setColumns] = useState<{ title: string; key: string }[]>([]);

  useEffect(() => {
    setContentValue!({ value: [] });
  }, []);
  return (
    <div>
      <SmartListInput
        onChange={values => {
          setColumns(values.map((v, index) => ({ title: v, key: `data${index}` })));
          setContentValue!({
            value: values.map((v, index) => ({ title: v, key: `data${index}` })),
          });
        }}
      />
      {columns.map(c => (
        <Tag key={c.key}>
          {c.title} {c.key}
        </Tag>
      ))}
    </div>
  );
};

const RowOperationContent = ({
  setContentValue,
}: {
  setContentValue?: Dispatch<SetStateAction<{}>>;
  type?: { field: string };
}) => {
  const [operations, setOperations] = useState<
    { action: string; link: boolean; modal: boolean; form?: boolean; name?: string | null }[]
  >([]);

  useEffect(() => {
    setContentValue!({ value: operations });
  }, [operations]);
  return (
    <div>
      <SmartListInput
        splitter=";"
        placeholder="试试: detail link | edit form | actionKey 操作名称 modal | actionKey 操作名称X form | delete"
        onChange={values => {
          function getName(v: string) {
            const tags = v.split(' ').filter(tag => !['link', 'modal', 'form'].find(x => x === tag));
            if (tags.length >= 2) {
              return tags[1];
            }
            return undefined;
          }
          setOperations!([
            ...operations,
            ...values.map(v => ({
              action: v.substr(0, v.indexOf(' ') === -1 ? undefined : v.indexOf(' ')),
              link: v.indexOf(' link') !== -1,
              modal: v.indexOf(' form') !== -1 || v.indexOf(' modal') !== -1,
              form: v.indexOf(' form') !== -1,
              name: getName(v),
            })),
          ]);
        }}
      />
      {operations.map(c => (
        <div>
          <Tag
            key={`${c.action}:action${Math.random()}`}
            closable
            onClose={() => {
              setOperations(prev => prev.filter(o => o !== c));
            }}
          >
            {c.action}
          </Tag>
          {c.link && (
            <Tag
              key={`${c.action}:link`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, link: false };
                    }
                    return o;
                  }),
                );
              }}
            >
              link
            </Tag>
          )}
          {c.modal && (
            <Tag
              key={`${c.action}:modal`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, modal: false };
                    }
                    return o;
                  }),
                );
              }}
            >
              modal
            </Tag>
          )}
          {c.form && (
            <Tag
              key={`${c.action}:form`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, form: false };
                    }
                    return o;
                  }),
                );
              }}
            >
              form
            </Tag>
          )}
          {c.name && (
            <Tag
              key={`${c.action}:name`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, name: null };
                    }
                    return o;
                  }),
                );
              }}
            >
              {c.name}
            </Tag>
          )}
          <Divider />
        </div>
      ))}
    </div>
  );
};


const BatchOperationContent = ({
  setContentValue,
}: {
  setContentValue?: Dispatch<SetStateAction<{}>>;
  type?: { field: string };
}) => {
  const [operations, setOperations] = useState<
    { action: string; link: boolean; modal: boolean; form?: boolean; name?: string | null }[]
  >([]);

  useEffect(() => {
    setContentValue!({ value: operations });
  }, [operations]);
  return (
    <div>
      <SmartListInput
        splitter=";"
        placeholder="试试: edit form(添加) | edit link | actionKey 操作名称X modal | actionKey 操作名称X form | delete"
        onChange={values => {
          function getName(v: string) {
            const tags = v.split(' ').filter(tag => !['link', 'modal', 'form'].find(x => x === tag));
            if (tags.length >= 2) {
              return tags[1];
            }
            return undefined;
          }
          setOperations!([
            ...operations,
            ...values.map(v => ({
              action: v.substr(0, v.indexOf(' ') === -1 ? undefined : v.indexOf(' ')),
              link: v.indexOf(' link') !== -1,
              modal: v.indexOf(' modal') !== -1,
              form: v.indexOf(' form') !== -1,
              name: getName(v),
            })),
          ]);
        }}
      />
      {operations.map(c => (
        <div>
          <Tag
            key={`${c.action}:action${Math.random()}`}
            closable
            onClose={() => {
              setOperations(prev => prev.filter(o => o !== c));
            }}
          >
            {c.action}
          </Tag>
          {c.link && (
            <Tag
              key={`${c.action}:link`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, link: false };
                    }
                    return o;
                  }),
                );
              }}
            >
              link
            </Tag>
          )}
          {c.modal && (
            <Tag
              key={`${c.action}:modal`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, modal: false };
                    }
                    return o;
                  }),
                );
              }}
            >
              modal
            </Tag>
          )}
          {c.form && (
            <Tag
              key={`${c.action}:form`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, form: false };
                    }
                    return o;
                  }),
                );
              }}
            >
              form
            </Tag>
          )}
          {c.name && (
            <Tag
              key={`${c.action}:name`}
              closable
              onClose={() => {
                setOperations(prev =>
                  prev.map(o => {
                    if (o === c) {
                      return { ...c, name: null };
                    }
                    return o;
                  }),
                );
              }}
            >
              {c.name}
            </Tag>
          )}
          <Divider />
        </div>
      ))}
    </div>
  );
};

export interface TableEditorProps extends ComponentProps {}
const TableEditor: FC<TableEditorProps> = ({ id }) => {
  const [baseDirValue, setBaseDirValue] = useLocalStorage(`${id}-baseDir`);
  const [baseDirEditor, baseDir] = useField('源码位置', baseDirValue, setBaseDirValue);

  const [nameValue, setNameValue] = useLocalStorage(`${id}-name`);
  const [nameEditor, name] = useField('业务前缀', nameValue, setNameValue);

  // const { baseDir, name } = useContext(SourceContext);
  const [updateToken, setUpdateAll] = useState({ buttons: { reset: true } });
  const { updateSource } = useContext(SourceUpdaterContext);

  return (
    <SourceContext.Provider value={{ baseDir, name }}>
      <div>
        <Button onClick={() => setUpdateAll({})}>刷新全部</Button>
      </div>
      {baseDirEditor} {nameEditor}
      <div>
        <GroupField
          updateToken={updateToken}
          onChange={data => {
            updateSource(id, 'table@chad', 'query', data, baseDir);
          }}
          label="查询"
          field="query"
          toggleable
          types={[
            { label: '单项查询', field: 'single' },
            { label: '表单查询', field: 'form' },
          ]}
        >
          <QueryContent />
        </GroupField>
        <GroupField
          updateToken={updateToken}
          onChange={data => {
            updateSource(id, 'table@chad', 'columns', data, baseDir);
          }}
          label="列"
          field="columns"
        >
          <ColumnsContent />
        </GroupField>
        <GroupField
          updateToken={updateToken}
          onChange={data => {
            updateSource(id, 'table@chad', 'operations', data, baseDir);
          }}
          label="行操作"
          field="operations"
          toggleable
        >
          <RowOperationContent />
        </GroupField>
        <GroupField
          updateToken={updateToken}
          onChange={data => {
            updateSource(id, 'table@chad', 'batchOperations', data, baseDir);
          }}
          label="批量操作"
          field="batchOperations"
          toggleable
        >
          <BatchOperationContent />
        </GroupField>
      </div>
    </SourceContext.Provider>
  );
};

export default TableEditor;
