import {
  buy,
  chatPrivate,
  chew,
  cliExecute,
  containsText,
  drinksilent,
  eatsilent,
  equip,
  fullnessLimit,
  getClanId,
  getProperty,
  haveEffect,
  inebrietyLimit,
  itemAmount,
  maximize,
  myFullness,
  myInebriety,
  print,
  retrieveItem,
  setAutoAttack,
  takeCloset,
  takeStash,
  takeStorage,
  use,
  useFamiliar,
  userConfirm,
  userPrompt,
  useSkill,
  visitUrl,
  wait,
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
  Clan,
  get,
  have,
  Macro,
  Witchess,
} from "libram";

// TODO: split out diet, with userConfirm for marketplace, more dynamic handling so it can do post-loop

// TODO: split out sewers prep

// TODO: split out crimbo elves

// TODO: split out digitize/winking witchess

export function feedComma() {
  // ashq if (get_property('commaFamiliar') != "Temporal Riftlet" && my_familiar() == $familiar[comma chameleon]) { print('feeeeed me', 'red'); abort(); }
}

export function esplanade(): void {
  const raidlog = visitUrl("clan_raidlogs.php");
  const pipeRegExp = /broke \d* water pipes \(\d* turns\)/g;

  function pipesBroken() {
    const pipematch = raidlog.match(pipeRegExp);
    let pipes;
    if (pipematch === null) {
      pipes = 0;
      return pipes;
    } else {
      pipes = pipematch.toString();
      pipes = parseInt(pipes.slice(6, pipes.indexOf(" pipes")));
      return pipes;
    }
  }

  print(`${pipesBroken()}`);
}

export function hoboDiet(): void {
  if (getClanId() !== 40382) {
    cliExecute("/whitelist alliance from hell");
  }

  if (get("boomBoxSong") !== "Food Vibrations") {
    cliExecute("boombox food");
  }

  if (itemAmount($item`hobo nickel`) < 40) {
    takeCloset(itemAmount($item`hobo nickel`), $item`hobo nickel`);
    retrieveItem(40, $item`hobo nickel`);
  }

  if (!get("_borrowedTimeUsed")) {
    use($item`borrowed time`);
  }

  if (get("_sausagesEaten") === 0) {
    eatsilent(20, $item`magical sausage`);
  }

  if (myFullness() === 0 && myInebriety() === 0) {
    chew(5, $item`voodoo snuff`);
    // useSkill($skill`cheat code: triple size`, 1);
    maximize("HP", false);
    use($item`milk of magnesium`);
    eatsilent(2, $item`Ol' Scratch's salad fork`);
    eatsilent(2, $item`extra-greasy slider`);
    useSkill($skill`The Ode to Booze`, 1);
    drinksilent(1, $item`Frosty's frosty mug`);
    drinksilent(1, $item`jar of fermented pickle juice`);
    chew(5, $item`voodoo snuff`);
    // chew(1, $item`antimatter wad`);
    // chew(1, $item`beggin\' cologne`);
    if (myFullness() === 10 && myInebriety() === 5) {
      useSkill($skill`The Ode to Booze`, 1);
      drinksilent(1, $item`Frosty's frosty mug`);
      drinksilent(1, $item`jar of fermented pickle juice`);
      chew(1, $item`voodoo snuff`);
      chew(1, $item`antimatter wad`);
    }
  }

  // buy and use essential tofu (with price limit)
  if (get("_essentialTofuUsed") === false) {
    buy(1, $item`essential tofu`, 5000);
    use($item`essential tofu`);
  }

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
}

export function copyElves(): void {
  cliExecute("ccs twiddle");

  if (
    !get("_photocopyUsed") &&
    !have($item`photocopied monster`) &&
    getProperty("lastCopyableMonster") !== $monster`Black Crayon Crimbo Elf`.name
  ) {
    chatPrivate("cheesefax", "Black Crayon Crimbo Elf");
    for (let i = 0; i < 3; i++) {
      wait(10);
      cliExecute("fax receive");
      if (get("photocopyMonster") !== $monster`Black Crayon Crimbo Elf`) {
        throw "Failed to acquire photocopied black crayon crimbo elf.";
      }
    }
  }
  takeStash(1, $item`Spooky Putty sheet`);
  useFamiliar($familiar`Robortender`);
  retrieveItem($item`toggle switch (Bartend)`);
  equip($item`toggle switch (Bartend)`);
  equip($slot`acc1`, $item`backup camera`);
  equip($slot`acc2`, $item`Mr. Cheeng's spectacles`);
  equip($slot`acc3`, $item`lucky gold ring`);

  if (
    have($item`photocopied monster`, 1) &&
    get("photocopyMonster") === $monster`Black Crayon Crimbo Elf`
  ) {
    equip($item`Staff of Simmering Hatred`);
    Macro.skill($skill`Curse of Weaksauce`)
      .item($item`Spooky Putty sheet`)
      .trySkillRepeat($skill`Saucestorm`)
      .setAutoAttack();
    use($item`photocopied monster`);
    setAutoAttack(0);
  }

  // TODO: add in 5 copies using the spooky putty from hell stash
  while (
    get("_backUpUses") < 11 &&
    getProperty("lastCopyableMonster") === $monster`Black Crayon Crimbo Elf`.name
  ) {
    adventureMacroAuto(
      $location`Noob Cave`,
      Macro.trySkill($skill`Back-Up to your Last Enemy`)
        .tryItem($item`Spooky Putty sheet`)
        .trySkillRepeat($skill`Saucestorm`)
    );
  }

  setAutoAttack(0);
  // TODO: fix this combat. macro goes into infinite loop?
  /*
  while (
    get("spookyPuttyCopiesMade") < 5 &&
    have($item`Spooky Putty monster`) &&
    get("spookyPuttyMonster") === $monster`Black Crayon Crimbo Elf`
  ) {
    use($item`Spooky Putty monster`);
    runCombat(
      Macro.skill($skill`Curse of Weaksauce`)
        .if_("hascombatitem spooky putty sheet", Macro.item($item`Spooky Putty sheet`))
        .skill($skill`Saucestorm`)
        .repeat()
        .toString()
    );
  }

  putStash(1, $item`Spooky Putty sheet`);
*/
  if (!get("_sourceTerminalDigitizeMonster")) {
    useFamiliar($familiar`Reanimated Reanimator`);
    Macro.trySkill($skill`Digitize`)
      // eslint-disable-next-line libram/verify-constants
      .trySkill($skill`7168`) // wink
      .trySkillRepeat($skill`Saucestorm`)
      .setAutoAttack();
    Witchess.fightPiece($monster`Witchess Knight`);
    setAutoAttack(0);
  }

  // TODO: Profchain witchess mobs

  /*
  if (
    get("_backUpUses") === 10 &&
    getProperty("lastCopyableMonster") === $monster`black crayon crimbo elf`.name
  ) {
    useFamiliar($familiar`reanimated reanimator`);
    adventureMacroAuto(
      $location`noob cave`,
      Macro.trySkill($skill`back-up to your last enemy`)
        .trySkill($skill`digitize`)
        .trySkill($skill`7168`) // wink
        .trySkillRepeat($skill`saucestorm`)
    );
    setAutoAttack(0);
  }
*/
}

export function sewerPrep(): void {
  while (haveEffect($effect`Leash of Linguini`) < 30) {
    useSkill($skill`Leash of Linguini`, 3);
  }

  while (haveEffect($effect`Empathy`) < 30) {
    useSkill($skill`Empathy of the Newt`, 3);
  }

  while (haveEffect($effect`Blood Bond`) < 30) {
    useSkill($skill`Cannelloni Cocoon`);
    useSkill($skill`Blood Bond`, 10);
  }

  while (haveEffect($effect`Smooth Movements`) < 30) {
    useSkill($skill`Smooth Movement`, 3);
  }

  while (haveEffect($effect`The Sonata of Sneakiness`) < 30) {
    useSkill($skill`The Sonata of Sneakiness`, 3);
  }

  equip($item`Powerful Glove`, $slot`acc1`);
  while (haveEffect($effect`Invisible Avatar`) < 30 && get("_powerfulGloveBatteryPowerUsed") < 95) {
    useSkill($skill`CHEAT CODE: Invisible Avatar`, 3);
  }

  while (get("_poolGames") < 3) {
    cliExecute("pool aggressive");
  }

  if (!haveEffect($effect`A Girl Named Sue`) && !get("_clanFortuneBuffUsed")) {
    cliExecute("fortune buff familiar");
  }

  if (!get("_witchessBuff")) {
    cliExecute("witchess");
  }

  if (!containsText(get("_beachHeadsUsed"), "10")) {
    cliExecute("beach head 10");
  }

  if (haveEffect($effect`Driving Stealthily`) < 30) {
    cliExecute("asdonmartin fuel 1 pie man was not meant to eat");
    cliExecute("asdonmartin drive stealthily");
  }

  if (haveEffect($effect`Gummed Shoes`) === 0) {
    use($item`shoe gum`);
  }

  if (haveEffect($effect`Feeling Lonely`) === 0 && get("_feelLonelyUsed") < 3) {
    useSkill($skill`Feel Lonely`);
  }

  if (haveEffect($effect`Blessing of your favorite Bird`) === 0) {
    useSkill($skill`Visit your Favorite Bird`);
  }

  if (haveEffect($effect`Become Superficially interested`) === 0) {
    retrieveItem($item`Daily Affirmation: Be Superficially interested`);
    use($item`Daily Affirmation: Be Superficially interested`);
  }

  if (haveEffect($effect`Silent Running`) < 20) {
    cliExecute("swim noncombat");
  }

  useSkill($skill`The Ode to Booze`, 3);
  useFamiliar($familiar`Frumious Bandersnatch`);
  equip($item`none`, $slot`weapon`);
  equip($item`hobo code binder`);
  maximize("familiar weight -offhand", false);
  equip($item`camouflage T-shirt`);
  equip($item`protonic accelerator pack`);

  takeStorage($item`hobo nickel`, 40);

  setAutoAttack("sewers-banderrun");
  cliExecute("ccs default");
}

Clan.join("Alliance from Hell");

const prepChoice = userPrompt("What would you like to do? (sewer, diet, copies, or all)");
if (prepChoice === "sewer") {
  sewerPrep();
} else if (prepChoice === "diet") {
  hoboDiet();
} else if (prepChoice === "copies") {
  copyElves();
} else if (prepChoice === "all") {
  hoboDiet();
  copyElves();
  sewerPrep();
} else {
  print("I'm sorry, I didn't understand you, please run me again, and enunciate this time.", "red");
}

/*
function scobos() {
  const parts = toInt(userPrompt("How many of each part do you want to me?"));
  print("Ok, we're making " + parts + " parts.");
}

hoboPrep();
// scobos();


function scoboParts(partElement: string) {
  const page = visitUrl("clan_hobopolis.php?place=3&action=talkrichard&whichtalk=3");
  const skinsNum = 0;
  const bootsNum = 0;
  const eyesNum = 0;
  const gutsNum = 0;
  const skullsNum = 0;
  const crotchesNum = 0;
  const result = 0;

  switch (partElement) {
    case "physical":
      const matchSkins = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> hobo skin", page);
      if (find(matchSkins)) {
        skinsNum = toInt(group(matchSkins, 1));
      }
      result = skinsNum;
      break;
    case "hot":
      const matchBoots = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pairs? of charred hobo", page);
      if (find(matchBoots)) {
        bootsNum = toInt(group(matchBoots, 1));
      }
      result = bootsNum;
      break;
    case "cold":
      const matchEyes = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pairs? of frozen hobo", page);
      if (find(matchEyes)) {
        eyesNum = toInt(group(matchEyes, 1));
      }
      result = eyesNum;
      break;
    case "stinky":
      const matchGuts = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pile", page);
      if (find(matchGuts)) {
        gutsNum = toInt(group(matchGuts, 1));
      }
      result = gutsNum;
      break;
    case "spooky":
      const matchSkulls = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> creepy hobo skull", page);
      if (find(matchSkulls)) {
        skullsNum = toInt(group(matchSkulls, 1));
      }
      result = skullsNum;
      break;
    case "sleazy":
      const matchCrotches = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> hobo crotch", page);
      if (find(matchCrotches)) {
        crotchesNum = toInt(group(matchCrotches, 1));
      }
      result = crotchesNum;
      break;
  }

  return result;
}

function main(scobos: number, skins: boolean) {
  print(scobos + " scobos coming right up!", "green");
  if (myFamiliar() !== $familiar`stooper`) {
    useFamiliar($familiar`red-nosed snapper`);
    if ((getProperty("redSnapperPhylum") !== "hobo")) {
      print("your snapper is sniffing the wrong thing", "red");
      abort();
    }
  }
  useSkill(((scobos / 2) + 1), $skill`carol of the hells`);
  setAutoAttack("gnat extract mortar weak");
  equip($slot`weapon`, $item`staff of simmering hatred`);
  useSkill(1, $skill`spirit of cayenne`);
  chatClan("Making up to " + scobos + " boots.", "hobopolis");
  while (scoboParts("hot") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of peppermint`);
  chatClan("Making up to " + scobos + " eyes.", "hobopolis");
  while (scoboParts("cold") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of garlic`);
  chatClan("Making up to " + scobos + " guts.", "hobopolis");
  while (scoboParts("stinky") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of wormwood`);
  chatClan("Making up to " + scobos + " skulls.", "hobopolis");
  while (scoboParts("spooky") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of bacon grease`);
  chatClan("Making up to " + scobos + " crotches.", "hobopolis");
  while (scoboParts("sleazy") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  setAutoAttack(0);
  useSkill(1, $skill`spirit of nothing`);
  if (skins === true) {
    setAutoAttack("hoboskins");
    useSkill(((scobos / 10) + 1), $skill`carol of the bulls`);
    useSkill(((scobos / 10) + 1), $skill`song of the north`);
    equip($slot`weapon`, $item`fourth of may cosplay saber`);
    equip($slot`acc2`, $item`wormwood wedding ring`);
    chatClan("Making up to " + scobos + " skins.", "hobopolis");
    while (scoboParts("physical") < scobos) {
      adventure(1, $location`hobopolis town square`);
    }
    // adventure(scobos, $location[hobopolis town square]);
    setAutoAttack(0);
  }
} */
