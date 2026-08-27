import type { ComponentType } from 'react';
import { ContrastColorDemo } from './contrast-color-demo';
import { ContainerStyleQueriesDemo } from './container-style-queries-demo';
import { ColorMixDemo } from './color-mix-demo';
import { DataAttrContentDemo } from './data-attr-content-demo';
import { DataAttrStatusBoardDemo } from './data-attr-status-board-demo';
import { DataAttrTooltipDemo } from './data-attr-tooltip-demo';
import { FieldSizingDemo } from './field-sizing-demo';
import { ScrollMarginTopDemo } from './scroll-margin-top-demo';
import { SiblingIndexDemo } from './sibling-index-demo';
import { ScrollTargetGroupDemo } from './scroll-target-group-demo';
import { StartingStyleDemo } from './starting-style-demo';
import { TemporalStage4Demo } from './temporal-stage-4-demo';
import { TextBoxTrimDemo } from './text-box-trim-demo';
import { TextWrapBalanceDemo } from './text-wrap-balance-demo';
import { TextWrapBalanceBalanceDemo } from './text-wrap-balance-balance-demo';
import { TextWrapBalancePrettyDemo } from './text-wrap-balance-pretty-demo';

export const labDemos: Record<string, ComponentType> = {
	'contrast-color': ContrastColorDemo,
	'container-style-queries': ContainerStyleQueriesDemo,
	'color-mix': ColorMixDemo,
	'data-attr-content': DataAttrContentDemo,
	'data-attr-content-tooltip': DataAttrTooltipDemo,
	'data-attr-content-status-board': DataAttrStatusBoardDemo,
	'field-sizing': FieldSizingDemo,
	'scroll-margin-top': ScrollMarginTopDemo,
	'scroll-target-group': ScrollTargetGroupDemo,
	'sibling-index': SiblingIndexDemo,
	'starting-style': StartingStyleDemo,
	temporal: TemporalStage4Demo,
	'text-box-trim': TextBoxTrimDemo,
	'text-wrap-balance': TextWrapBalanceDemo,
	'text-wrap-balance-balance': TextWrapBalanceBalanceDemo,
	'text-wrap-balance-pretty': TextWrapBalancePrettyDemo,
};
