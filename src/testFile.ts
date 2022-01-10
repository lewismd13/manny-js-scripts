import {
  adv1,
  cliExecute,
  equip,
  handlingChoice,
  print,
  putShop,
  retrieveItem,
  runChoice,
  use,
} from "kolmafia";
import { $item, $location, get } from "libram";
import { setChoice } from "./lib";

if (get("_questPartyFairQuest") === "booze" && !get("_claraBellUsed")) {
  retrieveItem($item`Boulevardier cocktail`, 550);
  use($item`Clara's bell`);
  equip($item`Drunkula's wineglass`);
  putShop(497, 0, 550, $item`Boulevardier cocktail`);
  setChoice(1327, 3);
  setChoice(1324, 3);
  adv1($location`The Neverending Party`);
  if (handlingChoice()) runChoice(0);
  cliExecute("shop take all boulevardier cocktail");
  print(`your booze quest is ${get("_questPartyFairProgress")}`);
}

if (get("_questPartyFairQuest") === "food" && !get("_claraBellUsed")) {
  retrieveItem($item`extra-greasy slider`, 550);
  use($item`Clara's bell`);
  equip($item`Drunkula's wineglass`);
  putShop(497, 0, 550, $item`extra-greasy slider`);
  setChoice(1326, 3);
  setChoice(1324, 2);
  adv1($location`The Neverending Party`);
  if (handlingChoice()) runChoice(0);
  cliExecute("shop take all extra-greasy slider");
  print(`your food quest is ${get("_questPartyFairProgress")}`);
}
