import {
  availableAmount,
  chew,
  cliExecute,
  drinksilent,
  eatsilent,
  equip,
  fullnessLimit,
  getClanId,
  haveEffect,
  inebrietyLimit,
  isBanished,
  maximize,
  myAdventures,
  myFullness,
  myInebriety,
  mySpleenUse,
  putStash,
  retrieveItem,
  spleenLimit,
  sweetSynthesis,
  takeStash,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $location,
  $monster,
  $skill,
  $slot,
  adventureMacroAuto,
  get,
  Macro,
} from "libram";

import { setChoice } from "./lib";

if (getClanId() !== 40382) {
  cliExecute("/whitelist alliance from hell");
}

if (get("boomBoxSong") !== "Food Vibrations") {
  cliExecute("boombox food");
}

if (!get("_borrowedTimeUsed")) {
  use($item`borrowed time`);
}

while (haveEffect($effect`Synthesis: Collection`) < 540 && mySpleenUse() < spleenLimit()) {
  sweetSynthesis($item`Milk Studs`, $item`Milk Studs`);
}

if (myFullness() === 0 && myInebriety() === 0) {
  // chew(5, $item`voodoo snuff`);
  // useSkill($skill`cheat code: triple size`, 1);
  maximize("HP", false);
  use($item`milk of magnesium`);
  eatsilent(2, $item`Ol' Scratch's salad fork`);
  eatsilent(2, $item`extra-greasy slider`);
  useSkill($skill`The Ode to Booze`, 1);
  drinksilent(1, $item`Frosty's frosty mug`);
  drinksilent(1, $item`jar of fermented pickle juice`);

  while (haveEffect($effect`Synthesis: Collection`) < 540 && mySpleenUse() < spleenLimit()) {
    sweetSynthesis($item`Milk Studs`, $item`Milk Studs`);
  }
  while (mySpleenUse() < spleenLimit() - 2) {
    chew(1, $item`voodoo snuff`);
  }
  // chew(1, $item`antimatter wad`);
  // chew(1, $item`beggin\' cologne`);
  if (myFullness() === 10 && myInebriety() === 5) {
    useSkill($skill`The Ode to Booze`, 1);
    drinksilent(1, $item`Frosty's frosty mug`);
    drinksilent(1, $item`jar of fermented pickle juice`);
    eatsilent(1, $item`Ol' Scratch's salad fork`);
    eatsilent(1, $item`extra-greasy slider`);
    if (mySpleenUse() < 5) {
      chew(2, $item`voodoo snuff`);
    }
    drinksilent(1, $item`Frosty's frosty mug`);
    drinksilent(1, $item`jar of fermented pickle juice`);
    // chew(1, $item`voodoo snuff`);
    // chew(1, $item`antimatter wad`);
    while (mySpleenUse() < spleenLimit() - 2) {
      chew(1, $item`voodoo snuff`);
    }
  } else throw "Something went wrong with your diet";
}

// buy and use essential tofu (with price limit)
/*
if (get("_essentialTofuUsed") === false) {
  buy(1, $item`essential tofu`, 5000);
  use($item`essential tofu`);
}
*/
//should probably put all this under individual if statements
if (!get("_mimeArmyShotglassUsed") && !get("_syntheticDogHairPillUsed")) {
  useSkill($skill`The Ode to Booze`, 1);
  use(1, $item`synthetic dog hair pill`);
  equip($item`tuxedo shirt`);
  drinksilent(2, $item`splendid martini`);
}
// check if we should leave room for hobopolis marketplace food, if not, then the usual hobo diet
if (!userConfirm("Do you want to leave room for marketplace?")) {
  if (myInebriety() - inebrietyLimit() > 4) {
    useSkill($skill`The Ode to Booze`);
    drinksilent(1, $item`Frosty's frosty mug`);
    drinksilent(1, $item`jar of fermented pickle juice`);
  }
  if (myFullness() - fullnessLimit() > 4) {
    eatsilent(1, $item`Ol' Scratch's salad fork`);
    eatsilent(1, $item`extra-greasy slider`);
  }
}

if (availableAmount($item`navel ring of navel gazing`) === 0) {
  takeStash($item`navel ring of navel gazing`, 1);
}

equip($item`bounty-hunting helmet`);
equip($item`balsam barrel`);
equip($item`sea salt scrubs`);
equip($item`extra-large utility candle`);
equip($item`tiny black hole`);
equip($item`bounty-hunting pants`);
equip($item`navel ring of navel gazing`, $slot`acc1`);
equip($item`mafia thumb ring`, $slot`acc2`);
equip($item`lucky gold ring`, $slot`acc3`);
useFamiliar($familiar`Cat Burglar`);
equip($item`burglar/sleep mask`);

eatsilent($item`magical sausage`);

while (haveEffect($effect`Fat Leon's Phat Loot Lyric`) < myAdventures()) {
  useSkill($skill`Fat Leon's Phat Loot Lyric`, 5);
}
eatsilent($item`magical sausage`);

while (haveEffect($effect`Singer's Faithful Ocelot`) < myAdventures()) {
  useSkill($skill`Singer's Faithful Ocelot`, 5);
}

while (
  haveEffect($effect`Synthesis: Collection`) < myAdventures() &&
  mySpleenUse() < spleenLimit()
) {
  sweetSynthesis($item`Milk Studs`, $item`Milk Studs`);
}

while (haveEffect($effect`Driving Observantly`) < myAdventures()) {
  cliExecute("asdonmartin drive observantly");
}
eatsilent($item`magical sausage`);
while (haveEffect($effect`The Spirit of Taking`) < myAdventures()) {
  useSkill($skill`The Spirit of Taking`, 5);
}
eatsilent($item`magical sausage`);

while (get("_sourceTerminalEnhanceUses") < 3) {
  cliExecute("terminal enhance item.enh");
}
while (haveEffect($effect`Leash of Linguini`) < myAdventures()) {
  useSkill($skill`Leash of Linguini`, 5);
}

while (haveEffect($effect`Polka of Plenty`) < myAdventures()) {
  useSkill($skill`The Polka of Plenty`, 5);
}

eatsilent($item`magical sausage`);

while (haveEffect($effect`Empathy`) < myAdventures()) {
  useSkill($skill`Empathy of the Newt`, 5);
}

while (get("_sausagesEaten") < 23) {
  eatsilent($item`magical sausage`);
}

if (!get("_clanFortuneBuffUsed")) {
  cliExecute("fortune buff item");
}

if (get("_tryptophanDartUsed") === false) {
  retrieveItem($item`tryptophan dart`);
}

if (get("_humanMuskUses") === 0) {
  retrieveItem($item`human musk`);
}

// pick a fight
setChoice(1324, 5);
// need to account for stupid choice adv
while (!isBanished($monster`party girl`) || !isBanished($monster`"plain" girl`)) {
  adventureMacroAuto(
    $location`The Neverending Party`,
    Macro.step("pickpocket")
      .if_('monstername "party girl"', Macro.item($item`tryptophan dart`))
      .if_("monsterid 2090", Macro.item($item`human musk`))
      .if_("match 'van key'", Macro.step("runaway"))
      .if_(
        "monstername jock",
        Macro.externalIf(
          haveEffect($effect`On the Trail`) === 0,
          Macro.trySkill($skill`Transcendent Olfaction`).trySkill($skill`Gallapagosian Mating Call`)
        )
      )
      .skill($skill`Curse of Weaksauce`)
      .skill($skill`Saucegeyser`)
      .repeat()
  );
}

while (myAdventures() > 10) {
  if (!isBanished($monster`party girl`) || !isBanished($monster`"plain" girl`)) {
    throw "You don't have the right mobs banished, you shouldn't be here.";
  }
  adventureMacroAuto(
    $location`The Neverending Party`,
    Macro.step("pickpocket")
      .if_('match "van key"', Macro.step("runaway"))
      .if_(
        'match "unremarkable duffel bag"',
        Macro.externalIf(
          haveEffect($effect`On the Trail`) === 0,
          Macro.trySkill($skill`Transcendent Olfaction`).trySkill($skill`Gallapagosian Mating Call`)
        ).step("runaway")
      )
      .if_(
        "monstername jock",
        Macro.externalIf(
          haveEffect($effect`On the Trail`) === 0,
          Macro.trySkill($skill`Transcendent Olfaction`).trySkill($skill`Gallapagosian Mating Call`)
        )
      )
      .if_(
        'monstername "biker" || monstername "party girl" || monsterid2090',
        Macro.step("runaway")
      )
      .skill($skill`Stuffed Mortar Shell`)
      .skill($skill`Curse of Weaksauce`)
      .skill($skill`Saucegeyser`)
      .repeat()
  );
}

if (availableAmount($item`navel ring of navel gazing`) > 0) {
  putStash($item`navel ring of navel gazing`, 1);
}
