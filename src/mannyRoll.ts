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
  use,
  useFamiliar,
  useSkill,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, $skill, ChateauMantegna, Clan, get, have } from "libram";
import { bafhWls } from "./bafh";
import {
  botCheck,
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

if (get("_augSkillsCast") < 5) useSkill($skill`Aug. 13th: Left/Off Hander's Day!`);

useFamiliar($familiar`Left-Hand Man`);
maximize("adv +equip Spacegate scientist's insignia +equip Sasq™ watch -equip june cleaver", false);
// bafhStashCheck();
botCheck();
Clan.join("Alliance From Hobopolis");
