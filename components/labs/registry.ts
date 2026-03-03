import type { ComponentType } from 'react';
import { DataAttrContentDemo } from './data-attr-content-demo';
import { DataAttrStatusBoardDemo } from './data-attr-status-board-demo';
import { DataAttrTooltipDemo } from './data-attr-tooltip-demo';
import { ScrollMarginTopDemo } from './scroll-margin-top-demo';

export const labDemos: Record<string, ComponentType> = {
	'data-attr-content': DataAttrContentDemo,
	'data-attr-content-tooltip': DataAttrTooltipDemo,
	'data-attr-content-status-board': DataAttrStatusBoardDemo,
	'scroll-margin-top': ScrollMarginTopDemo,
};
