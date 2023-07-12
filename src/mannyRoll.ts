import {
  buy,
  cliExecute,
  eudoraItem,
  getCampground,
  inebrietyLimit,
  maximize,
  myGardenType,
  myInebriety,
  putStash,
  pvpAttacksLeft,
  retrieveItem,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, ChateauMantegna, Clan, have } from "libram";
import { bafhWls } from "./bafh";
import {
  bafhStashCheck,
  breakfastCounter,
  mannyCleanup,
  nightcap,
  randomPrank,
  randomSafari,
} from "./lib";

bafhWls();

if (pvpAttacksLeft() > 0) {
  cliExecute("UberPvPOptimizer");
  cliExecute("swagger");
}

// Do melf dupe if it's available

if (myInebriety() <= inebrietyLimit()) nightcap();

mannyCleanup();

if (have($item`Greatest American Pants`)) {
  Clan.join("Alliance From Hell");
  putStash($item`Greatest American Pants`, 1);
}

randomSafari();
randomPrank();

if (myGardenType() !== "grass") {
  use(1, $item`packet of tall grass seeds`);
}

if (myGardenType() === "grass") {
  use($item`Poké-Gro fertilizer`); // fertilizer
  // eslint-disable-next-line libram/verify-constants
  use($item`packet of rock seeds`);
}
if (!have($item`clockwork maid`) && getCampground()["clockwork maid"] !== 1)
  buy($item`clockwork maid`, 1, 10000);

if (have($item`clockwork maid`)) {
  use($item`clockwork maid`);
}

breakfastCounter();

if (ChateauMantegna.getCeiling() !== "artificial skylight")
  ChateauMantegna.changeCeiling("artificial skylight");

if (eudoraItem() !== $item`New-You Club Membership Form`)
  visitUrl(`account.php?actions[]=whichpenpal&whichpenpal=4&action=Update`, true);

useFamiliar($familiar`Trick-or-Treating Tot`);
retrieveItem($item`li'l unicorn costume`);
maximize("adv +equip Spacegate scientist's insignia +equip Sasq™ watch -equip june cleaver", false);
bafhStashCheck();
Clan.join("Alliance From Hobopolis");
