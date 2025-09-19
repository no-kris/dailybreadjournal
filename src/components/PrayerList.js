function PrayerList({ prayersList, username, categories }) {
  if (prayersList.length === 0) {
    return (
      <p className="message">
        You have no prayers. Try changing categories or add a new prayer.
      </p>
    );
  }
  return (
    <section>
      <p className="message">{username}'s Prayers</p>
      <ul>
        {prayersList.map((prayer) => (
          <li className="prayer">
            <p>{prayer.text}</p>
            <span
              className="tag"
              style={{
                backgroundColor: categories.find(
                  (cat) => cat.name === prayer.category
                )?.color,
              }}
            >
              {prayer.category}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PrayerList;
