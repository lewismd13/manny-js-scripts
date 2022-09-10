import {
  adv1,
  availableAmount,
  batchClose,
  batchOpen,
  cliExecute,
  equip,
  equippedItem,
  gametimeToInt,
  handlingChoice,
  inebrietyLimit,
  Item,
  itemAmount,
  myInebriety,
  print,
  putShop,
  putStash,
  repriceShop,
  retrieveItem,
  runChoice,
  setAutoAttack,
  shopAmount,
  stashAmount,
  takeStash,
  use,
  useFamiliar,
  userConfirm,
} from "kolmafia";
import { $familiar, $item, $location, $slot, Clan, get, Macro } from "libram";
import { setChoice } from "./lib";

// TODO: handle the initial choice if needed, instead of throwing

const stash = false;

if (get("_questPartyFair") === "unstarted") throw "you actually need to accept the quest first";

if (equippedItem($slot`offhand`) === $item`Kramco Sausage-o-Matic™`)
  equip($slot`offhand`, $item`none`);

useFamiliar($familiar`Frumious Bandersnatch`);

// ideas: thermoses, CS drinks, robort drinks, longterm greedy dogs or very fancy whiskey
export const duffoBooze = [
  $item`jar of fermented pickle juice`,
  $item`Dreadsylvanian grimlet`,
  $item`Schrödinger's thermos`,
  $item`vintage smart drink`,
];

export const stashduffobooze = [
  $item`bottle of Greedy Dog`,
  $item`bottle of Bloodweiser`,
  $item`Feliz Navidad`,
  $item`Gets-You-Drunk`,
];

let starttime = 0;

for (const booze of duffoBooze) {
  if (availableAmount(booze) < 550) throw `You don't have 550 ${booze}`;
}

if (
  get("_questPartyFairQuest") === "booze" &&
  (!get("_claraBellUsed") || !get("_freePillKeeperUsed")) &&
  !get("_questPartyFairProgress")
) {
  if (stash) {
    Clan.join(2046987341);
    for (const booze of stashduffobooze) {
      if (stashAmount(booze) >= 550) {
        takeStash(booze, 550);
        duffoBooze.push(booze);
      }
    }
  }

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
    starttime = gametimeToInt();
    for (const booze of duffoBooze) {
      retrieveItem(booze, 550);
      putShop(0, 0, 550, booze);
    }
    batchOpen();
    for (const booze of duffoBooze) {
      repriceShop(402, booze);
    }
    batchClose();
    setChoice(1322, 1);
    setChoice(1327, 3);
    setChoice(1324, 3);
    adv1($location`The Neverending Party`);
    if (handlingChoice()) runChoice(0);
  } finally {
    batchOpen();
    for (const booze of duffoBooze) {
      repriceShop(999999999, booze);
    }
    batchClose();
    for (const booze of duffoBooze) {
      cliExecute(`shop take all ${booze.name}`);
    }
    print(`Items were in the mall for ${(gametimeToInt() - starttime) / 1000} seconds`, "orange");
    for (const booze of stashduffobooze) {
      if (itemAmount(booze) >= 550) {
        putStash(booze, 550);
      } else {
        print(`You don't have enough ${booze}, did something go wrong?`, "red");
      }
    }
    setAutoAttack(0);
    if (get("_questPartyFairProgress")) {
      const questBooze = get("_questPartyFairProgress").split(" ");
      print(`your duffo quest is ${Item.get(questBooze[1])}`, `yellow`);
    } else {
      print("something went wrong accepting booze quest");
    }

    for (const booze of duffoBooze) {
      if (shopAmount(booze)) userConfirm(`You still have ${booze} in your shop!`);
    }
  }
}

// ideas: spectral pickles, shawarma
const duffoFood = [
  $item`extra-greasy slider`,
  $item`Dreadsylvanian spooky pocket`,
  $item`quantum taco`,
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
    starttime = gametimeToInt();
    for (const food of duffoFood) {
      retrieveItem(food, 550);
      putShop(0, 0, 550, food);
    }

    batchOpen();
    for (const food of duffoFood) {
      repriceShop(402, food);
    }
    batchClose();

    setChoice(1322, 1);
    setChoice(1326, 3);
    setChoice(1324, 2);
    adv1($location`The Neverending Party`);
    if (handlingChoice()) runChoice(0);
  } finally {
    batchOpen();
    for (const food of duffoFood) {
      repriceShop(999999999, food);
    }
    batchClose();
    for (const food of duffoFood) {
      cliExecute(`shop take all ${food.name}`);
    }
    print(`Items were in the mall for ${(gametimeToInt() - starttime) / 1000} seconds`, "orange");
    setAutoAttack(0);
    if (get("_questPartyFairProgress")) {
      const questFood = get("_questPartyFairProgress").split(" ");
      print(`your duffo quest is ${Item.get(questFood[1])}`, `yellow`);
    } else {
      print("something went wrong accepting food quest");
    }

    for (const food of duffoFood) {
      if (shopAmount(food)) userConfirm(`You still have ${food} in your shop!`);
    }
  }
}
