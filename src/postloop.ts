import {
  adv1,
  availableAmount,
  buy,
  canInteract,
  cliExecute,
  closetAmount,
  containsText,
  drinksilent,
  eatsilent,
  equip,
  getWorkshed,
  haveEffect,
  itemAmount,
  myFullness,
  myGardenType,
  myInebriety,
  outfit,
  print,
  putCloset,
  putDisplay,
  putShop,
  putStash,
  retrieveItem,
  runChoice,
  setAutoAttack,
  setProperty,
  takeCloset,
  takeStorage,
  toInt,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $location,
  $skill,
  AsdonMartin,
  Clan,
  Macro,
  SongBoom,
  SourceTerminal,
  get,
  have,
} from "libram";
import { bafhWls } from "./bafh";
import { inboxCleanup, mannyQuestVolcoino, setChoice } from "./lib";

// TODO: put some stuff under an if statement that checks csServicesPerformed to make it more general
// TODO: pull the shit I assume is already pulled from CS. ie a bunch of unrestricted iotms

const workshed = $item`Asdon Martin keyfob`;

//Get Free Volcoino
function getVolcoino() {
  if (get("_infernoDiscoVisited") === true) return;
  print("Attempting to rock Disco Style...");
  if (outfit("Velvet")) {
    visitUrl("place.php?whichplace=airport_hot&action=airport4_zone1");
    runChoice(7);
  } else print("Failed to claim Volcoino.", "red");
}

function getFunFunds() {
  if (get("_dinseyGarbageDisposed") === true) return;
  print("Attempting to turn in garbage...");
  if (itemAmount($item`bag of park garbage`) < 1) {
    if (canInteract()) {
      buy(1, $item`bag of park garbage`);
    } else {
      takeStorage(1, $item`bag of park garbage`);
    }
  }
  if (itemAmount($item`bag of park garbage`) >= 1) {
    visitUrl("place.php?whichplace=airport_stench&action=airport3_tunnels");
    runChoice(6);
  } else print("Failed to claim FunFunds.", "red");
}

cliExecute("pull all");

cliExecute("refresh all");

setProperty("autoSatisfyWithNPCs", "true");
setProperty("hpAutoRecovery", "0.7");
setProperty("hpAutoRecoveryTarget", "0.95");
setProperty("mpAutoRecovery", "0.1");
setProperty("mpAutoRecoveryTarget", "0.3");
if (get("logPreferenceChange")) setProperty("logPreferenceChange", "false");
buy(1, $item`Queue Du Coq cocktailcrafting kit`);
use(1, $item`Queue Du Coq cocktailcrafting kit`);
if (SongBoom.song() !== "Food Vibrations") SongBoom.setSong("Food Vibrations");
if (!get("backupCameraReverserEnabled")) cliExecute("backupcamera reverser on");

cliExecute("ccs libramMacro");

retrieveItem($item`bitchin' meatcar`);

// cheesefax fortune, no longer doing this in loop
if (get("_clanFortuneConsultUses") < 3) {
  Clan.join("Bonus Adventures from Hell");
  let i = 0;
  while (get("_clanFortuneConsultUses") < 3 && i < 10) {
    i++;
    cliExecute("fortune cheesefax");
    cliExecute("wait 5");
  }
  Clan.join("Alliance from Hell");
}

if (get("_clipartSummons") === 0) {
  cliExecute("create 3 box of familiar jacks");
}

if (get("_etchedHourglassUsed") === false) {
  use($item`etched hourglass`);
}

if (myGardenType() !== "grass") use(1, $item`packet of tall grass seeds`);

if (getWorkshed() !== workshed) {
  use(1, workshed);
}
if (have($item`Little Geneticist DNA-Splicing Lab`))
  putStash(1, $item`Little Geneticist DNA-Splicing Lab`);

if (!get("_workshedItemUsed") && getWorkshed() === $item`Asdon Martin keyfob`) {
  AsdonMartin.drive($effect`Driving Observantly`, 1300);
  use($item`cold medicine cabinet`);
}

if (have($item`Thwaitgold termite statuette`)) putDisplay(1, $item`Thwaitgold termite statuette`);

if (haveEffect($effect`Feeling Lost`) !== 0) {
  cliExecute("uneffect feeling lost");
}

visitUrl("peevpee.php?action=smashstone&confirm=on");
print("Stone smashed. Get your PVP on!", "green");

SourceTerminal.enquiry($effect`familiar.enq`);

if (!get("lockPicked")) {
  setChoice(1414, 1);
  useSkill(1, $skill`Lock Picking`);
  cliExecute("create 1 boris's key lime pie");
}

while (get("_deckCardsDrawn") < 11) {
  if (!get("_deckCardsSeen").includes("Island")) {
    cliExecute("cheat island");
  } else if (!get("_deckCardsSeen").includes("Ancestral Recall")) {
    cliExecute("cheat ancestral recall");
  } else if (!get("_deckCardsSeen").includes("1952 Mickey Mantle")) {
    cliExecute("cheat 1952");
  }
}

cliExecute("briefcase collect");

if (!get("_detectiveCasesCompleted")) cliExecute("detective solver");

while (get("_sourceTerminalExtrudes") < 3 && itemAmount($item`Source essence`) > 10) {
  // cliExecute("terminal extrude booze");
  SourceTerminal.extrude($item`hacked gibson`);
}

SourceTerminal.educate($skill`Extract`);

while (get("_clipartSummons") < 3) {
  cliExecute("create 1 box of familiar jacks");
}

// dupe a thing

// eslint-disable-next-line libram/verify-constants
const dupeTarget = $item`cabooze`;
if (itemAmount(dupeTarget) === 0 && closetAmount(dupeTarget) > 0) takeCloset(1, dupeTarget);
if (get("encountersUntilDMTChoice") === 0 && availableAmount(dupeTarget) > 0) {
  useFamiliar($familiar`Machine Elf`);
  setChoice(1119, 4);
  setProperty("choiceAdventure1125", `1&iid=${toInt(dupeTarget)}`);
  adv1($location`The Deep Machine Tunnels`, -1, "");
  // putShop(0, 0, 1, dupeTarget);
  putCloset(1, dupeTarget);
} else {
  print(`Something went wrong duping a ${dupeTarget.name}`, "red");
}

if (have($effect`Spirit of Cayenne`)) useSkill($skill`Spirit of Nothing`);

retrieveItem(20, $item`heat-resistant sheet metal`);
Macro.trySkill($skill`Curse of Weaksauce`)
  .trySkill($skill`Stuffed Mortar Shell`)
  .trySkill($skill`Extract`)
  .skill($skill`Saucestorm`)
  .repeat()
  .setAutoAttack();
while (!containsText($location`The Bubblin' Caldera`.noncombatQueue, "Lava Dogs")) {
  useFamiliar($familiar`Mini-Hipster`);
  equip($item`Kramco Sausage-o-Matic™`);
  adv1($location`The Bubblin' Caldera`);
}
setAutoAttack(0);
if (have($effect`Drenched in Lava`)) cliExecute("soak");

getVolcoino();
getFunFunds();

mannyQuestVolcoino();

cliExecute("ccs default");
cliExecute("breakfast");

if (!get("moonTuned")) cliExecute("spoon platypus");

putShop(0, 0, itemAmount($item`battery (AAA)`), $item`battery (AAA)`);
putShop(49995, 0, 3, $item`pocket wish`);
if (have($item`superduperheated metal`)) putShop(0, 0, $item`superduperheated metal`);
if (availableAmount($item`blood-drive sticker`) > 10) {
  putShop(0, 0, 1, $item`blood-drive sticker`);
}
if (have($item`Boris's key lime pie`)) putShop(0, 0, $item`Boris's key lime pie`);

if (itemAmount($item`Doc Clock's thyme cocktail`) < 1)
  takeCloset(1, $item`Doc Clock's thyme cocktail`);

if (itemAmount($item`Mr. Burnsger`) < 1) takeCloset(1, $item`Mr. Burnsger`);
if (itemAmount($item`bottle of Greedy Dog`) < 1) takeCloset($item`bottle of Greedy Dog`);

if (myInebriety() === 3 && myFullness() === 0) {
  use($item`milk of magnesium`);
  eatsilent($item`Mr. Burnsger`);
  useSkill($skill`The Ode to Booze`);
  drinksilent($item`Doc Clock's thyme cocktail`);
  drinksilent($item`bottle of Greedy Dog`);
}

if (have($item`extra time`) && get("_extraTimeUsed") < 1) {
  use($item`extra time`);
}

inboxCleanup();

bafhWls();

if (get("_questPartyFair") === "unstarted" && get("_neverendingPartyFreeTurns") === 0) {
  setChoice(1322, 6); // Leave
  adv1($location`The Neverending Party`, -1, "");
  print(`Your NEP quest is ${get("_questPartyFairQuest")}`, "blue");
  if (get("_questPartyFairQuest") === "food" || get("_questPartyFairQuest") === "booze") {
    setChoice(1322, 1); // accept
    adv1($location`The Neverending Party`, -1, "");
  } else {
    setChoice(1322, 2); // decline
    adv1($location`The Neverending Party`, -1, "");
  }
}

if (get("_questPartyFairQuest") === "food") {
  print("Hey, go talk to Geraldine, time for another sliderpocalypse!", "yellow");
} else if (get("_questPartyFairQuest") === "booze") {
  print("Hey, go talk to Gerald, get that jarmageddon!", "yellow");
} else print(`Sorry, your NEP quest is ${get("_questPartyFairQuest")}.`);
