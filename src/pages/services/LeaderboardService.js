import axios from "axios";

export const getLeaderboard = () =>
  axios.get("http://localhost:8080/api/leaderboard");