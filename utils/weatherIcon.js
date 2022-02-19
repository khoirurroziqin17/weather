export default function weatherIcon(id) {
  const link = "https://developer.accuweather.com/sites/default/files/";
  const extention = "-s.png";
  let num;

  if (id <= 9) {
    num = "0" + id;
  } else {
    num = id;
  }

  return link + num + extention;
}
