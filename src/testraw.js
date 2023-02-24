// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { $item, adventureMacroAuto, $location, Macro, $skill, Clan } = require("libram");
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { use, print } = require("kolmafia");

print(`hey let's use a bag of garbage`);
use($item`bag of park garbage`);
print(`good work!`);
print(`now let's go exploring!`);
adventureMacroAuto($location`The Haunted Pantry`, Macro.skill($skill`Saucestorm`).repeat());
print("Nice work!");
print("Time to go check out another clan");
Clan.join("Bonus Adventures From Hell");
print(`we're in ${Clan.name}`);
