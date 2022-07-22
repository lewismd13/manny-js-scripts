import { cliExecute, itemAmount, pvpAttacksLeft, random } from "kolmafia";

import { Quest, Task } from "grimoire-kolmafia";
import { $item, get } from "libram";

const mafiaBreakfast: Task = {
  name: "Mafia Breakfast",
  completed: () => get("breakfastCompleted"),
  do: () => cliExecute("breakfast"),
};

const buyRaffleTix: Task = {
  name: "Raffle tix",
  completed: () => itemAmount($item`raffle ticket`) > 0,
  do: (): void => {
    cliExecute(`raffle ${5 + random(5)}`);
  },
};

const genericPvp: Task = {
  name: "pvp",
  completed: () => pvpAttacksLeft() === 0,
  do: () => cliExecute("UberPVPOptimizer; swagger"),
};

const seasonalPvp: Task = {
  name: "pvp",
  completed: () => pvpAttacksLeft() === 0,
  do: () => cliExecute("UberPVPOptimizer; pvp loot ASCII"),
};

const mannyBreakfast: Quest = {
  name: "Full Breakfast",
  completed: () => get("_dinseyGarbageDisposed"),
  tasks: [mafiaBreakfast, buyRaffleTix],
};
