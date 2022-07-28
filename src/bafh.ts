import { setProperty } from "kolmafia";
import { Clan, Kmail } from "libram";

export function bafhWls(): void {
  Clan.join("Bonus Adventures from Hell");

  const bafh = Clan.get();

  const inbox = Kmail.inbox();

  inbox.forEach((kmail) => {
    if (kmail.message.includes("whitelist bafh")) {
      bafh.addPlayerToWhitelist(kmail.senderId);

      kmail.delete();
    }
  });

  setProperty("_bafhWlsDone", "1");

  Clan.join("Alliance From Hell");
}
