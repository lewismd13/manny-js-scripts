import {
  $effect,
  $familiar,
  $item,
  $location,
  $skill,
  AsdonMartin,
  Clan,
  get,
  have,
  Macro,
  SourceTerminal,
} from "libram";

import {
  adv1,
  availableAmount,
  buy,
  canInteract,
  cliExecute,
  closetAmount,
  containsText,
  equip,
  getWorkshed,
  haveEffect,
  itemAmount,
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

print("I really hope this works!", "blue");

cliExecute("pull * magical sausage");
cliExecute("pull * bottle of gin");
cliExecute("pull * perfect ice cube");
cliExecute("pull * Asdon Martin keyfob");
cliExecute("pull * bag of park garbage");
cliExecute("pull * borrowed time");
cliExecute("pull * brick");
cliExecute("pull * Clara's bell");
cliExecute("pull * fishy pipe");
cliExecute("pull * Freddy Kruegerand");
cliExecute("pull * heat-resistant sheet metal");
cliExecute("pull * magical sausage casing");
cliExecute("pull * mime army shotglass");
cliExecute("pull * packet of tall grass seeds");
cliExecute("pull * packet of thanksgarden seeds");
cliExecute("pull * packet of winter seeds");
cliExecute("pull * Poke gro fertilizer");
cliExecute("pull * School of Hard Knocks Diploma");
cliExecute("pull * Source essence");
cliExecute("pull * Special Seasoning");
cliExecute("pull * sprinkles");
cliExecute("pull * subscription cocoa dispenser");
cliExecute("pull * glitch season reward name");
cliExecute("pull * bauxite beret");
cliExecute("pull * dreadful fedora");
cliExecute("pull * hemlock helm");
cliExecute("pull * papier-mitre");
cliExecute("pull * smooth velvet hat");
cliExecute("pull * The Crown of Ed the Undying");
cliExecute("pull * high-temperature mining drill");
cliExecute("pull * plexiglass pikestaff");
cliExecute("pull * Staff of Simmering Hatred");
cliExecute("pull * Drunkula's wineglass");
cliExecute("pull * hobo code binder");
cliExecute("pull * bauxite boxers");
cliExecute("pull * psychic's pslacks");
cliExecute("pull * smooth velvet pants");
cliExecute("pull * bauxite bow-tie");
cliExecute("pull * Crimbolex watch");
cliExecute("pull * gold skull ring");
cliExecute("pull * lucky gold ring");
cliExecute("pull * mafia pinky ring");
cliExecute("pull * mafia pointer finger ring");
cliExecute("pull * mafia thumb ring");
cliExecute("pull * Mr. Cheeng's spectacles");
cliExecute("pull * offensive moustache");
cliExecute("pull * smooth velvet hanky");
cliExecute("pull * smooth velvet pocket square");
cliExecute("pull * smooth velvet socks");
cliExecute("pull * li'l unicorn costume");
cliExecute("pull * Pocket Professor memory chip");
cliExecute("pull * magical mystery juice");
cliExecute("pull * New Age healing crystal");
cliExecute("pull * lucky cat's paw");
cliExecute("pull * magical mystery juice");
cliExecute("pull * toggle switch (bartend)");
cliExecute("pull * toggle switch (bounce)");
cliExecute("pull 1 etched hourglass");
cliExecute("pull 1 wormwood wedding ring");
cliExecute("pull 1 potato alarm clock");
cliExecute("pull 1000000 meat");
cliExecute("pull * lov enamorang");
cliExecute("pull * lov extraterrestrial chocolate");
cliExecute("pull * sugar chapeau");
cliExecute("pull * sugar shank");
cliExecute("pull * sugar shotgun");
cliExecute("pull * fudgie roll");
cliExecute("pull * sugar shillelagh");
cliExecute("pull * sugar shield");
cliExecute("pull * sugar shorts");
cliExecute("pull * sugar shirt");
cliExecute("pull 1 very fancy whiskey");
cliExecute("pull 1 cold medicine cabinet");
cliExecute("pull * louder than bomb");

// cliExecute("pull all");

cliExecute("refresh all");

setProperty("autoSatisfyWithNPCs", "true");
buy(1, $item`Queue Du Coq cocktailcrafting kit`);
use(1, $item`Queue Du Coq cocktailcrafting kit`);

cliExecute("ccs libramMacro");

if (!have($item`Desert Bus pass`) || !have($item`bitchin' meatcar`))
  retrieveItem($item`Desert Bus pass`);

// cheesefax fortune, no longer doing this in loop
if (get("_clanFortuneConsultUses") < 3) {
  Clan.join("Bonus Adventures from Hell");
  while (get("_clanFortuneConsultUses") < 3) {
    cliExecute("fortune cheesefax");
    cliExecute("wait 5");
  }
  Clan.join("Alliance from Hell");
}

if (get("_clipartSummons") === 0) {
  cliExecute("create 3 box of familiar jacks");
}

cliExecute("make 23 magical sausage");

if (get("_etchedHourglassUsed") === false) {
  use($item`etched hourglass`);
}

use(1, $item`packet of tall grass seeds`);

if (getWorkshed() !== workshed) {
  use(1, workshed);
}
if (have($item`Little Geneticist DNA-Splicing Lab`))
  putStash(1, $item`Little Geneticist DNA-Splicing Lab`);

if (!get("_workshedItemUsed") && getWorkshed() === $item`Asdon Martin keyfob`) {
  AsdonMartin.drive($effect`Driving Observantly`, 1100);
  use($item`cold medicine cabinet`);
}

if (have($item`Thwaitgold termite statuette`)) putDisplay(1, $item`Thwaitgold termite statuette`);

if (haveEffect($effect`Feeling Lost`) !== 0) {
  cliExecute("uneffect feeling lost");
}

visitUrl("peevpee.php?action=smashstone&confirm=on");
print("Stone smashed. Get your PVP on!", "green");

if (availableAmount($item`blood-drive sticker`) > 10) {
  putShop(0, 0, 1, $item`blood-drive sticker`);
}
putShop(0, 0, 1, $item`vintage smart drink`);
// putShop(0, 0, 1, $item`emergency margarita`);
// putShop(0, 0, 1, $item`bag of grain`);
// put_shop(0, 0, 1, $item[squeaky toy rose]);
putShop(49995, 0, 3, $item`pocket wish`);

SourceTerminal.enquiry($effect`familiar.enq`);

// cliExecute("terminal enquiry familiar.enq");

if (!get("lockPicked")) {
  setChoice(1414, 1);
  useSkill(1, $skill`Lock Picking`);
  cliExecute("create 1 boris's key lime pie");
  putShop(0, 0, $item`Boris's key lime pie`);
}

// cliExecute("cheat ancestral recall");
// cli_execute("cheat island");
// cli_execute("cheat gift card");

cliExecute("briefcase collect");

if (get("_timeSpinnerFoodAvailable")) cliExecute("farfuture gin");

while (get("_sourceTerminalExtrudes") < 3 && itemAmount($item`Source essence`) > 10) {
  // cliExecute("terminal extrude booze");
  SourceTerminal.extrude($item`hacked gibson`);
}

SourceTerminal.educate($skill`Extract`);

while (get("_clipartSummons") < 3) {
  cliExecute("create 1 box of familiar jacks");
}

// dupe a greedy dog
const dupeTarget = $item`very fancy whiskey`;
if (itemAmount(dupeTarget) === 0 && closetAmount(dupeTarget) > 0) takeCloset(1, dupeTarget);
if (get("encountersUntilDMTChoice") === 0 && availableAmount(dupeTarget) > 0) {
  useFamiliar($familiar`Machine Elf`);
  setChoice(1119, 4);
  // setProperty("choiceAdventure1119", "4");
  setProperty("choiceAdventure1125", `1&iid=${toInt(dupeTarget)}`);
  adv1($location`The Deep Machine Tunnels`, -1, "");
  putShop(0, 0, 1, dupeTarget);
  putCloset(1, dupeTarget);
} else {
  print(`Something went wrong duping a ${dupeTarget.name}`, "red");
}

if (have($effect`Spirit of Cayenne`)) useSkill($skill`Spirit of Nothing`);

retrieveItem(20, $item`heat-resistant sheet metal`);
// setAutoAttack("gnat extract mortar weak");
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

if (get("_unaccompaniedMinerUsed") === 0) {
  cliExecute("minevolcano 5");
}
/*
if (get("csServicesPerformed") !== "" && get("questL13Final") === "finished") {
  setProperty("questL13Final", "unstarted");
}
*/
cliExecute("ccs default");
cliExecute("breakfast");

putShop(0, 0, itemAmount($item`battery (AAA)`), $item`battery (AAA)`);

if (get("_questPartyFairQuest") === "booze") {
  print("hey try that vanduffel cheese", "green");
}

inboxCleanup();
