import {
  availableAmount,
  buy,
  cliExecute,
  eudoraItem,
  getCampground,
  inebrietyLimit,
  maximize,
  myGardenType,
  myInebriety,
  print,
  pvpAttacksLeft,
  retrieveItem,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, $items, ChateauMantegna, Clan, have } from "libram";
import { breakfastCounter, mannyCleanup, nightcap, randomPrank, randomSafari } from "./lib";

Clan.join("Alliance from Hell");

if (pvpAttacksLeft() > 0) {
  cliExecute("UberPvPOptimizer");
  cliExecute("swagger");
}

if (myInebriety() <= inebrietyLimit()) nightcap();

mannyCleanup();

randomSafari();
randomPrank();

if (myGardenType() !== "grass") {
  use(1, $item`packet of tall grass seeds`);
}

if (myGardenType() === "grass") {
  use($item`Poké-Gro fertilizer`); // fertilizer
  use($item`packet of thanksgarden seeds`);
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
maximize("adv", false);
Clan.join("Alliance From Hobopolis");

const beachrares = $items`meteorite fragment, cursed pirate cutlass, cursed swash buckle, cursed tricorn hat`;

for (const item of beachrares) {
  if (item === $item`cursed pirate cutlass`) {
    if (availableAmount(item) > 1) print(`holy shit you found a ${item}!`, "yellow");
  } else if (have(item)) print(`holy shit you found a ${item}!`);
}
