import {
  adv1,
  autosell,
  availableAmount,
  chew,
  cliExecute,
  drinksilent,
  eatsilent,
  equip,
  gametimeToInt,
  haveEffect,
  inebrietyLimit,
  itemAmount,
  mallPrice,
  maximize,
  myAdventures,
  myDaycount,
  myFullness,
  myInebriety,
  myMeat,
  myMp,
  mySpleenUse,
  outfit,
  print,
  putShop,
  retrieveItem,
  runChoice,
  setAutoAttack,
  totalTurnsPlayed,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $skill,
  Clan,
  get,
  have,
  Macro,
} from "libram";

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
  eatsilent(3, $item`fleetwood mac 'n' cheese`);
  eatsilent(1, $item`This Charming Flan`);
}

if (myInebriety() === 0) {
  equip($item`tuxedo shirt`);
  while (haveEffect($effect`Ode to Booze`) < 20) useSkill($skill`The Ode to Booze`);
  drinksilent(2, $item`grogtini`);
  drinksilent($item`perfect negroni`);
  if (!get("_mimeArmyShotglassUsed")) drinksilent($item`elemental caipiroska`);
  drinksilent($item`elemental caipiroska`);
}

// TODO: Maybe drink a lindy and fight a KGE for shotglass

if (mySpleenUse() < 4 && have($item`coffee pixie stick`, 3)) chew(3, $item`coffee pixie stick`);

if (!have($item`amulet coin`)) {
  useFamiliar($familiar`Cornbeefadon`);
  use($item`box of Familiar Jacks`);
}

useFamiliar($familiar`Hobo Monkey`);
equip($item`amulet coin`);

outfit("farming");

// afhobo doesn't have a loaded VIP room

Clan.join("Alliance From Heck");

if (!have($effect`Meet the Meat`) && !get("_clanFortuneBuffUsed")) cliExecute("fortune buff meat");

if (!get("concertVisited")) cliExecute("concert winklered");

if (get("_poolGames") === 0) cliExecute("pool aggressive, aggressive, aggressive");

Clan.join("Alliance From Hobopolis");

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
// on odd numbered days we comb the beach
const turnsToBurn = myAdventures() - 50;
if (myAdventures() > 50 && myDaycount() % 2 === 0) {
  cliExecute(`adventure ${Math.floor(turnsToBurn / 0.96)} barf mountain`);
} else if (myAdventures() > 50) {
  retrieveItem($item`piece of driftwood`);
  if (!have($item`driftwood beach comb`)) use($item`piece of driftwood`);
  cliExecute(`combo ${turnsToBurn + 11}`);
}

setAutoAttack(0);

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

const mallables = $items`sea lace, 11-leaf clover, bunch of sea grapes`;

for (const item of mallables) {
  putShop(mallPrice(item) - 10, 0, itemAmount(item), item);
}

const autosellables = $items`cheap sunglasses, expensive camera, filthy child leash, bag of gross foreign snacks, driftwood bracelet, driftwood pants, driftwood hat, sea avocado, sea cucumber, sea carrot, kelp, taco shell, magenta seashell, cyan seashell, gray seashell, green seashell, yellow seashell`;

for (const item of autosellables) {
  autosell(itemAmount(item), item);
}

while (myMp() > 1100 && haveEffect($effect`Leash of Linguini`) < 20000) {
  useSkill($skill`Leash of Linguini`, 10);
}

while (myMp() > 1100 && haveEffect($effect`Disco Leer`) < 20000) {
  useSkill($skill`Disco Leer`, 10);
}

const extroPrice = mallPrice($item`Extrovermectin™`) - Math.round(Math.random() * 500);
putShop(extroPrice, 2, itemAmount($item`Extrovermectin™`), $item`Extrovermectin™`);

if (haveEffect($effect`Empathy`) < 300) userConfirm("You're almost out of empathy", 600000, true);
if (haveEffect($effect`Polka of Plenty`) < 300)
  userConfirm("You're almost out of polka", 600000, true);
if (haveEffect($effect`Fat Leon's Phat Loot Lyric`) < 300)
  userConfirm("You're almost out of phat loot", 600000, true);

print(
  `Today's lazy farming session took ${
    (gametimeToInt() - starttime) / 60000
  } minutes to run and earned ${myMeat() - startmeat} meat. Plus another ${
    extroPrice * 5
  } meat from selling extros`,
  "green"
);

if (have($item`meteorite fragment`)) {
  userConfirm("Holy shit a fragment!", 600000, true);
}

if (
  have($item`cursed tricorn hat`) ||
  have($item`cursed swash buckle`) ||
  availableAmount($item`cursed pirate cutlass`) > 1
)
  userConfirm("Holy shit a cursed pirate item!", 600000, true);

if (myMeat() - startmeat > 10000000 && have($item`driftwood beach comb`))
  userConfirm("I uh, think you found a whale", 600000, true);
