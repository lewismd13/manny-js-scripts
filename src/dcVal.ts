import { mallPrice, print, visitUrl } from "kolmafia";
import { getPlayerFromIdOrName } from "libram";

export function main(arg: string): void {
  const player = getPlayerFromIdOrName(arg).id;
  const page = visitUrl(`displaycollection.php?who=${player}`);
  const flattDatabase = new Map();
  const dcCheck = /(?:<td valign=center><b>(.*?)<\/td><\/tr>)/gm;
  let items;
  while ((items = dcCheck.exec(page)) !== null) {
    if (!items[1].includes("(")) {
      const cleanItem = items[1].slice(0, items[1].indexOf(`</b>`));
      if (!Item.get(cleanItem).tradeable) {
        print(`${cleanItem} is untradeable`);
      } else {
        // print(`${cleanItem}`);
        const value = mallPrice(Item.get(Item.get(cleanItem)));
        flattDatabase.set(cleanItem, [1, value]);
      }
    } else {
      // figure out how to deal with names with parentheses - this breaks currently
      const name = items[1].slice(0, items[1].indexOf("> (") - 3);
      // print(`${name}`);
      if (!Item.get(name).tradeable) {
        print(`${name} is untradeable`);
      } else {
        const q = items[1].slice(items[1].indexOf("(") + 1, items[1].indexOf(")"));
        const quantity = q.replace(/,/g, "");
        // print(`${quantity.replace(/,/g, "")}`);
        if (parseInt(quantity)) {
          const value = mallPrice(Item.get(name));
          //  print(`${parseInt(quantity.replace(/,/g, ""))}`);
          // print(`${value}`);
          flattDatabase.set(Item.get(name), [parseInt(quantity), value]);
        } else {
          // figure out how to deal with names with parentheses
          print(`stupid things ${items[1]}`);
        }
      }
    }
  }
  let totalValue = 0;
  for (const shiny of flattDatabase.keys()) {
    print(`Item: ${shiny}`);
    print(`Quantity: ${flattDatabase.get(shiny)[0]}`);
    const v = parseInt(flattDatabase.get(shiny)[1]);
    const q = parseInt(flattDatabase.get(shiny)[0]);
    const value = v * q;
    print(`Total Value: ${value}`);
    totalValue += value;
  }
  print(`That is a total of ${totalValue}`);
  // const saved = JSON.stringify(flattDatabase);
  // bufferToFile(saved, "dbvalue.txt");
}
