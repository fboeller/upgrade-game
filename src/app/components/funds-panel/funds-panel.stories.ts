import { FundsPanelComponent } from './funds-panel.component';

export default {
  title: 'Funds Panel',
};

export const noFunds = () => ({
  component: FundsPanelComponent,
  props: {
    funds: 0,
    fundsEffect: null
  }
});

export const positiveEffectVisible = () => ({
  component: FundsPanelComponent,
  props: {
    funds: 0,
    fundsEffect: 5
  }
});

export const negativeEffectVisible = () => ({
  component: FundsPanelComponent,
  props: {
    funds: 0,
    fundsEffect: 7
  }
});

export const HugeFunds = () => ({
  component: FundsPanelComponent,
  props: {
    funds: 1504367264,
    fundsEffect: null
  }
});

export const HugeEffect = () => ({
  component: FundsPanelComponent,
  props: {
    funds: 35,
    fundsEffect: 17843052
  }
});
