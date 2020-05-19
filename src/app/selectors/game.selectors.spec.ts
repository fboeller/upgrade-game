import { Selectors } from './game.selectors';

describe('Selector upgradesPossible', () => {
  it('should return false for non-affordable properties', () => {
    expect(
      Selectors.upgradesPossible.projector({
        funds: 0,
        properties: {
          salary: 3,
          education: 2,
        },
      })
    ).toEqual({ salary: false, education: false });
  });

  it('should return a single possible upgrade', () => {
    expect(
      Selectors.upgradesPossible.projector({
        funds: 5,
        properties: { salary: 3 },
      })
    ).toEqual({ salary: true });
  });

  it('should return multiple possible upgrades', () => {
    expect(
      Selectors.upgradesPossible.projector({
        funds: 30,
        properties: {
          salary: 3,
          education: 2,
        },
      })
    ).toEqual({ salary: true, education: true });
  });

  it('should return false for properties where an upgrade condition is not met', () => {
    expect(
      Selectors.upgradesPossible.projector({
        funds: 100,
        properties: {
          salary: 5,
          education: 0,
        },
      })
    ).toEqual({ salary: false, education: true });
  });
});
