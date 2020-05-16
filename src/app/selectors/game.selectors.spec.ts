import { upgradesPossible } from './game.selectors';

describe('Selector upgradesPossible', () => {
  it('should return false for non-affordable properties', () => {
    expect(
      upgradesPossible.projector({
        funds: 0,
        properties: {
          salary: { level: 3 },
          education: { level: 2 },
        },
      })
    ).toEqual({ salary: false, education: false });
  });

  it('should return a single possible upgrade', () => {
    expect(
      upgradesPossible.projector({
        funds: 5,
        properties: { salary: { level: 3 } },
      })
    ).toEqual({ salary: true });
  });

  it('should return multiple possible upgrades', () => {
    expect(
      upgradesPossible.projector({
        funds: 30,
        properties: {
          salary: { level: 3 },
          education: { level: 2 },
        },
      })
    ).toEqual({ salary: true, education: true });
  });

  it('should return false for properties where an upgrade condition is not met', () => {
    expect(
      upgradesPossible.projector({
        funds: 100,
        properties: {
          salary: { level: 5 },
          education: { level: 0 },
        },
      })
    ).toEqual({ salary: false, education: true });
  });
});
