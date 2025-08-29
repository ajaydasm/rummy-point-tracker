import annan from "../assets/players/annan.png";
import ajas from "../assets/players/ajas.png";
import chakkara from "../assets/players/chakkara.png";
import rahul from "../assets/players/rahul.png";
import thantha from "../assets/players/thantha.png";
import saji from "../assets/players/saji.png";
import jineshp from "../assets/players/jineshp.png";
import sonu from "../assets/players/sonu.png";
import dasan from "../assets/players/dasan.png";
import petta from "../assets/players/petta.png";
import kailas from "../assets/players/kailas.png";
import kannan from "../assets/players/kannan.png";
import subhash from "../assets/players/subhash.png";


import defaultAvatar from "../assets/players/default-avatar.png";

import playersData from "./playersData.json";

const avatarMap = {
  Annan: annan,
  Ajas: ajas,
  Chakkara: chakkara,
  Rahul: rahul,
  Thantha: thantha,
  Saji: saji,
  Jineshp: jineshp,
  Sonu: sonu,
  Dasan: dasan, 
  Petta: petta,
  Kailas: kailas,
  Kannan: kannan,
  Subhash: subhash,
};

const availablePlayers = playersData.map((p) => ({
  ...p,
  avatar: avatarMap[p.name] || defaultAvatar, 
}));

export default availablePlayers;
export { defaultAvatar }; 
