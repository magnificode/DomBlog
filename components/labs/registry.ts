import type { ComponentType } from 'react';
import { ColorMixDemo } from './color-mix-demo';
import { DataAttrContentDemo } from './data-attr-content-demo';
import { DataAttrStatusBoardDemo } from './data-attr-status-board-demo';
import { DataAttrTooltipDemo } from './data-attr-tooltip-demo';
import { ScrollMarginTopDemo } from './scroll-margin-top-demo';
import { TemporalStage4Demo } from './temporal-stage-4-demo';
import { TextWrapBalanceDemo } from './text-wrap-balance-demo';
import { TextWrapBalanceBalanceDemo } from './text-wrap-balance-balance-demo';
import { TextWrapBalancePrettyDemo } from './text-wrap-balance-pretty-demo';

export const labDemos: Record<string, ComponentType> = {
	'color-mix': ColorMixDemo,
	'data-attr-content': DataAttrContentDemo,
	'data-attr-content-tooltip': DataAttrTooltipDemo,
	'data-attr-content-status-board': DataAttrStatusBoardDemo,
	'scroll-margin-top': ScrollMarginTopDemo,
	'temporal-stage-4': TemporalStage4Demo,
	'text-wrap-balance': TextWrapBalanceDemo,
	'text-wrap-balance-balance': TextWrapBalanceBalanceDemo,
	'text-wrap-balance-pretty': TextWrapBalancePrettyDemo,
};
