import React, { FC, useContext } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { SourceContext, ComponentProps } from '@/components/componentEditor/index';
import { EditContext } from '@/pages/pageEditor';

export interface DivEditorProps extends ComponentProps {
  props: {
    children?: ComponentProps[];
  };
}

// 随机生成一个颜色
const Div: FC<DivEditorProps> = ({ id, props, editComponent, component, typeId, tags }) => {
  const { add } = useContext(EditContext);
  const { sourceCode } = useContext(SourceContext);

  const handleAdd = () => {
    add(
      { id, props, editComponent, component, typeId, tags },
      () => true,
      result => {
        if (result) {
          console.log(props);
          if (!props.children) {
            props.children = [] as ComponentProps[];
          }
          props.children = [...props.children, { id: `${Math.random()}`, props: {}, ...result }];
        }
      },
    );
  };
  return (
    <div>
      {sourceCode}
      <Button type="dashed" onClick={handleAdd} className={styles.add}>
        +
      </Button>
      {((props.children || []) as ComponentProps[]).map(c => {
        const CCom = c.editComponent;
        return <CCom key={c.id} {...c} />;
      })}
      <Button type="dashed" onClick={handleAdd} className={styles.add}>
        +
      </Button>
    </div>
  );
};
export default Div;
