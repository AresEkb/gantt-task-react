import {
  ChildMapByLevel,
  RootMapByLevel,
  TaskOrEmpty,
} from "../types/public-types";

/**
 * @param tasks List of tasks
 */
export const getChildsAndRoots = (
  tasks: readonly TaskOrEmpty[],
): [ChildMapByLevel, RootMapByLevel] => {
  const childRes = new Map<number, Map<string, TaskOrEmpty[]>>();
  const rootRes = new Map<number, TaskOrEmpty[]>();

  tasks.forEach((task) => {
    const {
      parent,
      comparisonLevel = 1,
    } = task;

    if (!parent) {
      const rootOnLevel = rootRes.get(comparisonLevel) || [];
      rootRes.set(comparisonLevel, [...rootOnLevel, task]);

      return;
    }

    const parentsByLevel = childRes.get(comparisonLevel) || new Map<string, TaskOrEmpty[]>();
    const prevValue = parentsByLevel.get(parent) || [];

    parentsByLevel.set(parent, [...prevValue, task]);
    childRes.set(comparisonLevel, parentsByLevel);
  });

  return [childRes, rootRes];
};