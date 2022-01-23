export const fetchDeck = async () => {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/new/`);
  const payload = await res.json();
  return payload;
};

export const fetchCards = async (deckId, count) => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
  );
  const payload = await res.json();
  return payload;
};
