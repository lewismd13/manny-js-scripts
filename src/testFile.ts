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

if (
  get("_questPartyFairQuest") === "booze" &&
  !get("_claraBellUsed") &&
  !get("_questPartyFairProgress")
) {
  retrieveItem($item`Boulevardier cocktail`, 550);
  use($item`Clara's bell`);
  equip($item`Drunkula's wineglass`);
  putShop(0, 0, 550, $item`Boulevardier cocktail`);
  repriceShop(392, $item`Boulevardier cocktail`);
  buy($item`Boulevardier cocktail`, 1, 100);
  mallPrice($item`Boulevardier cocktail`);
  setChoice(1322, 1);
  setChoice(1327, 3);
  setChoice(1324, 3);
  adv1($location`The Neverending Party`);
  if (handlingChoice()) runChoice(0);
  cliExecute("shop take all boulevardier cocktail");
  if (get("_questPartyFairProgress")) {
    const booze = get("_questPartyFairProgress").split(" ");
    print(`your booze quest is ${Item.get(booze[1])}`);
  } else {
    print("something went wrong accepting booze quest");
  }
}

// TODO: have a fake buy call to update mafia price

if (
  get("_questPartyFairQuest") === "food" &&
  (!get("_claraBellUsed") || !get("_freePillKeeperUsed")) &&
  !get("_questPartyFairProgress")
) {
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
