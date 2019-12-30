import React, { FC, useState, useEffect } from 'react';
import { Collapse, Radio, Switch } from 'antd';
import styles from './groupField.less';

const { Panel } = Collapse;

interface GroupFieldProps {
  field: string;
  label: string;
  toggleable?: boolean;
  types?: { label: string; filed: string }[];
  content: (type?: { label: string; filed: string }) => React.ReactNode;
  onChange: (data: any) => void;
}

const GroupField: FC<GroupFieldProps> = ({
  field,
  label,
  toggleable = false,
  types,
  content,
  onChange,
}) => {
  const [enable, setEnable] = useState(true);
  const [activeKey, setActiveKey] = useState([field]);
  const [type, setType] = useState<{ label: string; filed: string } | undefined>(
    types ? types[0] : undefined,
  );
  const toggle = (check: boolean) => {
    setEnable(check);
    if (check) {
      setActiveKey(pre => [...pre, field]);
    } else {
      setActiveKey(pre => [...pre.filter(k => k !== field)]);
    }
  };
  const genExtra = () => (
    <span onClick={event => event.stopPropagation()}>
      {types && (
        <Radio.Group
          style={{ marginLeft: 16 }}
          value={type!.filed}
          onChange={e => setType(types.find(t => t.filed === e.target.value))}
        >
          {types.map(t => (
            <Radio.Button key={t.filed} value={t.filed}>
              {t.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      )}
      {toggleable && <Switch style={{ marginLeft: 16 }} checked={enable} onClick={toggle} />}
    </span>
  );
  useEffect(() => {
    if (enable) {
      onChange({ enable, type });
    } else {
      onChange({ enable });
    }
  }, [enable, type]);
  return (
    <div>
      <Collapse
        activeKey={activeKey}
        onChange={(keys: string[] | string) => setActiveKey(keys as string[])}
      >
        <Panel
          header={label}
          className={styles.wrapper}
          key={field}
          extra={genExtra()}
          disabled={!enable}
        >
          {content(type)}
        </Panel>
      </Collapse>
    </div>
  );
};

export default GroupField;
