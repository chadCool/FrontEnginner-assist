import React, { useState, useEffect, useCallback } from 'react';
import { Button, Divider, Drawer, Card, Alert } from 'antd';
import { Intent } from 'octopus-end-web';
import getWidgetsTypes, {
  ComponentProps,
  SourceUpdaterContext,
  WidgetType,
} from './node_modules/@/components/componentEditor';
import styles from './index.less';
import PageEdit from './node_modules/@/components/PageEdit';
import CodeLinkWrapper from './node_modules/@/components/propsEditor/CodeLinkWrapper';

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
  const [codeChanger, setCodeChanger] = useState();

  function reconnect() {
    setCodeChanger(new Intent('codeChanger'));
  }
  // codeChanger.next('data/xxx', JSON.stringify({ checkedValues }));
  useEffect(() => {
    reconnect();
  }, []);
  const genCode = useCallback(
    (
      session: string,
      template: string,
      dataKey: string,
      data: any,
      targetDir: string,
      options: { [propsName: string]: any } = {},
    ) => {
      if (codeChanger) {
        codeChanger.next(
          'data/xxx',
          JSON.stringify({ session, template, dataKey, data, targetDir, options }),
        );
      }
    },
    [codeChanger],
  );
  useEffect(() => {
    let subscription: any;
    if (codeChanger) {
      subscription = codeChanger.getStatusSubject().subscribe(
        s => {
          setStatus(s);
        },
        () => setStatus(false),
        () => setStatus(false),
      );
    }
    return () => {
      setStatus(true);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [codeChanger]);

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
    <CodeLinkWrapper>
      <SourceUpdaterContext.Provider value={{ updateSource: genCode }}>
        <EditContext.Provider value={{ add }}>
          <div className={styles.root}>
            {!status && (
              <>
                <Alert message="连接中断" banner />
                <Button type="primary" onClick={reconnect}>
                  重新连接
                </Button>
              </>
            )}
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
    </CodeLinkWrapper>
  );
};
