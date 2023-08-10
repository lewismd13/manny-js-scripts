import { Item, getStash, print, takeStash, toItem } from "kolmafia";
import { $item } from "libram";

const stashcontents = getStash();

const mappedcontents = new Map<Item, number>();

const skippeditems = [$item`dense meat stack`, $item`folder (KOLHS)`, $item`Chroner trigger`];

for (const stashitem in stashcontents) {
  const itemizeditem = toItem(stashitem);
  const itemquantity = stashcontents[stashitem];

  print(`The stash contains ${itemquantity} ${itemizeditem.name}`);
  mappedcontents.set(itemizeditem, itemquantity);
}

mappedcontents.forEach((value, key) => {
  if (!skippeditems.includes(key)) {
    print(`${value}`);
    print(`${key}`);
    takeStash(key, value);
  }
});

print(`There are ${mappedcontents.size} distinct items in the stash`);
