import {
  batchClose,
  batchOpen,
  cliExecute,
  gametimeToInt,
  print,
  putShop,
  repriceShop,
  retrieveItem,
  use,
} from "kolmafia";
import { $item } from "libram";

let starttime;
let endtime;
const duffoItem = [
  $item`Doc Clock's thyme cocktail`,
  $item`bottle of Greedy Dog`,
  $item`very fancy whiskey`,
];
// const duffoItem = [$item`bottle of whiskey`, $item`bottle of rum`];
// const duffoItem = [$item`quantum taco`, $item`ghost pepper`];
try {
  for (const duffoseed of duffoItem) {
    retrieveItem(duffoseed, 1005);
    putShop(0, 0, 1005, duffoseed);
  }
  starttime = gametimeToInt();
  batchOpen();
  for (const duffoseed of duffoItem) {
    repriceShop(420, duffoseed);
  }
  batchClose();
  use($item`unremarkable duffel bag`, 11);
} finally {
  batchOpen();
  for (const duffoseed of duffoItem) {
    repriceShop(999999999, duffoseed);
  }
  batchClose();
  endtime = gametimeToInt();
  for (const duffoseed of duffoItem) {
    cliExecute(`shop take all ${duffoseed.name}`);
  }
}

print(`Items were in the mall at low price for ${(endtime - starttime) / 1000} seconds`, "orange");
