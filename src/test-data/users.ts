export interface User {
  username: string;
  password: string;
}

export const users = {
  standard: {
    username: process.env.STANDARD_USERNAME!,
    password: process.env.PASSWORD!,
  },

  locked: {
    username: process.env.LOCKED_USERNAME!,
    password: process.env.PASSWORD!,
  },

  problem: {
    username: process.env.PROBLEM_USERNAME!,
    password: process.env.PASSWORD!,
  },

  performance: {
    username: process.env.PERFORMANCE_USERNAME!,
    password: process.env.PASSWORD!,
  },
};
