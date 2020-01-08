<<<<<<< HEAD
import React from 'react';
// import Div from './Div';

export interface ComponentProps {
=======
import React, { FC } from 'react';
// import Div from './Div';
import TableEditor from './Table';

export interface WidgetType {
  name: string;
  tags: string[];
  component: FC<any>;
}

export interface ComponentProps extends WidgetType {
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
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
<<<<<<< HEAD
    session: string,
=======
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
    template: string,
    dataKey: string,
    data: any,
    destDir: string,
    options?: { [propsName: string]: any },
  ) => void;
}

// source updater
export const SourceContext = React.createContext<ISourceContext>({});
<<<<<<< HEAD
function logEmpty(session: string, template: string, dataKey: string, data: any, destDir: string) {
  console.error('SourceContext.updateSource 尚未初始化', session, template, dataKey, data, destDir);
=======
function logEmpty(template: string, dataKey: string, data: any, destDir: string) {
  console.error('SourceContext.updateSource 尚未初始化', template, dataKey, data, destDir);
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
}
export const SourceUpdaterContext = React.createContext<ISourceUpdaterContext>({
  updateSource: logEmpty,
});
<<<<<<< HEAD
=======
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
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
