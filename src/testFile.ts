import {
  batchClose,
  batchOpen,
  print,
  putShop,
  repriceShop,
  retrieveItem,
  shopPrice,
} from "kolmafia";
import { $item } from "libram";

const duffoItem = [$item`Source essence`, $item`bottle of gin`];

for (const duffoseed of duffoItem) {
  retrieveItem(duffoseed, 520);
  putShop(0, 0, 520, duffoseed);
}
print(`${shopPrice($item`Source essence`)}`);
print(`${shopPrice($item`bottle of gin`)}`);
batchOpen();
for (const duffoseed of duffoItem) {
  repriceShop(402, duffoseed);
}
batchClose();
print(`${shopPrice($item`Source essence`)}`);
print(`${shopPrice($item`bottle of gin`)}`);
batchOpen();
for (const duffoseed of duffoItem) {
  repriceShop(999999999, duffoseed);
}
batchClose();
print(`${shopPrice($item`Source essence`)}`);
print(`${shopPrice($item`bottle of gin`)}`);
