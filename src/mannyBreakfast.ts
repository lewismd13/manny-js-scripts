import {
  adv1,
  availableAmount,
  buy,
  canInteract,
  cliExecute,
  containsText,
  getProperty,
  itemAmount,
  mallPrice,
  myGardenType,
  myName,
  myPath,
  outfit,
  print,
  putShop,
  random,
  reverseNumberology,
  runChoice,
  takeStorage,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { $item, $location, Clan, get, have, SourceTerminal } from "libram";
import { bafhWls } from "./bafh";
import { breakfastCounter, mannyQuestVolcoino, setChoice } from "./lib";

function buyRaffle(ticketQty: number) {
  if (
    availableAmount($item`raffle ticket`) < ticketQty &&
    myName() === "manendra" &&
    containsText(visitUrl("main.php"), "map7beach.gif") &&
    myPath() !== "Zombie Slayer"
  )
    cliExecute(`raffle ${ticketQty}${canInteract() ? " inventory" : " storage"}`);
  return availableAmount($item`raffle ticket`) >= ticketQty;
}

function getVolcoino() {
  if (get("_infernoDiscoVisited") === true) return;
  print("Attempting to rock Disco Style...");
  if (outfit("Velvet")) {
    visitUrl("place.php?whichplace=airport_hot&action=airport4_zone1");
    runChoice(7);
  } else print("Failed to claim Volcoino.", "red");
}

function getFunFunds() {
  if (get("_dinseyGarbageDisposed") === true) return;
  print("Attempting to turn in garbage...");
  if (itemAmount($item`bag of park garbage`) < 1) {
    if (canInteract()) {
      buy(1, $item`bag of park garbage`);
    } else {
      takeStorage(1, $item`bag of park garbage`);
    }
  }
  if (itemAmount($item`bag of park garbage`) >= 1) {
    visitUrl("place.php?whichplace=airport_stench&action=airport3_tunnels");
    runChoice(6);
  } else print("Failed to claim FunFunds.", "red");
}

// TODO: set snojo, learn terminal skills, make re-entrant

Clan.join(40382);

cliExecute("ccs libramMacro");

if (get("_clipartSummons") === 0) {
  cliExecute("create 1 borrowed time");
  cliExecute("create 2 box of familiar jacks");
}

if (get("_daycareGymScavenges") === 0) {
  visitUrl("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
  runChoice(3);
  runChoice(2);
  runChoice(1);
  runChoice(4);
  runChoice(5);
  runChoice(4);
}

const raffleTix = 5 + random(5);

buyRaffle(raffleTix);

while (get("_sausagesMade") < 23 && have($item`magical sausage casing`)) {
  cliExecute("make 1 magical sausage");
}

while (
  Object.keys(reverseNumberology()).includes("69") &&
  get("_universeCalculated") < get("skillLevel144")
) {
  cliExecute("numberology 69");
}

if (get("_etchedHourglassUsed") === false) {
  use($item`etched hourglass`);
}

while (
  Object.keys(reverseNumberology()).includes("69") &&
  get("_universeCalculated") < get("skillLevel144")
) {
  cliExecute("numberology 69");
}

// this fights the highest value phylum with your first deck pull for the guaranteed robort drop
// then it pulls blue mana, then gift card or mickey based on gift card prices
while (get("_deckCardsDrawn") < 11) {
  /*
  const bestMob = [...robortPrices.entries()].reduce((a, b) => (b[0] > a[0] ? b : a));
  if (bestMob[0] > 10000 && get("_deckCardsDrawn") === 0) {
    useFamiliar($familiar`Robortender`);
    retrieveItem($item`toggle switch (Bartend)`);
    equip($item`toggle switch (Bartend)`);
    equip($slot`acc1`, $item`Mr. Cheeng's spectacles`);
    equip($slot`acc2`, $item`Mr. Screege's spectacles`);
    equip($slot`acc3`, $item`lucky gold ring`);
    equip($slot`weapon`, $item`garbage sticker`);
    retrieveItem($item`can of mixed everything`);
    equip($item`can of mixed everything`);
    Macro.skill($skill`Curse of Weaksauce`)
      .trySkill($skill`Shattering Punch`)
      .skill($skill`Saucegeyser`)
      .setAutoAttack();
    cliExecute(`cheat phylum ${bestMob[1].phylum}`);
    setAutoAttack(0);
  } else */

  if (!get("_deckCardsSeen").includes("Ancestral")) cliExecute("cheat ancestral recall");
  else if (!get("_deckCardsSeen").includes("Island")) cliExecute("cheat island");
  else if (mallPrice($item`gift card`) > 10000 && !get("_deckCardsSeen").includes("gift")) {
    cliExecute("cheat gift card");
  } else if (!get("_deckCardsSeen").includes("1952")) {
    cliExecute("cheat 1952 mickey mantle");
  }
}
/*
if (
  CombatLoversLocket.reminiscesLeft() > 1 ||
  !CombatLoversLocket.availableLocketMonsters().includes($monster`Knob Goblin Embezzler`)
) {
  locketRobortDrop();
}
*/
cliExecute("shower cold");
// cliExecute("bastille mainstat brutalist gesture");
cliExecute("briefcase collect");
cliExecute("detective solver");

while (toInt(getProperty("_sourceTerminalExtrudes")) < 3) {
  SourceTerminal.extrude($item`hacked gibson`);
}

// Chateau desk, assuming meat
visitUrl("place.php?whichplace=chateau&action=chateau_desk1");

// Upgrade saber for fam wt
if (get("_saberMod") === 0) {
  visitUrl("main.php?action=may4");
  runChoice(4);
}

use(1, $item`Bird-a-Day calendar`);

getVolcoino();
getFunFunds();

if (myGardenType() === "thanksgarden" && !get("_mushroomGardenVisited")) {
  cliExecute("garden pick");
  use(1, $item`packet of tall grass seeds`);
}

putShop(0, 0, availableAmount($item`battery (AAA)`), $item`battery (AAA)`);
putShop(0, 0, availableAmount($item`cornucopia`), $item`cornucopia`);
putShop(49995, 0, 3, $item`pocket wish`);
putShop(0, 0, availableAmount($item`11-leaf clover`), $item`11-leaf clover`);

cliExecute("ccs default");

if (get("_questPartyFairQuest") === "") {
  setChoice(1322, 6); // Leave
  adv1($location`The Neverending Party`, -1, "");
}

mannyQuestVolcoino();

bafhWls();

if (get("muffinOnOrder") === "blueberry" && !get("_muffinOrderedToday")) {
  visitUrl("place.php?whichplace=monorail&action=monorail_downtown");
  runChoice(7); // visit breakfast counter
  runChoice(4); //
}

breakfastCounter();

if (get("_questPartyFairQuest") === "food") {
  print("Hey, go talk to Geraldine, time for another sliderpocalypse!", "yellow");
} else if (get("_questPartyFairQuest") === "booze") {
  print("Hey, go talk to Gerald, get that jarmageddon!", "yellow");
} else print(`Sorry, your NEP quest is ${get("_questPartyFairQuest")}.`);

// setProperty("mannyDayStep", "breakfastComplete");
