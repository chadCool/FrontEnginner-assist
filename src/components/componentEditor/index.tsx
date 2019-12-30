import React, { FC } from 'react';
// import Div from './Div';
import TableEditor from './Table';

export interface WidgetType {
  name: string;
  tags: string[];
  component: FC<any>;
}

export interface ComponentProps extends WidgetType {
  id: string;
}

/**
 * 告知弹出层， 谁要添加， 可选的种类, 其他相关的参数, 获取待添加内容的回调
 */
export interface HandleAdd {
  (
    parent: ComponentProps,
    filter: () => boolean,
    onResult: (result?: ComponentProps) => void,
  ): void;
}
export interface ISourceContext {
  baseDir?: string;
  name?: string;
}

export interface ISourceUpdaterContext {
  updateSource: (
    template: string,
    dataKey: string,
    data: any,
    destDir: string,
    options?: { [propsName: string]: any },
  ) => void;
}

// source updater
export const SourceContext = React.createContext<ISourceContext>({});
function logEmpty(template: string, dataKey: string, data: any, destDir: string) {
  console.error('SourceContext.updateSource 尚未初始化', template, dataKey, data, destDir);
}
export const SourceUpdaterContext = React.createContext<ISourceUpdaterContext>({
  updateSource: logEmpty,
});
export default function getWidgetsTypes(): WidgetType[] {
  return [
    // {
    //   name: 'div',
    //   tags: ['container'],
    //   component: Div,
    // },
    {
      name: 'table',
      tags: ['table'],
      component: TableEditor,
    },
  ];
}
