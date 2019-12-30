import React, { useState, useEffect } from 'react';
import { Button, Divider, Drawer, Card, Alert } from 'antd';
import { Intent } from 'octopus-end-web';
import getWidgetsTypes, {
  ComponentProps,
  SourceUpdaterContext,
  WidgetType,
} from '@/components/componentEditor';
import styles from './index.less';
import PageEdit from '@/components/PageEdit';

const codeChanger = new Intent('codeChanger');
// codeChanger.next('data/xxx', JSON.stringify({ checkedValues }));
function genCode(
  template: string,
  dataKey: string,
  data: any,
  targetDir: string,
  options: { [propsName: string]: any } = {},
) {
  codeChanger.next('data/xxx', JSON.stringify({ template, dataKey, data, targetDir, options }));
}

export interface EditContext {
  add: (
    parent: ComponentProps,
    filter: (type: WidgetType) => boolean,
    onResult: (result?: WidgetType) => void,
  ) => void;
}
export const EditContext = React.createContext<EditContext>({
  add: (p, f, onResult) => {
    onResult();
  },
});
export default () => {
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    const subscription = codeChanger.getStatusSubject().subscribe(
      s => setStatus(s),
      () => setStatus(false),
      () => setStatus(false),
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filter, setFilter] = useState<(type: WidgetType) => boolean>(() => () => true);
  const [onResult, setOnResult] = useState<(result?: WidgetType) => void>(() => () => {});

  const add: EditContext['add'] = (p, f, onResult) => {
    setFilter(() => f);
    setDrawerVisible(true);
    setOnResult(() => onResult);
  };
  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };
  const handleAdd = (t: WidgetType) => () => {
    onResult(t);
    setDrawerVisible(false);
  };

  const [root, setRoot] = useState({
    id: 'root',
    props: {},
    ...getWidgetsTypes()[0],
  });

  function renderComponents(currentComp: ComponentProps) {
    if (!currentComp) {
      return null;
    }
    const { component, ...others } = currentComp;
    const Comp = component;
    return <Comp onUpdate={genCode} {...others} />;
  }

  return (
    <SourceUpdaterContext.Provider value={{ updateSource: genCode }}>
      <EditContext.Provider value={{ add }}>
        <div className={styles.root}>
          {!status && <Alert message="连接中断" banner />}
          <Drawer
            title="添加"
            placement="right"
            closable={false}
            onClose={onCloseDrawer}
            visible={drawerVisible}
          >
            {getWidgetsTypes()
              .filter(t => filter(t))
              .map(t => (
                <Button key={t.name} onClick={handleAdd(t)}>
                  {t.name}
                </Button>
              ))}
          </Drawer>

          <PageEdit>
            <a>预览</a>
            <Divider>编辑页面</Divider>
            <Card>{renderComponents({ ...root })}</Card>
          </PageEdit>
        </div>
      </EditContext.Provider>
    </SourceUpdaterContext.Provider>
  );
};
