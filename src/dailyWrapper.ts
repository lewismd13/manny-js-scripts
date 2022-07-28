import {
  adv1,
  availableAmount,
  cliExecute,
  closetAmount,
  containsText,
  equip,
  getWorkshed,
  isHeadless,
  itemAmount,
  print,
  putCloset,
  putShop,
  pvpAttacksLeft,
  random,
  retrieveItem,
  setAutoAttack,
  setProperty,
  takeCloset,
  toInt,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
} from "kolmafia";

import { Quest, Task } from "grimoire-kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $skill,
  AsdonMartin,
  Clan,
  get,
  have,
  Macro,
} from "libram";
import { bafhWls } from "./bafh";
import { breakfastCounter, mannyQuestVolcoino, setChoice } from "./lib";

/*
Remaining breakfast tasks:
check NEP quest
bafh wls*
*/

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

const joinAFH: Task = {
  name: "Join AFH",
  completed: () => Clan.get().id === 40382,
  do: () => Clan.join(40382),
};

const aprilShower: Task = {
  name: "April Shower",
  completed: () => get("_aprilShower"),
  do: () => cliExecute("shower cold"),
};

const detectiveSolver: Task = {
  name: "Detective Solver",
  completed: () => get("_detectiveCasesCompleted") === 3,
  do: () => cliExecute("detective solver"),
};

const questCoino: Task = {
  name: "Quest Volcoino",
  completed: () => get("_volcanoItemRedeemed"),
  do: mannyQuestVolcoino,
  limit: { tries: 1 },
};

const bafh: Task = {
  name: "BAFH WLs",
  completed: () => get("_bafhWlsDone", false),
  do: bafhWls,
};

const muffinHandler: Task = {
  name: "Muffin Handler",
  completed: () => get("muffinOnOrder") === "none",
  ready: () => get("muffinOnOrder") === "blueberry",
  do: breakfastCounter,
};

const checkNEP: Task = {
  name: "Check NEP Quest",
  completed: () => get("_questPartyFairQuest") !== "",
  ready: () => !get("_questPartyFairQuest"),
  do: () => {
    setChoice(1322, 6); // Leave
    adv1($location`The Neverending Party`, -1, "");
  },
};

const stockables = $items`11-leaf clover, battery (AAA), cornucopia, pocket wish, cute mushroom, gift card`;

const stockShop: Task = {
  name: "Stock Mallstore",
  completed: () => {
    for (const item of stockables) {
      if (itemAmount(item)) {
        return false;
      } else continue;
    }
    return true;
  },
  do: () => {
    for (const item of stockables) {
      putShop(0, 0, itemAmount(item), item);
    }
  },
};

// TODO: Make full vs half loop an argument that sets a global option
const workshedSwap: Task = {
  name: "Workshed Swap",
  completed: () => {
    if (get("_workshedItemUsed") || get("csServicesPerformed")) return true;
    else return false;
  },
  ready: () => !get("_workshedItemUsed"),
  do: () => {
    if (!get("csServicesPerformed") || isHeadless()) {
      // headless or in casual aftercore, drive observantly and swap to cmc
      if (getWorkshed() === $item`Asdon Martin keyfob`) {
        AsdonMartin.drive($effect`Driving Observantly`, 1100);
        use($item`cold medicine cabinet`);
        // use($item`snow machine`);
      }
    } else if (!userConfirm("will you be doing a casual today?")) {
      // in CS aftercore, half-looping, still swap
      if (getWorkshed() === $item`Asdon Martin keyfob`) {
        AsdonMartin.drive($effect`Driving Observantly`, 1100);
        use($item`cold medicine cabinet`);
      }
    }
  },
};

const makeKeyPie: Task = {
  name: "Make a key pie",
  ready: () => !get("lockPicked"),
  completed: () => get("lockPicked"),
  do: () => {
    setChoice(1414, 1);
    useSkill(1, $skill`Lock Picking`);
    cliExecute("create 1 boris's key lime pie");
  },
};

const melfDupe: Task = {
  name: "Machine Elf Dupe",
  ready: () => get("encountersUntilDMTChoice") === 0,
  completed: () => get("encountersUntilDMTChoice") > 0,
  do: () => {
    const dupeTarget = $item`bottle of Greedy Dog`;
    if (itemAmount(dupeTarget) === 0 && closetAmount(dupeTarget) > 0) takeCloset(1, dupeTarget);
    if (availableAmount(dupeTarget) > 0) {
      useFamiliar($familiar`Machine Elf`);
      setChoice(1119, 4);
      setProperty("choiceAdventure1125", `1&iid=${toInt(dupeTarget)}`);
      adv1($location`The Deep Machine Tunnels`, -1, "");
      // putShop(0, 0, 1, dupeTarget);
      putCloset(1, dupeTarget);
    } else {
      print(`Something went wrong duping a ${dupeTarget.name}`, "red");
    }
  },
};

const doggieCoin: Task = {
  name: "Caldera Volcoino",
  ready: () => !containsText($location`The Bubblin' Caldera`.noncombatQueue, "Lava Dogs"),
  completed: () => containsText($location`The Bubblin' Caldera`.noncombatQueue, "Lava Dogs"),
  prepare: () => {
    if (have($effect`Spirit of Cayenne`)) useSkill($skill`Spirit of Nothing`);

    retrieveItem(20, $item`heat-resistant sheet metal`);
    Macro.trySkill($skill`Curse of Weaksauce`)
      .trySkill($skill`Stuffed Mortar Shell`)
      .trySkill($skill`Extract`)
      .skill($skill`Saucestorm`)
      .repeat()
      .setAutoAttack();
  },
  do: () => {
    while (!containsText($location`The Bubblin' Caldera`.noncombatQueue, "Lava Dogs")) {
      useFamiliar($familiar`Mini-Hipster`);
      equip($item`Kramco Sausage-o-Matic™`);
      adv1($location`The Bubblin' Caldera`);
    }
  },
  post: () => {
    setAutoAttack(0);
    if (have($effect`Drenched in Lava`)) cliExecute("soak");
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

const mannyBreakfast: Quest<Task> = {
  name: "Full Breakfast",
  completed: () => get("_aprilShower"), // not sure about this
  tasks: [
    joinAFH,
    mafiaBreakfast,
    buyRaffleTix,
    detectiveSolver,
    questCoino,
    bafh,
    muffinHandler,
    checkNEP,
    stockShop,
    aprilShower,
  ],
};

const postloop: Quest<Task> = {
  name: "Postloop",
  completed: () => get("breakfastCompleted"),
  tasks: [joinAFH, detectiveSolver, questCoino, checkNEP, mafiaBreakfast, stockShop, checkNEP],
};
