import {
  adv1,
  cliExecute,
  myGardenType,
  print,
  runChoice,
  stashAmount,
  takeStash,
  use,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $item,
  $location,
  ascend,
  Clan,
  get,
  have,
  Lifestyle,
  Paths,
  prepareAscension,
  SongBoom,
} from "libram";
import { randomPrank, randomSafari, setChoice } from "./lib";

randomPrank();
randomSafari();

Clan.join("Alliance From Hell");
if (!have($item`Greatest American Pants`) && stashAmount($item`Greatest American Pants`))
  takeStash($item`Greatest American Pants`, 1);

prepareAscension({
  workshed: "Asdon Martin keyfob",
  garden: "packet of thanksgarden seeds",
  eudora: "New-You Club Membership Form",
  chateau: {
    desk: "Swiss piggy bank",
    ceiling: "ceiling fan",
    nightstand: "electric muscle stimulator",
  },
});

ascend(
  Paths.Unrestricted,
  $class`Seal Clubber`,
  Lifestyle.casual,
  "canadia",
  $item`astral six-pack`,
  $item`astral pet sweater`
);

if (get("_questPartyFairQuest") === "") {
  setChoice(1322, 6); // Leave
  adv1($location`The Neverending Party`, -1, "");
}

if (get("_questPartyFairQuest") === "food" || get("_questPartyFairQuest") === "booze") {
  setChoice(1322, 1); // accept
  adv1($location`The Neverending Party`, -1, "");
  print(`Your NEP quest is ${get("_questPartyFairQuest")}`, "yellow");
} else print(`Your NEP quest is ${get("_questPartyFairQuest")}`);

if (myGardenType() === "thanksgarden") {
  cliExecute("garden pick");
  use($item`packet of tall grass seeds`);
}

if (SongBoom.song() !== "Food Vibrations") SongBoom.setSong("Food Vibrations");

if (have($item`astral six-pack`)) use($item`astral six-pack`);

Clan.join("Alliance From Hell");
if (stashAmount($item`Greatest American Pants`)) takeStash($item`Greatest American Pants`, 1);

// Upgrade saber for fam wt
if (get("_saberMod") === 0) {
  visitUrl("main.php?action=may4");
  runChoice(4);
}

// Chateau meat bank
visitUrl("place.php?whichplace=chateau&action=chateauDesk1");

// get cowboy boots
visitUrl("place.php?whichplace=town_right&action=townright_ltt");
