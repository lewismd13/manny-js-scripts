import {
  adv1,
  availableAmount,
  buy,
  cliExecute,
  equip,
  handlingChoice,
  inebrietyLimit,
  mallPrice,
  myInebriety,
  print,
  putShop,
  repriceShop,
  retrieveItem,
  runChoice,
  setAutoAttack,
  shopAmount,
  use,
  userConfirm,
} from "kolmafia";
import { $item, $location, get, Macro } from "libram";
import { setChoice } from "./lib";

// TODO: handle the initial choice if needed, instead of throwing

if (get("_questPartyFair") === "unstarted") throw "you actually need to accept the quest first";

// ideas: jars (duh), thermoses, kardashian gin, CS drinks, robort drinks, longterm greedy dogs or very fancy whiskey
export const duffoBooze = [
  $item`jar of fermented pickle juice`,
  $item`Dreadsylvanian grimlet`,
  $item`Shot of Kardashian Gin`,
];

for (const booze of duffoBooze) {
  if (availableAmount(booze) < 550) throw `You don't have 550 ${booze}`;
}

if (
  get("_questPartyFairQuest") === "booze" &&
  (!get("_claraBellUsed") || !get("_freePillKeeperUsed")) &&
  !get("_questPartyFairProgress")
) {
  for (const booze of duffoBooze) {
    if (shopAmount(booze) > 0) throw `You already have ${booze} in your shop. take it out first.`;
  }
  try {
    if (!get("_claraBellUsed")) use($item`Clara's bell`);
    else cliExecute("pillkeeper free noncombat");
    if (myInebriety() > inebrietyLimit()) {
      equip($item`Drunkula's wineglass`);
      Macro.runaway().setAutoAttack();
    } else {
      retrieveItem($item`Louder Than Bomb`);
      Macro.tryItem($item`Louder Than Bomb`).setAutoAttack();
    }
    for (const booze of duffoBooze) {
      retrieveItem(booze, 550);
      putShop(0, 0, 550, booze);
      repriceShop(402, booze);
      buy(booze, 1, 100);
      mallPrice(booze);
    }
    setChoice(1322, 1);
    setChoice(1327, 3);
    setChoice(1324, 3);
    adv1($location`The Neverending Party`);
    if (handlingChoice()) runChoice(0);
  } finally {
    for (const booze of duffoBooze) {
      cliExecute(`shop take all ${booze.name}`);
    }
    setAutoAttack(0);
    if (get("_questPartyFairProgress")) {
      const questBooze = get("_questPartyFairProgress").split(" ");
      print(`your booze quest is ${Item.get(questBooze[1])}`, `yellow`);
    } else {
      print("something went wrong accepting booze quest");
    }

    for (const booze of duffoBooze) {
      if (shopAmount(booze)) userConfirm(`You still have ${booze} in your shop!`);
    }
  }
}

// ideas: horseradishes, spectral pickles, spooky pockets, shawarma
const duffoFood = [
  $item`extra-greasy slider`,
  $item`Dreadsylvanian spooky pocket`,
  $item`jumping horseradish`,
];

for (const food of duffoFood) {
  if (availableAmount(food) < 550) throw `You don't have 550 ${food}`;
}

if (
  get("_questPartyFairQuest") === "food" &&
  (!get("_claraBellUsed") || !get("_freePillKeeperUsed")) &&
  !get("_questPartyFairProgress")
) {
  for (const food of duffoFood) {
    if (shopAmount(food) > 0) throw `You already have ${food} in your shop. take it out first.`;
  }
  try {
    if (!get("_claraBellUsed")) use($item`Clara's bell`);
    else cliExecute("pillkeeper free noncombat");
    if (myInebriety() > inebrietyLimit()) {
      equip($item`Drunkula's wineglass`);
      Macro.runaway().setAutoAttack();
    } else {
      retrieveItem($item`Louder Than Bomb`);
      Macro.tryItem($item`Louder Than Bomb`).setAutoAttack();
    }
    for (const food of duffoFood) {
      retrieveItem(food, 550);
      putShop(0, 0, 550, food);
      repriceShop(402, food);
      buy(food, 1, 100);
      mallPrice(food);
    }
    setChoice(1322, 1);
    setChoice(1326, 3);
    setChoice(1324, 2);
    adv1($location`The Neverending Party`);
    if (handlingChoice()) runChoice(0);
  } finally {
    for (const food of duffoFood) {
      cliExecute(`shop take all ${food.name}`);
    }
    setAutoAttack(0);
    if (get("_questPartyFairProgress")) {
      const questFood = get("_questPartyFairProgress").split(" ");
      print(`your food quest is ${Item.get(questFood[1])}`, `yellow`);
    } else {
      print("something went wrong accepting food quest");
    }

    for (const food of duffoFood) {
      if (shopAmount(food)) userConfirm(`You still have ${food} in your shop!`);
    }
  }
}
