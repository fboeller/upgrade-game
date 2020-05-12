import { createAction, createReducer, on, props } from '@ngrx/store';
import { PropertyState, Property } from '../property.type';
import { mapValues } from 'lodash/fp';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  timeActive: boolean;
  funds: number;
  workActive: boolean;
  properties: {
    education: PropertyState;
    salary: PropertyState;
    workEfficiency: PropertyState;
    businessIncome: PropertyState;
  };
}

export const resume = createAction('[Time] Resume');
export const pause = createAction('[Time] Pause');
export const work = createAction('[Button] Work');
export const income = createAction(
  '[Funds] Income',
  props<{ property: 'salary' | 'businessIncome' }>()
);
export const upgrade = createAction(
  '[Upgrade] Property',
  props<{ property: Property }>()
);

const initialState: GameState = {
  timeActive: false,
  funds: 0,
  workActive: false,
  properties: {
    education: {
      value: 0,
      upgradeEffect: 1,
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {},
      becameAffordable: false,
    },
    salary: {
      value: 1,
      upgradeEffect: 1,
      upgradeCost: 1,
      upgradeCostIncrease: 1,
      upgradeConditions: {
        education: 1,
      },
      becameAffordable: false,
    },
    workEfficiency: {
      value: 1000,
      upgradeEffect: -50,
      upgradeCost: 2,
      upgradeCostIncrease: 2,
      upgradeConditions: {},
      becameAffordable: false,
    },
    businessIncome: {
      value: 0,
      upgradeEffect: 1,
      upgradeCost: 10,
      upgradeCostIncrease: 10,
      upgradeConditions: {},
      becameAffordable: false,
    },
  },
};

const _stateReducer = createReducer(
  initialState,
  on(resume, (state) => ({ ...state, timeActive: true })),
  on(pause, (state) => ({ ...state, timeActive: false })),
  on(income, (state, { property }) => ({
    ...state,
    funds: state.funds + state.properties[property].value,
    workActive: property == 'salary' ? false : state.workActive,
    properties: mapValues((propertyState: PropertyState) => ({
      ...propertyState,
      becameAffordable:
        propertyState.becameAffordable ||
        state.funds + state.properties[property].value >=
          propertyState.upgradeCost,
    }))(state.properties),
  })),
  on(work, (state) => ({ ...state, workActive: true })),
  on(upgrade, (state, { property }) => ({
    ...state,
    funds: state.funds - state.properties[property].upgradeCost,
    properties: {
      ...state.properties,
      [property]: {
        ...state.properties[property],
        value:
          state.properties[property].value +
          state.properties[property].upgradeEffect,
        upgradeCost:
          state.properties[property].upgradeCost +
          state.properties[property].upgradeCostIncrease,
        upgradeConditions: mapValues((threshold: number) => threshold + 1)(
          state.properties[property].upgradeConditions
        ),
      },
    },
  }))
);

export function stateReducer(state, action) {
  return _stateReducer(state, action);
}
