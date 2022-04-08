import {
  adv1,
  buy,
  cliExecute,
  equip,
  handlingChoice,
  inebrietyLimit,
  Item,
  mallPrice,
  myInebriety,
  print,
  putShop,
  repriceShop,
  retrieveItem,
  runChoice,
  setAutoAttack,
  shopAmount,
  userConfirm,
} from "kolmafia";
import { $item, $location, get, Macro } from "libram";
import { duffoBooze } from "./duffoislit";
import { setChoice } from "./lib";

for (const booze of duffoBooze) {
  if (shopAmount(booze) > 0) throw `You already have ${booze} in your shop. take it out first.`;
}
try {
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
