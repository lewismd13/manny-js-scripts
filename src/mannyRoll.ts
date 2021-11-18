import { buy, maximize, myGardenType, use, useFamiliar } from "kolmafia";
import { $familiar, $item, Clan, have } from "libram";
import { mannyCleanup, nightcap, randomPrank, randomSafari } from "./lib";

Clan.join("Alliance from Hell");

mannyCleanup();
nightcap();
randomSafari();
randomPrank();

if (myGardenType() !== "grass") {
  use(1, $item`packet of tall grass seeds`);
}

if (myGardenType() === "grass") {
  use($item`Poké-Gro fertilizer`); // fertilizer
  use($item`packet of thanksgarden seeds`);
}

buy($item`clockwork maid`, 1, 10000);

if (have($item`clockwork maid`)) {
  use($item`clockwork maid`);
}

useFamiliar($familiar`Trick-or-Treating Tot`);
maximize("adv", false);
Clan.join("Alliance From Hobopolis");
