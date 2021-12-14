import {
  abort,
  adv1,
  autosell,
  chew,
  cliExecute,
  drinksilent,
  eatsilent,
  equip,
  gametimeToInt,
  haveEffect,
  inebrietyLimit,
  itemAmount,
  maximize,
  myAdventures,
  myFullness,
  myInebriety,
  mySpleenUse,
  outfit,
  print,
  runChoice,
  setAutoAttack,
  totalTurnsPlayed,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
} from "kolmafia";
import { $effect, $familiar, $item, $location, $skill, get, have, Macro } from "libram";

if (myInebriety() > inebrietyLimit()) {
  print("You're drunk, I think you ran this already.");
  cliExecute("exit");
}

const starttime = gametimeToInt();

if (!get("breakfastCompleted")) cliExecute("breakfast");

// turn in garbage for funfunds
if (!get("_dinseyGarbageDisposed")) {
  visitUrl("place.php?whichplace=airport_stench&action=airport3_tunnels");
  visitUrl("choice.php?pwd=&whichchoice=1067&option=6", true);
  visitUrl("main.php");
}

if (myFullness() === 0) {
  if (!get("_milkOfMagnesiumUsed")) use($item`milk of magnesium`);
  eatsilent(2, $item`fleetwood mac 'n' cheese`);
  eatsilent(8, $item`jumping horseradish`);
}

if (myInebriety() === 0) {
  equip($item`tuxedo shirt`);
  while (haveEffect($effect`Ode to Booze`) < 20) useSkill($skill`The Ode to Booze`);
  drinksilent(2, $item`grogtini`);
  drinksilent($item`perfect negroni`);
  if (!get("_mimeArmyShotglassUsed")) drinksilent($item`elemental caipiroska`);
  drinksilent($item`elemental caipiroska`);
}

if (mySpleenUse() < 4 && have($item`coffee pixie stick`, 3)) chew(3, $item`coffee pixie stick`);

if (!have($item`amulet coin`)) {
  useFamiliar($familiar`Cornbeefadon`);
  use($item`box of Familiar Jacks`);
}

useFamiliar($familiar`Hobo Monkey`);
equip($item`amulet coin`);

outfit("DinseyFarming");

if (!have($effect`Meet the Meat`) && !get("_clanFortuneBuffUsed")) cliExecute("fortune buff meat");

if (!get("concertVisited")) cliExecute("concert winklered");

if (get("_poolGames") === 0) cliExecute("pool aggressive, aggressive, aggressive");

while (haveEffect($effect`How to Scam Tourists`) < 1000) use(5, $item`How to Avoid Scams`);

Macro.trySkill($skill`Furious Wallop`)
  .attack()
  .setAutoAttack();

// do barf turns until we've gotten all our extrovermectin
while (myAdventures() > 60 && get("_coldMedicineConsults") < 5) {
  adv1($location`Barf Mountain`, 1, "");
  if (get("_nextColdMedicineConsult") < totalTurnsPlayed()) {
    visitUrl("campground.php?action=workshed");
    runChoice(5);
  }
}

// we've got them all now so just blast through the rest
if (myAdventures() > 50) cliExecute("adventure -50 barf mountain");

setAutoAttack(0);

if (myAdventures() > 60) abort("You have too many adventures left");

// nightcap
if (myInebriety() === inebrietyLimit()) {
  useFamiliar($familiar`Stooper`);
  useSkill($skill`The Ode to Booze`);
  drinksilent($item`elemental caipiroska`);
  equip($item`tuxedo shirt`);
  drinksilent($item`grogtini`);
}

// PJs
useFamiliar($familiar`Disembodied Hand`);
maximize("adv", false);

// cleanup time
use($item`bag of park garbage`, itemAmount($item`bag of park garbage`) - 10);
autosell(itemAmount($item`cheap sunglasses`) - 2, $item`cheap sunglasses`); // autosells all but 2 cheap sunglasses
autosell(itemAmount($item`expensive camera`), $item`expensive camera`); // autosells all expensive cameras
autosell(itemAmount($item`filthy child leash`), $item`filthy child leash`); // autosells all filthy child leashes
autosell(itemAmount($item`bag of gross foreign snacks`), $item`bag of gross foreign snacks`); // autosells all bags of gross foreign snacks

print(
  `Today's lazy farming session took ${(gametimeToInt() - starttime) / 60000} minutes to run.`,
  "green"
);
