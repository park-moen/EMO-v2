const fetchRandom = async () => {
  try {
    const data = await fetch('/cuisine');
    const res = await data.json();
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

window.onload = () => fetchRandom;
