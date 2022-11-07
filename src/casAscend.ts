import {
  adv1,
  cliExecute,
  equip,
  myGardenType,
  myPrimestat,
  print,
  retrieveItem,
  runChoice,
  runCombat,
  setAutoAttack,
  stashAmount,
  takeStash,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $effect,
  $familiar,
  $item,
  $location,
  $path,
  $skill,
  $stat,
  ascend,
  Clan,
  get,
  have,
  Lifestyle,
  Macro,
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
    nightstand: "bowl of potpourri",
  },
});

ascend(
  $path`none`,
  $class`Accordion Thief`,
  Lifestyle.casual,
  "packrat",
  $item`astral six-pack`,
  $item`astral pet sweater`
);

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

// fight a glitch
cliExecute("fold makeshift garbage shirt");
equip($item`makeshift garbage shirt`);
equip($item`Fourth of May Cosplay Saber`);
cliExecute("umbrella ml");
equip($item`unbreakable umbrella`);
equip($item`Eight Days a Week Pill Keeper`);
equip($item`Daylight Shavings Helmet`);
useFamiliar($familiar`Hovering Sombrero`);
equip($item`astral pet sweater`);
retrieveItem($item`gas balloon`);
retrieveItem($item`gas can`, 2);
if (!have($effect`That's Just Cloud-Talk, Man`)) {
  visitUrl("place.php?whichplace=campaway&action=campaway_sky");
}

if (myPrimestat() === $stat`muscle`) {
  cliExecute("shower warm");
  retrieveItem($item`synthetic marrow`, 5);
  cliExecute("pantogram mus gains|silent");
  equip($item`pantogram pants`);
}

if (myPrimestat() === $stat`moxie`) {
  cliExecute("shower cool");
  retrieveItem($item`the funk`, 5);
  cliExecute("pantogram mox gains|silent");
  equip($item`pantogram pants`);
}

if (myPrimestat() === $stat`mysticality`) {
  cliExecute("shower lukewarm");
  retrieveItem($item`haunted battery`, 5);
  cliExecute("pantogram mys gains|silent");
  equip($item`pantogram pants`);
}

if (!get("_glitchItemImplemented")) {
  retrieveItem($item`[glitch season reward name]`);
  use($item`[glitch season reward name]`);
}

Macro.item($item`gas balloon`)
  .skill($skill`Feel Pride`)
  .item($item`gas can`, $item`gas can`)
  .setAutoAttack();

visitUrl("inv_eat.php?pwd&whichitem=10207");
runCombat(
  Macro.item($item`gas balloon`)
    .skill($skill`Feel Pride`)
    .item($item`gas can`, $item`gas can`)
    .toString()
);

setAutoAttack(0);

if (get("_questPartyFairQuest") === "") {
  setChoice(1322, 6); // Leave
  adv1($location`The Neverending Party`, -1, "");
}

if (get("_questPartyFairQuest") === "food" || get("_questPartyFairQuest") === "booze") {
  setChoice(1322, 1); // accept
  adv1($location`The Neverending Party`, -1, "");
  print(`Your NEP quest is ${get("_questPartyFairQuest")}`, "yellow");
} else print(`Your NEP quest is ${get("_questPartyFairQuest")}`);
