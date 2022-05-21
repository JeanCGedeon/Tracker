import { Habit } from "../../models/index.js";

class HabitSeeder{
    static async seed() {
     const habitsData = [{
        title:'Sleep',
        description:'I have a bad habit of not getting enough sleep and this heavily effects me doing my work during the day',
        good:false,
        userId:1
     },
     {
        title:'Working out',
        description: 'I have been steadily working out almost every day',
        good:true,
        userId:1
     },
     {
        title:'Working out',
        description:'I have gotten back in shape and reduced my stress levels',
        good:true,
        userId:2
     },
     {
        title:'Working out',
        description:'I am putting to much time and focus into it and not other things which has caused me to slow down on my school-work',
        good:false,
        userId:2
    },
    {
        title:'test',
        description:'Yada',
        good:true,
        userId:1
    }
    ]
    for (const singleHabitsData of habitsData) {
        const currentHabit = await Habit.query().findOne(singleHabitsData);
        if (!currentHabit) {
          await Habit.query().insert(singleHabitsData);
        }
      }
    }

}

export default HabitSeeder