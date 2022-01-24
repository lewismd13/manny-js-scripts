import {
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
  myMeat,
  myMp,
  mySpleenUse,
  outfit,
  print,
  putShop,
  runChoice,
  setAutoAttack,
  totalTurnsPlayed,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
  visitUrl
} from "kolmafia";
import { $effect, $familiar, $item, $location, $skill, get, have, Macro } from "libram";

if (myInebriety() > inebrietyLimit()) {
  print("You're drunk, I think you ran this already.");
  cliExecute("exit");
}

const starttime = gametimeToInt();
const startmeat = myMeat();

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

outfit("farming");

if (!have($effect`Meet the Meat`) && !get("_clanFortuneBuffUsed")) cliExecute("fortune buff meat");

if (!get("concertVisited")) cliExecute("concert winklered");

if (get("_poolGames") === 0) cliExecute("pool aggressive, aggressive, aggressive");

while (haveEffect($effect`How to Scam Tourists`) < 1000) use(5, $item`How to Avoid Scams`);

Macro.trySkill($skill`Bowl Straight Up`)
  .trySkill($skill`Furious Wallop`)
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

if (myAdventures() > 60) cliExecute("adventure -50 barf mountain");

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
autosell(itemAmount($item`cheap sunglasses`), $item`cheap sunglasses`); // autosells all cheap sunglasses
autosell(itemAmount($item`expensive camera`), $item`expensive camera`); // autosells all expensive cameras
autosell(itemAmount($item`filthy child leash`), $item`filthy child leash`); // autosells all filthy child leashes
autosell(itemAmount($item`bag of gross foreign snacks`), $item`bag of gross foreign snacks`); // autosells all bags of gross foreign snacks

while (myMp() > 1100) {
  if (haveEffect($effect`Leash of Linguini`) < 20000) useSkill($skill`Leash of Linguini`, 10);
  if (haveEffect($effect`Disco Leer`) < 20000) useSkill($skill`Disco Leer`, 10);
}

const extroPrice = 43000 + Math.round(Math.random() * 2000);
putShop(extroPrice, 2, itemAmount($item`Extrovermectin™`), $item`Extrovermectin™`);

print(
  `Today's lazy farming session took ${
    (gametimeToInt() - starttime) / 60000
  } minutes to run and earned ${myMeat() - startmeat} meat.`,
  "green"
);

if (haveEffect($effect`Empathy`) < 300) userConfirm("You're almost out of empathy", 600000, true);
if (haveEffect($effect`Polka of Plenty`) < 300)
  userConfirm("You're almost out of polka", 600000, true);
if (haveEffect($effect`Fat Leon's Phat Loot Lyric`) < 300)
  userConfirm("You're almost out of phat loot", 600000, true);
