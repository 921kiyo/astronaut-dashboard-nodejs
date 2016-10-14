use beam_us_up;

db.dropDatabase();

db.diary.insert([
  { 
    title: "Moon picnic",
    date: "01.09.16",
    text: "Took a wee shuttle to the moon and had a picnic. Doctor took some samples."
  },

  { 
    title: "Spinny thing broke",
    date: "02.09.16",
    text: "The spinny thing that controls something important broke so I went out to fix it. 10k in the gym."
  },

  { 
    title: "Quiet day in space",
    date: "03.09.16",
    text: "Had a nap. Watched some Netflix."
  }
]);