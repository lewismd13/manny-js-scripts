import { print } from "kolmafia";
import { SourceTerminal } from "libram";
import { isHybridized } from "libram/dist/resources/2014/DNALab";
import { $item, $phylum } from "libram/dist/template-string";

// /afhk; jsq
/*
if (stashAmount(Item.get("pantsgiving")) < 1 || stashAmount(Item.get("repaid diaper")) < 1) {
  const page = visitUrl("clan_log.php");
  const matcher = new RegExp(/(?:.*)(?:\d'>)(.*)(?: \(#)(?:.*)(?:took 1 Pantsgiving.)/);
  const culprit = page.match(matcher);
  const culpritString = culprit ? culprit[1].toString() : "";
  print(`Nope, looks like ${culpritString} has the Pantsgiving.`, `red`);
} else print("Good to go!", "green");
*/

SourceTerminal.extrude($item`hacked gibson`);
