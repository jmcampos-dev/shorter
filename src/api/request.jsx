import axios from "axios";

export default async function getLink(linkUrl, link) {
  try {
    const linkFormatter = `${linkUrl}?url=${link}`;
    const res = await axios.get(linkFormatter, {
      headers: {
        Accept: "aplication/json",
      },
    });
    return res;
  } catch (e) {
    console.log(`${e} error`);
  }
}
