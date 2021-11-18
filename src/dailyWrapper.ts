/*
--set timer
1-mafia breakfast*
2-breakfast script*
3-synth with untradeables
4-CONSUME ALL (buy melange first)*
5-garbo ascend*
6-CONSUME NIGHTCAP*
7-garbo ascend*
8-hccsPre*
9-hccsAscend*
10-mannyLoop*
11-postloop*
12-buy melange
13-synth with untradeables
13a-drink astral pils?
14-CONSUME ALL
15-garbo
16-mannyRoll (check the nightcap code)
--print time
*/

import {
  availableAmount,
  bufferToFile,
  buy,
  cliExecute,
  drinksilent,
  fullnessLimit,
  inebrietyLimit,
  myAdventures,
  myDaycount,
  myFullness,
  myInebriety,
  myPath,
  useSkill,
} from "kolmafia";
import { $item, $skill, Clan, get } from "libram";
import { escapeChoice } from "./lib";
/*
function garboCheck(): boolean {
  if (
    stashAmount($item`Pantsgiving`) < 1 ||
    stashAmount($item`repaid diaper`) < 1 ||
    stashAmount($item`haiku katana`) < 1
  ) {
    return false;
  } else return true;
}
*/
// breakfast
if (myDaycount() > 1 && myInebriety() < 1) {
  Clan.join("Alliance From Hell");

  // theoretically we do this on login, but just in case
  if (get("breakfastCompleted") === false) {
    cliExecute("breakfast");
  }
  cliExecute("mannyBreakfast");
  escapeChoice();
}

if (get("_volcanoItemRedeemed") === false && get("_volcanoItem1") !== 0) {
  throw "Something went wrong in the breakfast script";
}

// diet time - this is likely to change as knapsack becomes a thing
if (myInebriety() === 0 && myFullness() === 0) {
  // buy a melange because of mafia price limit
  if (availableAmount($item`spice melange`) < 1) {
    buy($item`spice melange`, 1, 300000);
  }
  // TODO: shotglass an astral pils if we have one
  cliExecute("CONSUME ALL");
}

// check if we successfully ate/drank and then run garbo
if (myInebriety() !== inebrietyLimit() || myFullness() !== fullnessLimit()) {
  throw "Something went wrong with diet";
} else if (myAdventures() > 0) {
  cliExecute("garbo ascend");
  escapeChoice();
}

// if garbo is done running, time to nightcap and run it again

if (myAdventures() > 0) {
  throw "Looks like garbo broke";
} else {
  cliExecute("CONSUME NIGHTCAP");
  if (myInebriety() > inebrietyLimit()) {
    cliExecute("combbeach free");
    cliExecute("garbo ascend");
    escapeChoice();
  } else {
    throw "Something went wrong nightcapping";
  }
}

// now we get ready to loop
if (myInebriety() > inebrietyLimit() && myAdventures() === 0) {
  cliExecute("hccsPre");
  cliExecute("hccsAscend");
} else throw "You either failed to nightcap or still have turns left";

// Check that we made it into CS and then run the loop script
if (myPath() === "Community Service") {
  cliExecute("mannyLoop");
  escapeChoice();
} else throw "You should be in CS and you're not";

// Now we should be done looping, so run the postloop and mafia breakfast
if (myPath() === "None" && myDaycount() === 1) {
  cliExecute("postloop");
  escapeChoice();
} else throw "Something went wrong and you didn't finish the loop";

// if we are in casual and done with breakfast, time to do diet
if (myPath() === "None" && get("breakfastCompleted")) {
  // buy a melange because of mafia price limit
  if (availableAmount($item`spice melange`) < 1) {
    buy($item`spice melange`, 1, 300000);
  }
  if (availableAmount($item`astral pilsner`) > 0 && get("_mimeArmyShotglassUsed") === false) {
    useSkill($skill`The Ode to Booze`);
    drinksilent($item`astral pilsner`);
  }
  // TODO: shotglass an astral pils if we have one
  cliExecute("CONSUME ALL");
} else throw "Something went wrong with postloop";

// check if we successfully ate/drank and then run garbo
if (myInebriety() !== inebrietyLimit() || myFullness() !== fullnessLimit()) {
  throw "Something went wrong with diet";
} else if (myAdventures() > 0) {
  cliExecute("garbo ascend");
  escapeChoice();
}

if (myAdventures() !== 0) {
  throw "garbo doesn't seem to have finished properly";
} else {
  cliExecute("UberPVPOptimizer; pvp loot freshest");
  cliExecute("mannyRoll");
}

if (myDaycount() === 1 && myInebriety() > inebrietyLimit() && myAdventures() < 100) {
  bufferToFile("Success!", "wrapperresult.txt");
} else {
  bufferToFile("Something went wrong.", "wrapperresult.txt");
}

cliExecute("exit");
