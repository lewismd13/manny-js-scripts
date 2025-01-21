import { Skill, getPermedSkills, retrieveItem, use } from "kolmafia";
import { $item, Lifestyle, have, prepareAscension } from "libram";
import { randomPrank, randomSafari } from "./lib";

randomPrank();
randomSafari();

export function createPermOptions(): { permSkills: Map<Skill, Lifestyle>; neverAbort: boolean } {
  return {
    permSkills: new Map(
      Skill.all()
        .filter(
          (skill) => have(skill) && skill.permable && getPermedSkills()[skill.name] === undefined
        )
        .map((skill) => [skill, Lifestyle.hardcore])
    ),
    neverAbort: false,
  };
}

const legends = [$item`Deep Dish of Legend`, $item`Calzone of Legend`, $item`Pizza of Legend`];

for (const item of legends) {
  if (!have(item)) retrieveItem(item);
}

prepareAscension({
  garden: "packet of rock seeds",
  eudora: "Our Daily Candles™ order form",
  chateau: {
    desk: "Swiss piggy bank",
    ceiling: "ceiling fan",
    nightstand: "bowl of potpourri",
  },
});
/*
ascend(
  // eslint-disable-next-line libram/verify-constants
  $path`A Shrunken Adventurer Am I`,
  $class`Seal Clubber`,
  Lifestyle.normal,
  "mongoose",
  $item`astral six-pack`,
  $item`astral pet sweater`,
  createPermOptions()
);
*/
if (have($item`astral six-pack`)) use($item`astral six-pack`);
