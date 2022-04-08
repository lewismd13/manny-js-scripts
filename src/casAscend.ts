import { adv1 } from "kolmafia";
import { $class, $item, $location, ascend, get, Lifestyle, Paths, prepareAscension } from "libram";
import { setChoice } from "./lib";

prepareAscension({
  workshed: "Asdon Martin keyfob",
  garden: "packet of thanksgarden seeds",
  eudora: "New-You Club Membership Form",
  chateau: {
    desk: "Swiss piggy bank",
    ceiling: "ceiling fan",
    nightstand: "electric muscle stimulator",
  },
});

ascend(
  Paths.Unrestricted,
  $class`Seal Clubber`,
  Lifestyle.casual,
  "knoll",
  $item`astral six-pack`,
  $item`astral statuette`
);

if (get("_questPartyFairQuest") === "") {
  setChoice(1322, 6); // Leave
  adv1($location`The Neverending Party`, -1, "");
}

if (get("_questPartyFairQuest") === "food" || get("_questPartyFairQuest") === "booze") {
  setChoice(1322, 1); // accept
  adv1($location`The Neverending Party`, -1, "");
}
