import {
  adv1,
  buy,
  cliExecute,
  equip,
  handlingChoice,
  mallPrice,
  print,
  putShop,
  repriceShop,
  retrieveItem,
  runChoice,
  setAutoAttack,
  use,
} from "kolmafia";
import { $item, $location, get, Macro } from "libram";
import { setChoice } from "./lib";

// TODO: just have two arrays of items that we do this for

if (get("_questPartyFair") === "unstarted") throw "you actually need to accept the quest first";

if (
  get("_questPartyFairQuest") === "booze" &&
  (!get("_claraBellUsed") || !get("_freePillKeeperUsed")) &&
  !get("_questPartyFairProgress")
) {
  try {
    Macro.runaway().setAutoAttack();
    retrieveItem($item`Boulevardier cocktail`, 550);
    retrieveItem($item`Dreadsylvanian grimlet`);
    if (!get("_claraBellUsed")) use($item`Clara's bell`);
    else cliExecute("pillkeeper free noncombat");
    equip($item`Drunkula's wineglass`);
    putShop(0, 0, 550, $item`Boulevardier cocktail`);
    putShop(0, 0, 550, $item`Dreadsylvanian grimlet`);
    repriceShop(392, $item`Boulevardier cocktail`);
    repriceShop(377, $item`Dreadsylvanian grimlet`);
    buy($item`Boulevardier cocktail`, 1, 100);
    buy($item`Dreadsylvanian grimlet`, 1, 100);
    mallPrice($item`Boulevardier cocktail`);
    mallPrice($item`Dreadsylvanian grimlet`);
    setChoice(1322, 1);
    setChoice(1327, 3);
    setChoice(1324, 3);
    adv1($location`The Neverending Party`);
    if (handlingChoice()) runChoice(0);
  } finally {
    cliExecute("shop take all boulevardier cocktail");
    setAutoAttack(0);
    if (get("_questPartyFairProgress")) {
      const booze = get("_questPartyFairProgress").split(" ");
      print(`your booze quest is ${Item.get(booze[1])}`);
    } else {
      print("something went wrong accepting booze quest");
    }
  }
}

if (
  get("_questPartyFairQuest") === "food" &&
  (!get("_claraBellUsed") || !get("_freePillKeeperUsed")) &&
  !get("_questPartyFairProgress")
) {
  try {
    Macro.runaway().setAutoAttack();
    retrieveItem($item`extra-greasy slider`, 550);
    retrieveItem($item`quantum taco`, 550);
    if (!get("_claraBellUsed")) use($item`Clara's bell`);
    else cliExecute("pillkeeper free noncombat");
    equip($item`Drunkula's wineglass`);
    putShop(0, 0, 550, $item`extra-greasy slider`);
    repriceShop(402, $item`extra-greasy slider`);
    buy($item`extra-greasy slider`, 1, 100);
    mallPrice($item`extra-greasy slider`);
    setChoice(1322, 1);
    setChoice(1326, 3);
    setChoice(1324, 2);
    adv1($location`The Neverending Party`);
    if (handlingChoice()) runChoice(0);
  } finally {
    cliExecute("shop take all extra-greasy slider");
    cliExecute("shop take all quantum taco");
    setAutoAttack(0);
    if (get("_questPartyFairProgress")) {
      const food = get("_questPartyFairProgress").split(" ");
      print(`your food quest is ${Item.get(food[1])}`);
    } else {
      print("something went wrong accepting food quest");
    }
  }
}
