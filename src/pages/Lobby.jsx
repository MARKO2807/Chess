import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// DUMMY DATA
const dummyPlayersData = [
  {
    uid: "user4",
    nickname: "JohnDoe",
    age: 28,
    email: "johndoe@example.com",
    rating: 1550,
    score: { wins: 12, losses: 4, draws: 3 },
  },
  {
    uid: "user5",
    nickname: "JaneSmith",
    age: 22,
    email: "janesmith@example.com",
    rating: 1450,
    score: { wins: 9, losses: 7, draws: 2 },
  },
  {
    uid: "user6",
    nickname: "RobertBrown",
    age: 35,
    email: "robertbrown@example.com",
    rating: 1700,
    score: { wins: 18, losses: 2, draws: 1 },
  },
  {
    uid: "user7",
    nickname: "EmilyDavis",
    age: 19,
    email: "emilydavis@example.com",
    rating: 1350,
    score: { wins: 7, losses: 8, draws: 3 },
  },
  {
    uid: "user8",
    nickname: "MichaelWilson",
    age: 40,
    email: "michaelwilson@example.com",
    rating: 1650,
    score: { wins: 14, losses: 5, draws: 2 },
  },
  {
    uid: "user9",
    nickname: "SarahTaylor",
    age: 27,
    email: "sarahtaylor@example.com",
    rating: 1500,
    score: { wins: 11, losses: 6, draws: 2 },
  },
  {
    uid: "user10",
    nickname: "DavidAnderson",
    age: 33,
    email: "davidanderson@example.com",
    rating: 1600,
    score: { wins: 16, losses: 4, draws: 1 },
  },
  {
    uid: "user11",
    nickname: "LauraThomas",
    age: 24,
    email: "laurathomas@example.com",
    rating: 1400,
    score: { wins: 8, losses: 7, draws: 3 },
  },
  {
    uid: "user12",
    nickname: "JamesMoore",
    age: 29,
    email: "jamesmoore@example.com",
    rating: 1550,
    score: { wins: 13, losses: 5, draws: 2 },
  },
  {
    uid: "user13",
    nickname: "OliviaMartin",
    age: 21,
    email: "oliviamartin@example.com",
    rating: 1450,
    score: { wins: 10, losses: 6, draws: 2 },
  },
  {
    uid: "user14",
    nickname: "WilliamJackson",
    age: 31,
    email: "williamjackson@example.com",
    rating: 1650,
    score: { wins: 15, losses: 4, draws: 1 },
  },
  {
    uid: "user15",
    nickname: "SophiaWhite",
    age: 26,
    email: "sophiawhite@example.com",
    rating: 1500,
    score: { wins: 12, losses: 5, draws: 2 },
  },
  {
    uid: "user16",
    nickname: "BenjaminHarris",
    age: 34,
    email: "benjaminharris@example.com",
    rating: 1700,
    score: { wins: 17, losses: 3, draws: 1 },
  },
  {
    uid: "user17",
    nickname: "CharlotteClark",
    age: 23,
    email: "charlotteclark@example.com",
    rating: 1400,
    score: { wins: 9, losses: 7, draws: 2 },
  },
  {
    uid: "user18",
    nickname: "AlexanderLewis",
    age: 32,
    email: "alexanderlewis@example.com",
    rating: 1600,
    score: { wins: 14, losses: 5, draws: 2 },
  },
  {
    uid: "user19",
    nickname: "AmeliaWalker",
    age: 20,
    email: "ameliawalker@example.com",
    rating: 1350,
    score: { wins: 6, losses: 8, draws: 3 },
  },
  {
    uid: "user20",
    nickname: "DanielHall",
    age: 36,
    email: "danielhall@example.com",
    rating: 1750,
    score: { wins: 19, losses: 2, draws: 1 },
  },
  {
    uid: "user21",
    nickname: "MiaAllen",
    age: 25,
    email: "miaallen@example.com",
    rating: 1500,
    score: { wins: 11, losses: 6, draws: 3 },
  },
  {
    uid: "user22",
    nickname: "EthanYoung",
    age: 28,
    email: "ethanyoung@example.com",
    rating: 1550,
    score: { wins: 13, losses: 5, draws: 2 },
  },
  {
    uid: "user23",
    nickname: "IsabellaKing",
    age: 22,
    email: "isabellaking@example.com",
    rating: 1450,
    score: { wins: 10, losses: 6, draws: 2 },
  },
  {
    uid: "user24",
    nickname: "MatthewWright",
    age: 30,
    email: "matthewwright@example.com",
    rating: 1650,
    score: { wins: 16, losses: 4, draws: 1 },
  },
  {
    uid: "user25",
    nickname: "AvaScott",
    age: 27,
    email: "avascott@example.com",
    rating: 1500,
    score: { wins: 12, losses: 5, draws: 2 },
  },
  {
    uid: "user26",
    nickname: "HenryGreen",
    age: 35,
    email: "henrygreen@example.com",
    rating: 1700,
    score: { wins: 18, losses: 3, draws: 1 },
  },
  {
    uid: "user27",
    nickname: "EllaAdams",
    age: 19,
    email: "ellaadams@example.com",
    rating: 1350,
    score: { wins: 7, losses: 8, draws: 3 },
  },
  {
    uid: "user28",
    nickname: "LucasBaker",
    age: 40,
    email: "lucasbaker@example.com",
    rating: 1600,
    score: { wins: 14, losses: 5, draws: 2 },
  },
  {
    uid: "user29",
    nickname: "GraceNelson",
    age: 24,
    email: "gracenelson@example.com",
    rating: 1400,
    score: { wins: 9, losses: 7, draws: 2 },
  },
  {
    uid: "user30",
    nickname: "JackCarter",
    age: 29,
    email: "jackcarter@example.com",
    rating: 1550,
    score: { wins: 13, losses: 5, draws: 2 },
  },
];

const Lobby = ({ playersData = dummyPlayersData }) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(playersData); // Real data in future...
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(playersData);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterTerm, setFilterTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTimeControl, setSelectedTimeControl] = useState("5+0");

  // Open modal
  const openModal = (player) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlayer(null);
  };

  // "Fake" game invitation
  const confirmInvite = () => {
    console.log(
      `Game invitation sent to ${selectedPlayer.nickname} with time control: ${selectedTimeControl}`
    );
    alert(
      `Game invitation sent to ${selectedPlayer.nickname} with time control: ${selectedTimeControl}`
    );
    closeModal();
    navigate("/game", { state: { selectedTimeControl } }); // Redirect to game page with selected time control
  };

  useEffect(() => {
    let data = [...playersData];

    // Filter by nickname
    if (filterTerm) {
      data = data.filter((player) =>
        player.nickname.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }

    // Sorting logic
    if (sortConfig.key) {
      data.sort((a, b) => {
        const nestedKeys = ["wins", "losses", "draws"];
        let aValue = nestedKeys.includes(sortConfig.key)
          ? a.score[sortConfig.key]
          : a[sortConfig.key];
        let bValue = nestedKeys.includes(sortConfig.key)
          ? b.score[sortConfig.key]
          : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(data);
    setCurrentPage(1);
  }, [playersData, filterTerm, sortConfig]);

  // Sorting function
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      {/* Filter Input */}
      <input
        type="text"
        placeholder="Search by nickname"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      />

      {/* Table of Players */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("nickname")}>Nickname</th>
            <th onClick={() => handleSort("rating")}>Rating</th>
            <th onClick={() => handleSort("wins")}>Wins</th>
            <th onClick={() => handleSort("losses")}>Losses</th>
            <th onClick={() => handleSort("draws")}>Draws</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((player, index) => (
            <tr key={index}>
              <td>{player.nickname}</td>
              <td>{player.rating}</td>
              <td>{player.score.wins}</td>
              <td>{player.score.losses}</td>
              <td>{player.score.draws}</td>
              <td>
                <button onClick={() => openModal(player)}>
                  Invite to Game
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>

      {/* Modal for Game Invitation */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Invite {selectedPlayer.nickname} to a Game</h3>

            {/* Select Time Control */}
            <label>Choose time control:</label>
            <select
              value={selectedTimeControl}
              onChange={(e) => setSelectedTimeControl(e.target.value)}>
              <option value="5+0">5+0 (Blitz)</option>
              <option value="10+5">10+5 (Rapid)</option>
              <option value="15+10">15+10 (Classical)</option>
            </select>

            {/* Buttons */}
            <div>
              <button onClick={confirmInvite}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
