// TODO: handle the initial choice if needed, instead of throwing

import {
  Item,
  adv1,
  availableAmount,
  batchClose,
  batchOpen,
  chew,
  cliExecute,
  closetAmount,
  equip,
  equippedItem,
  gametimeToInt,
  getClanId,
  handlingChoice,
  inebrietyLimit,
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
  takeCloset,
  takeStash,
  use,
  useFamiliar,
  waitq,
} from "kolmafia";
import { $familiar, $item, $location, $slot, Clan, Macro, get } from "libram";
import { setChoice } from "./lib";

const startclan = Clan.get().id;

if (get("_questPartyFair") === "unstarted") throw "you actually need to accept the quest first";
if (get("_questPartyFairQuest") !== "food" && get("_questPartyFairQuest") !== "booze")
  throw "You... don't have a food or booze quest, wyd";

Clan.join(2046987341);

const duffoItem = [];

const stashduffobooze = [
  $item`bottle of Bloodweiser`,
  $item`Dreadsylvanian slithery nipple`,
  $item`Dreadsylvanian hot toddy`,
  $item`Doc Clock's thyme cocktail`,
  $item`very fancy whiskey`,
  $item`Dreadsylvanian dank and stormy`,
  $item`mentholated wine`,
  $item`drive-by shooting`,
  $item`emergency margarita`,
  $item`bottle of Crimbognac`,
  $item`Gets-You-Drunk`,
  $item`Dreadsylvanian grimlet`,
  $item`vampagne`,
  $item`Dreadsylvanian cold-fashioned`,
  $item`bottle of Greedy Dog`,
  $item`Newark`,
  $item`stinkwater`,
  $item`Hodgman's blanket`,
  $item`swirling mushroom wine`,
  $item`nega-mushroom wine`,
  $item`TRIO cup of beer`,
  $item`The Mad Liquor`,
];

const stashduffofood = [
  $item`blood sausage`,
  $item`ghost pepper`,
  $item`Dreadsylvanian hot pocket`,
  $item`Dreadsylvanian stink pocket`,
  $item`Dreadsylvanian cold pocket`,
  $item`Dreadsylvanian sleaze pocket`,
  $item`frozen banquet`,
  $item`tin cup of mulligan stew`,
  $item`toast with stench jelly`,
  $item`digital key lime pie`,
  $item`The Plumber's mushroom stew`,
];

if (get("_questPartyFairQuest") === "booze") {
  setChoice(1322, 1);
  setChoice(1327, 3);
  setChoice(1324, 3);
  const duffoBooze = [
    $item`jar of fermented pickle juice`,
    $item`Schrödinger's thermos`,
    $item`vintage smart drink`,
    $item`Feliz Navidad`,
  ];

  for (const thing of duffoBooze) {
    if (availableAmount(thing) < 505 && closetAmount(thing) >= 505) {
      takeCloset(thing, 505);
    } else if (availableAmount(thing) < 505) throw `You don't have 505 ${thing.name}`;

    if (shopAmount(thing)) cliExecute(`shop take all ${thing.name}`);
  }

  for (const booze of duffoBooze) {
    duffoItem.push(booze);
  }

  for (const booze of stashduffobooze) {
    takeStash(booze, 505);
    duffoItem.push(booze);
  }
}

if (get("_questPartyFairQuest") === "food") {
  setChoice(1322, 1);
  setChoice(1326, 3);
  setChoice(1324, 2);
  const duffoFood = [
    $item`extra-greasy slider`,
    $item`quantum taco`,
    $item`Mr. Burnsger`,
    $item`jawbruiser`,
    $item`Dreadsylvanian spooky pocket`,
  ];

  for (const thing of duffoFood) {
    if (availableAmount(thing) < 505 && closetAmount(thing) >= 505) {
      takeCloset(thing, 505);
    } else if (availableAmount(thing) < 505) throw `You don't have 505 ${thing.name}`;

    if (shopAmount(thing)) cliExecute(`shop take all ${thing.name}`);
  }

  for (const food of duffoFood) {
    duffoItem.push(food);
  }

  for (const food of stashduffofood) {
    takeStash(food, 505);
    duffoItem.push(food);
  }
}

let starttime = 0;
let endtime = 0;

if (
  equippedItem($slot`offhand`) === $item`Kramco Sausage-o-Matic™` ||
  equippedItem($slot`offhand`) === $item`June cleaver`
)
  equip($slot`offhand`, $item`none`);
if (equippedItem($slot`weapon`) === $item`June cleaver`)
  equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);

useFamiliar($familiar`Frumious Bandersnatch`);

// make sure there's nothing in my shop already that I'm about to duffo with, and that I have enough of everything
for (const thing of duffoItem) {
  print(thing.name);
  if (availableAmount(thing) < 505) throw `You don't have 505 ${thing.name}`;
  if (shopAmount(thing)) cliExecute(`shop take all ${thing.name}`);
}

try {
  if (!get("_claraBellUsed")) use($item`Clara's bell`);
  else chew($item`stench jelly`);
  if (myInebriety() > inebrietyLimit()) {
    equip($item`Drunkula's wineglass`);
    Macro.runaway().setAutoAttack();
  } else {
    retrieveItem($item`Louder Than Bomb`);
    Macro.tryItem($item`Louder Than Bomb`).setAutoAttack();
  }
  for (const duffoseed of duffoItem) {
    retrieveItem(duffoseed, 505);
    putShop(0, 0, 505, duffoseed);
  }
  starttime = gametimeToInt();
  batchOpen();
  for (const duffoseed of duffoItem) {
    repriceShop(402, duffoseed);
  }
  batchClose();
  waitq(1);
  adv1($location`The Neverending Party`);
  if (handlingChoice()) runChoice(0);
} finally {
  batchOpen();
  for (const duffoseed of duffoItem) {
    repriceShop(999999999, duffoseed);
  }
  batchClose();
  endtime = gametimeToInt();
  for (const duffoseed of duffoItem) {
    cliExecute(`shop take all ${duffoseed.name}`);
  }
}
// return items to stash

if (getClanId() !== 2046987341) Clan.join(2046987341);

if (get("_questPartyFairQuest") === "booze") {
  for (const booze of stashduffobooze) {
    if (itemAmount(booze) >= 505) {
      putStash(booze, 505);
    } else {
      print(`You don't have enough ${booze}, did something go wrong?`, "red");
    }
  }
} else if (get("_questPartyFairQuest") === "food") {
  for (const food of stashduffofood) {
    if (itemAmount(food) >= 505) {
      putStash(food, 505);
    } else {
      print(`You don't have enough ${food}, did something go wrong?`, "red");
    }
  }
}

setAutoAttack(0);
Clan.join(startclan);

print(`Items were in the mall at low price for ${(endtime - starttime) / 1000} seconds`, "orange");

if (get("_questPartyFairProgress")) {
  const questItem = get("_questPartyFairProgress").split(" ");
  print(`your duffo quest is ${Item.get(questItem[1])}`, `yellow`);
} else {
  print("something went wrong accepting booze quest");
}
