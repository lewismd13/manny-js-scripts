/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  adv1,
  autosell,
  availableAmount,
  availableChoiceOptions,
  bufferToFile,
  buy,
  buyUsingStorage,
  chatPrivate,
  cliExecute,
  create,
  eat,
  Effect,
  equip,
  familiarWeight,
  getClanName,
  getFuel,
  getProperty,
  handlingChoice,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  maximize,
  Monster,
  myAdventures,
  myFamiliar,
  myLocation,
  myMaxmp,
  myMp,
  print,
  pullsRemaining,
  putShop,
  retrieveItem,
  retrievePrice,
  runChoice,
  setAutoAttack,
  setProperty,
  shopAmount,
  Skill,
  storageAmount,
  takeShop,
  toEffect,
  toInt,
  toString as toStringAsh,
  totalTurnsPlayed,
  toUrl,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
  wait,
  weightAdjustment,
} from "kolmafia";
import {
  $effect,
  $effects,
  $familiar,
  $item,
  $items,
  $location,
  $monster,
  $skill,
  $slot,
  adventureMacro,
  CombatLoversLocket,
  get,
  have,
  Kmail,
  Macro,
} from "libram";

export function getPropertyInt(name: string) {
  const str = getProperty(name);
  if (str === "") {
    throw `Unknown property ${name}.`;
  }
  return toInt(str);
}

export function setPropertyInt(name: string, value: number) {
  setProperty(name, `${value}`);
}

export function incrementProperty(name: string) {
  setPropertyInt(name, getPropertyInt(name) + 1);
}

export function getPropertyBoolean(name: string) {
  const str = getProperty(name);
  if (str === "") {
    throw `Unknown property ${name}.`;
  }
  return str === "true";
}

export function setChoice(adv: number, choice: number) {
  setProperty(`choiceAdventure${adv}`, `${choice}`);
}

export function myFamiliarWeight() {
  return familiarWeight(myFamiliar()) + weightAdjustment();
}

export function ensureItem(quantity: number, it: Item) {
  if (availableAmount(it) < quantity) {
    buy(quantity - availableAmount(it), it);
  }
  if (availableAmount(it) < quantity) {
    throw `Could not buy ${quantity} of item ${it.name}: only ${availableAmount(it)}.`;
  }
}

export function ensureCreateItem(quantity: number, it: Item) {
  if (availableAmount(it) < quantity) {
    create(quantity - availableAmount(it), it);
  }
  if (availableAmount(it) < quantity) {
    throw "Could not create item.";
  }
}

export function ensureSewerItem(quantity: number, it: Item) {
  while (availableAmount(it) < quantity) {
    ensureItem(1, $item`chewing gum on a string`);
    use(1, $item`chewing gum on a string`);
  }
}

export function ensureHermitItem(quantity: number, it: Item) {
  if (availableAmount(it) >= quantity) {
    return;
  }
  const count = quantity - availableAmount(it);
  while (
    availableAmount($item`worthless trinket`) +
      availableAmount($item`worthless gewgaw`) +
      availableAmount($item`worthless knick-knack`) <
    count
  ) {
    ensureItem(1, $item`chewing gum on a string`);
    use(1, $item`chewing gum on a string`);
  }
  ensureItem(1, $item`hermit permit`);
  retrieveItem(count, it);
}

export function ensureNpcEffect(ef: Effect, quantity: number, potion: Item) {
  if (haveEffect(ef) === 0) {
    ensureItem(quantity, potion);
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensurePotionEffect(ef: Effect, potion: Item) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(potion) === 0) {
      create(1, potion);
    }
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureEffect(ef: Effect, turns = 1) {
  if (haveEffect(ef) < turns) {
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureMpTonic(mp: number) {
  while (myMp() < mp) {
    ensureItem(1, $item`Doc Galaktik's Invigorating Tonic`);
    use(1, $item`Doc Galaktik's Invigorating Tonic`);
  }
}

export function ensureMpSausage(mp: number) {
  while (myMp() < Math.min(mp, myMaxmp())) {
    ensureCreateItem(1, $item`magical sausage`);
    eat(1, $item`magical sausage`);
  }
}

export function sausageFightGuaranteed() {
  const goblinsFought = getPropertyInt("_sausageFights");
  const nextGuaranteed =
    getPropertyInt("_lastSausageMonsterTurn") +
    4 +
    goblinsFought * 3 +
    Math.max(0, goblinsFought - 5) ** 3;
  return goblinsFought === 0 || totalTurnsPlayed() >= nextGuaranteed;
}

export function itemPriority(...items: Item[]) {
  return items.find((item: Item) => availableAmount(item) > 0) ?? items[items.length - 1];
}

export function setClan(target: string) {
  if (getClanName() !== target) {
    const clanCache = JSON.parse(getProperty("hccs_clanCache") || "{}");
    if (clanCache.target === undefined) {
      const recruiter = visitUrl("clan_signup.php");
      const clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      let match;
      while ((match = clanRe.exec(recruiter)) !== null) {
        clanCache[match[2]] = match[1];
      }
    }
    setProperty("hccs_clanCache", JSON.stringify(clanCache));

    visitUrl(`showclan.php?whichclan=${clanCache[target]}&action=joinclan&confirm=on&pwd`);
    if (getClanName() !== target) {
      throw `failed to switch clans to ${target}. Did you spell it correctly? Are you whitelisted?`;
    }
  }
  return true;
}

export function ensureDough(goal: number) {
  while (availableAmount($item`wad of dough`) < goal) {
    buy(1, $item`all-purpose flower`);
    use(1, $item`all-purpose flower`);
  }
}

export function fuelAsdon(goal: number) {
  const startingFuel = getFuel();
  if (startingFuel > goal) return startingFuel;

  print(`Fueling asdon. Currently ${startingFuel} litres.`);
  const estimated = Math.floor((goal - startingFuel) / 5);
  const bread = availableAmount($item`loaf of soda bread`);
  ensureDough(estimated - bread);
  ensureItem(estimated - bread, $item`soda water`);
  ensureCreateItem(estimated, $item`loaf of soda bread`);
  cliExecute(`asdonmartin fuel ${estimated} loaf of soda bread`);
  while (getFuel() < goal) {
    ensureDough(1);
    ensureItem(1, $item`soda water`);
    ensureCreateItem(1, $item`loaf of soda bread`);
    cliExecute("asdonmartin fuel 1 loaf of soda bread");
  }
  const endingFuel = getFuel();
  print(`Done fueling. Now ${endingFuel} litres.`);
  return endingFuel;
}

export function ensureAsdonEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    fuelAsdon(37);
  }
  ensureEffect(ef);
}

export function mapMonster(location: Location, monster: Monster) {
  if (
    haveSkill($skill`Map the Monsters`) &&
    !getPropertyBoolean("mappingMonsters") &&
    getPropertyInt("_monstersMapped") < 3
  ) {
    useSkill($skill`Map the Monsters`);
  }

  if (!getPropertyBoolean("mappingMonsters")) throw "Failed to setup Map the Monsters.";

  const mapPage = visitUrl(toUrl(location), false, true);
  if (!mapPage.includes("Leading Yourself Right to Them")) throw "Something went wrong mapping.";

  const fightPage = visitUrl(
    `choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=${monster.id}`
  );
  if (!fightPage.includes("You're fighting") && myLocation() !== $location`The Haiku Dungeon`)
    throw "Something went wrong starting the fight.";
}

export function tryUse(quantity: number, it: Item) {
  if (availableAmount(it) > 0) {
    return use(quantity, it);
  } else {
    return false;
  }
}

export function tryEquip(it: Item) {
  if (availableAmount(it) > 0) {
    return equip(it);
  } else {
    return false;
  }
}

export function wishEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    cliExecute(`genie effect ${ef.name}`);
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function pullIfPossible(quantity: number, it: Item, maxPrice: number) {
  if (pullsRemaining() > 0) {
    const quantityPull = Math.max(0, quantity - availableAmount(it));
    if (shopAmount(it) > 0) {
      takeShop(Math.min(shopAmount(it), quantityPull), it);
    }
    if (storageAmount(it) < quantityPull) {
      buyUsingStorage(quantityPull - storageAmount(it), it, maxPrice);
    }
    cliExecute(`pull ${quantityPull} ${it.name}`);
    return true;
  } else return false;
}

export function ensurePullEffect(ef: Effect, it: Item) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(it) > 0 || pullIfPossible(1, it, 50000)) ensureEffect(ef);
  }
}

export function shrug(ef: Effect) {
  if (haveEffect(ef) > 0) {
    cliExecute(`shrug ${ef.name}`);
  }
}

// We have Stevedave's, Ur-Kel's on at all times during leveling (managed via mood); third and fourth slots are variable.
const songSlots = [
  $effects`Stevedave's Shanty of Superiority`,
  $effects`Ur-Kel's Aria of Annoyance`,
  $effects`Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction`,
  $effects`Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Fat Leon's Phat Loot Lyric, Polka of Plenty`,
];
const allKnownSongs = ([] as Effect[]).concat(...songSlots);
const allSongs = Skill.all()
  .filter(
    (skill) => toStringAsh(skill.class as unknown as string) === "Accordion Thief" && skill.buff
  )
  .map((skill) => toEffect(skill));
export function openSongSlot(song: Effect) {
  for (const songSlot of songSlots) {
    if (songSlot.includes(song)) {
      for (const shruggable of songSlot) {
        shrug(shruggable);
      }
    }
  }
  for (const badSong of allSongs) {
    if (!allKnownSongs.includes(badSong)) {
      shrug(badSong);
    }
  }
}

export function ensureSong(ef: Effect): void {
  if (haveEffect(ef) === 0) {
    openSongSlot(ef);
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureOde(turns: number): void {
  while (haveEffect($effect`Ode to Booze`) < turns) {
    ensureMpTonic(50);
    openSongSlot($effect`Ode to Booze`);
    useSkill(1, $skill`The Ode to Booze`);
  }
}

export function kill(): Macro {
  return Macro.trySkill($skill`Curse of Weaksauce`)
    .trySkill($skill`Micrometeorite`)
    .trySkill($skill`Sing Along`)
    .trySkill($skill`Stuffed Mortar Shell`)
    .trySkill($skill`Saucestorm`)
    .trySkillRepeat($skill`Saucegeyser`)
    .attack();
}

export function gingerBread(): void {
  // this is going to be all the gingerbread stuff, it is a work in progress
  cliExecute("ccs libramMacro");
  setAutoAttack(0);
  if (get("_gingerbreadCityTurns") === 0) {
    if (!get("_gingerbreadClockAdvanced")) {
      visitUrl("adventure.php?snarfblat=477");
      runChoice(1); // advance clock
    }
    if (get("_banderRunaways") < 5) {
      useFamiliar($familiar`Frumious Bandersnatch`);
      maximize("familiar weight", false);
      ensureEffect($effect`Blood Bond`);
      ensureEffect($effect`Leash of Linguini`);
      ensureEffect($effect`Empathy`);
      ensureOde(2);
      setChoice(1204, 1); // noon at the train station, get candies
      setChoice(1203, 4); // midnight at the civic center, buy cigarettes
      while (get("_gingerbreadCityTurns") < 5) {
        adventureMacro($location`Gingerbread Train Station`, Macro.step("runaway"));
      }
      while (get("_gingerbreadCityTurns") < 15) {
        adventureMacro($location`Gingerbread Civic Center`, Macro.step("runaway"));
      }
    }
  }
  cliExecute("ccs default");
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPrank(): void {
  const playerIDs: number[] = [
    1515124, 2548033, 2393910, 2705901, 892618, 1046951, 887028, 786069, 1197090, 437479, 2156370,
    1901297, 644996, 1956005, 1937905, 2766368, 2203016, 1972588, 3403404, 1729599, 2533291,
    1741165, 1993636, 2339258,
  ];

  for (let i = 0; i < 15; i++) {
    if (get("_timeSpinnerMinutesUsed") === 10 || myAdventures() === 0) {
      break;
    }
    // print("gonna prank " + playerIDs[getRandomInt(0, 18)]);
    cliExecute(`timespinner prank ${playerIDs[getRandomInt(0, 18)]}`);
  }
}

export function randomSafari() {
  const playerIDs: string[] = [
    "phreddrickkv2",
    "2548033",
    "Phillammon",
    "2705901",
    "ReverKiller",
    "beldur",
    "887028",
    "786069",
    "1197090",
    "437479",
    "playultm8",
    "busta_rhymes",
    "644996",
    "kenny kamAKAzi",
    "SSBBHax",
    "1937905",
    "2766368",
    "2203016",
    "1972588",
    "Butts McGruff",
    "burningbman",
    "2533291",
    "1741165",
    "1993636",
    "2339258",
    "DanceCommander6",
  ];

  while ($skill`Experience Safari`.timescast < get("skillLevel180")) {
    useSkill($skill`Experience Safari`, 1, playerIDs[getRandomInt(0, 19)]);
  }
}

export function mannyCleanup(): void {
  while (get("_sourceTerminalEnhanceUses") < 3) {
    cliExecute("terminal enhance meat.enh");
  }
  /*
  if (get("_claraBellUsed") === false && myAdventures() > 0) {
    use($item`Clara's bell`);
    setChoice(919, 1);
    do {
      adv1($location`Sloppy Seconds Diner`, -1, "");
    } while (get("lastEncounter") === "Nothing Could Be Finer");
  }
*/
  if (get("boomBoxSong") !== "Food Vibrations") {
    cliExecute("boombox food");
  }

  if (get("_freeBeachWalksUsed") < 11) {
    cliExecute("combbeach free");
  }

  autosell($item`cheap sunglasses`, itemAmount($item`cheap sunglasses`) - 1);
  autosell($item`filthy child leash`, itemAmount($item`filthy child leash`));
  use(itemAmount($item`bag of park garbage`) - 30, $item`bag of park garbage`);
  use(itemAmount($item`Gathered Meat-Clip`), $item`Gathered Meat-Clip`);
  use(itemAmount($item`old coin purse`), $item`old coin purse`);
  use(itemAmount($item`old leather wallet`), $item`old leather wallet`);
  autosell($item`expensive camera`, itemAmount($item`expensive camera`));
  autosell($item`bag of gross foreign snacks`, itemAmount($item`bag of gross foreign snacks`));
  putShop(200, 0, itemAmount($item`gold nuggets`), $item`gold nuggets`);
  putShop(0, 0, itemAmount($item`cornucopia`), $item`cornucopia`);
  putShop(8900, 0, itemAmount($item`abandoned candy`), $item`abandoned candy`);
  autosell($item`meat stack`, itemAmount($item`meat stack`));
  putShop(0, 0, itemAmount($item`11-leaf clover`), $item`11-leaf clover`);

  // check for a dggt if we haven't
  if (get("_defectiveTokenChecked") === false) {
    retrieveItem($item`Game Grid token`);
    visitUrl("place.php?whichplace=arcade&action=arcade_plumber");
  }

  const barrels = $items`little firkin, normal barrel, big tun, weathered barrel, dusty barrel, disintegrating barrel, moist barrel, rotting barrel, mouldering barrel, barnacled barrel`;

  barrels.forEach((barrel) => {
    if (itemAmount(barrel) > 0) {
      let page = visitUrl(`inv_use.php?pwd&whichitem=${toInt(barrel).toString()}&choice=1`);
      while (page.includes("Click a barrel to smash it!")) {
        page = visitUrl("choice.php?pwd&whichchoice=1101&option=2");
      }
    }
  });
}

export function nightcap() {
  cliExecute("CONSUME NIGHTCAP");
  /*
  if (myInebriety() === inebrietyLimit() && myFullness() === fullnessLimit()) {
    if (myFamiliar() !== $familiar`Stooper`) {
      useFamiliar($familiar`Stooper`);
      useSkill($skill`The Ode to Booze`, 1);
      if (availableAmount($item`astral pilsner`) > 0) {
        drinksilent($item`astral pilsner`);
      } else {
        drinksilent($item`splendid martini`);
      }
    }
    useSkill($skill`The Ode to Booze`, 1);
    if (haveEffect($effect`Ode to Booze`) < 10) useSkill($skill`The Ode to Booze`);
    retrieveItem($item`vintage smart drink`);
    drinksilent($item`vintage smart drink`);
  } else if (myInebriety() > inebrietyLimit() && myFullness() === fullnessLimit()) {
    print("you're all good in the hood");
  } else {
    throw "are you sure you want to overdrink? you have some open organ space";
    */
  // print("I hope you overdrank on purpose");
}

export function checkFax(): boolean {
  cliExecute("fax receive");
  if (get("photocopyMonster") === $monster`Knob Goblin Embezzler`) return true;
  cliExecute("fax send");
  return false;
}

export function faxEmbezzler(): void {
  if (!get("_photocopyUsed")) {
    if (checkFax()) return;
    chatPrivate("cheesefax", "Knob Goblin Embezzler");
    for (let i = 0; i < 3; i++) {
      wait(10);
      if (checkFax()) return;
    }
    throw "Failed to acquire photocopied Knob Goblin Embezzler.";
  }
}

export function mannyQuestVolcoino() {
  visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
  if (get("_volcanoItem2") === 8425) {
    retrieveItem(5, $item`New Age healing crystal`);
    visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
    runChoice(2);
  } else if (get("_volcanoItem3") === 8446) {
    retrieveItem(1, $item`SMOOCH bottlecap`);
    visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
    runChoice(3);
  } else if (get("_volcanoItem3") === 8517) {
    retrieveItem(3, $item`SMOOCH bracers`);
    visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
    runChoice(3);
  } else if (get("_volcanoItem1") === 8470) {
    retrieveItem(5, $item`gooey lava globs`);
    visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
    runChoice(1);
  } else if (get("_volcanoItem1") === 8516) {
    retrieveItem(3, $item`smooth velvet bra`);
    visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
    runChoice(1);
  } else if (get("_volcanoItem1") === 8523) {
    if (
      !get("_claraBellUsed") &&
      itemAmount($item`fused fuse`) === 0 &&
      get("_questPartyFairQuest") !== "food" &&
      get("_questPartyFairQuest") !== "booze"
    ) {
      use($item`Clara's bell`);
      setChoice(1091, 7);
      Macro.skill($skill`Saucestorm`)
        .repeat()
        .setAutoAttack();
      while (itemAmount($item`fused fuse`) === 0) {
        adv1($location`LavaCo™ Lamp Factory`, -1, "");
      }
      visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
      runChoice(1);
    } else if (!get("_freePillKeeperUsed")) {
      cliExecute("pillkeeper free noncombat");
      setChoice(1091, 7);
      Macro.skill($skill`Saucestorm`)
        .repeat()
        .setAutoAttack();
      while (itemAmount($item`fused fuse`) === 0) {
        adv1($location`LavaCo™ Lamp Factory`, -1, "");
      }
      visitUrl("place.php?whichplace=airport_hot&action=airport4_questhub");
      runChoice(1);
    } else {
      print("You need a fused fuse but can't force a NC for free. :(", "red");
    }
    setAutoAttack(0);
  }
}

export function inboxCleanup() {
  const inbox = Kmail.inbox();

  const skillBooks = [
    $item`How To Get Bigger Without Really Trying`,
    $item`Illustrated Mating Rituals of the Gallapagos`,
    $item`Convincing People You Can See The Future`,
    $item`Love Potions and the Wizards who Mix Them`,
    $item`They'll Love You In Rhinestones`,
    $item`Silly Little Love Song`,
  ];

  inbox.forEach((kmail) => {
    if (kmail.senderId === 3038166) {
      const items = kmail.items();
      items.forEach((quantity, item) => {
        if (skillBooks.includes(item)) {
          print("You got a skillbook!");
        } else {
          print(`tough luck, just a ${item}`);
          kmail.delete();
        }
      });
    } else if (kmail.senderName === "The Loathing Postal Service") {
      kmail.delete();
    }
  });
}
export function escapeChoice() {
  if (handlingChoice()) {
    runChoice(-1);
  }
}

export function abort(message: string) {
  print(message);
  bufferToFile(message, "wrapperresult.txt");
  throw `${message}`;
}

function getChoiceOption(partialText: string): number {
  if (handlingChoice()) {
    const findResults = Object.entries(availableChoiceOptions()).find(
      (value) => value[1].indexOf(partialText) > -1
    );
    if (findResults) {
      return parseInt(findResults[0]);
    }
  }
  return -1;
}

export function breakfastCounter(): void {
  visitUrl("place.php?whichplace=monorail&action=monorail_downtown");

  const breakfast = getChoiceOption("Visit the Breakfast Counter");
  if (breakfast > 0) {
    runChoice(breakfast);
    const blueberry = getChoiceOption("Order a blueberry muffin");
    if (!have($item`blueberry muffin`) && blueberry > 0) {
      runChoice(blueberry);
    }
    const leaveCounter = getChoiceOption("Back to the Platform!");
    if (leaveCounter > 0) {
      runChoice(leaveCounter);
    }
  }
  const leaveStation = getChoiceOption("Nevermind");
  if (leaveStation > 0) {
    runChoice(leaveStation);
  }
  if (handlingChoice()) {
    throw "Failed to leave the monorail station!!";
  }
}

export const robortPrices = new Map([
  [retrievePrice($item`Bloody Nora`), $monster`Black Crayon Fish`],
  [retrievePrice($item`Feliz Navidad`), $monster`Black Crayon Crimbo Elf`],
  [retrievePrice($item`single entendre`), $monster`Black Crayon Constellation`],
  [retrievePrice($item`drive-by shooting`), $monster`Black Crayon Penguin`],
]);

export function locketRobortDrop(): void {
  const bestMob = [...robortPrices.entries()].reduce((a, b) => (b[0] > a[0] ? b : a));
  if (CombatLoversLocket.availableLocketMonsters().includes(bestMob[1])) {
    useFamiliar($familiar`Robortender`);
    retrieveItem($item`toggle switch (Bartend)`);
    equip($item`toggle switch (Bartend)`);
    equip($slot`acc1`, $item`Mr. Cheeng's spectacles`);
    equip($slot`acc2`, $item`Mr. Screege's spectacles`);
    equip($slot`acc3`, $item`lucky gold ring`);
    equip($slot`weapon`, $item`garbage sticker`);
    retrieveItem($item`can of mixed everything`);
    equip($item`can of mixed everything`);
    Macro.skill($skill`Curse of Weaksauce`)
      .skill($skill`Saucegeyser`)
      .setAutoAttack();
    CombatLoversLocket.reminisce(bestMob[1]);
    setAutoAttack(0);
  }
}
