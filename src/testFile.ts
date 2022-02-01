import { retrieveItem } from "kolmafia";
import { $item } from "libram";

const stasisItem = () => {
  if (retrieveItem($item`facsimile dictionary`)) {
    return $item`facsimile dictionary`;
  } else if (retrieveItem($item`dictionary`)) {
    return $item`dictionary`;
  } else return $item`seal tooth`;
};
