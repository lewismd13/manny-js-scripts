import { Clan, Kmail } from "libram";

export function bafhWls(): void {
  Clan.join("Bonus Adventures from Hell");

  const bafh = Clan.get();

  const inbox = Kmail.inbox();

  inbox.forEach((kmail) => {
    if (kmail.message === "whitelist bafh") {
      bafh.addPlayerToWhitelist(kmail.senderId);

      kmail.delete();
    }
  });

  Clan.join("Alliance From Hell");
}
