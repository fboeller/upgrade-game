import { PropertyRowComponent } from './property-row.component';
import { plus } from '../../types/increase.type';
import { set } from 'lodash/fp';

export default { title: 'Property Row' }

const baseProps = {
  propertyName: 'myProperty',
  propertyType: {
    displayName: 'My Property',
    upgradeText: 'Upgrade',
  },
  propertyState: {
    value: 1,
    upgradeEffect: plus(1),
    upgradeCost: 1,
    upgradeCostIncrease: 1,
    upgradeConditions: {},
    becameAffordable: true,
  },
  upgradePossible: true,
  upgradeConditions: {},
};

export const withBaseProps = () => ({
  component: PropertyRowComponent,
  props: baseProps,
});

export const upgradeNotPossible = () => ({
  component: PropertyRowComponent,
  props: set('upgradePossible')(false)(baseProps)
});

export const withUpgradeCondition = () => ({
  component: PropertyRowComponent,
  props: set('upgradeConditions')({ 'salary': 3 })(baseProps)
});

export const withMultipleUpgradeConditions = () => ({
  component: PropertyRowComponent,
  props: set('upgradeConditions')({ 'salary': 3, 'businessIncome': 10, 'workEfficiency': 20 })(baseProps)
});
