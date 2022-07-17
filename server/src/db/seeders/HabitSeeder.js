import { Habit } from "../../models/index.js";

class HabitSeeder {
  static async seed() {
    const habitsData = [
      {
        title: "Sleep",
        description:
          "I have a bad habit of not getting enough sleep and this heavily effects me doing my work during the day",
        good: false,
        bad: true,
        date: "07/10/2022",
        userId: 1,
      },
      {
        title: "Working out",
        description: "I have been steadily working out almost every day",
        good: true,
        bad: false,
        date: "07/20/2022",
        userId: 1,
      },
      {
        title: "Procrastinating",
        description:
          "I have a bad habit of procrastinating to much and leaving things to get done at the last moment",
        good: false,
        bad: true,
        date: "07/20/2022",
        userId: 1,
      },
      {
        title: "Eating healthy",
        description: "I eat healthy so that I can look good and stay healthy",
        good: true,
        bad: false,
        date: "07/20/2022",
        userId: 1,
      },

      {
        title: "Never giving up",
        description:
          "When I really want something and to get something done I do establish a never giving up mentality and that helps me achieve",
        good: true,
        bad: false,
        date: "07/20/2022",
        userId: 1,
      },

      {
        title: "Spending money on food",
        description: "I spend to much money on food and that can change and help me stay healthy",
        good: true,
        bad: false,
        date: "07/20/2022",
        userId: 1,
      },
      {
         title: "Pacing around",
         description:
           "When I really want something and to get something done I do establish a never giving up mentality and that helps me achieve, Then I pace around to much",
         good: false,
         bad: true,
         date: "07/20/2022",
         userId: 1,
       },

       {
         title: "Biting on my back teeth",
         description:"When I sleep or just walking or standing at any random giving momment I realize im biting hard on my back teeth",
         good: false,
         bad: true,
         date: "07/20/2022",
         userId: 1,
       },
      {
        title: "Working out",
        description: "I have gotten back in shape and reduced my stress levels",
        good: true,
        bad: false,
        date: "07/20/2022",
        userId: 2,
      },
      {
        title: "Working out",
        description:
          "I am putting to much time and focus into it and not other things which has caused me to slow down on my school-work",
        good: false,
        bad: true,
        date: "07/20/2022",
        userId: 2,
      },
      {
        title: "test",
        description: "Yada",
        good: true,
        bad: false,
        date: "07/20/2022",
        userId: 1,
      },
    ];
    for (const singleHabitsData of habitsData) {
      const currentHabit = await Habit.query().findOne(singleHabitsData);
      if (!currentHabit) {
        await Habit.query().insert(singleHabitsData);
      }
    }
  }
}

export default HabitSeeder;
