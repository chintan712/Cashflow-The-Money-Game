import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import "./Homepage.css";
import "./Game.css";
import First from "./GameLayout";
import ProgressBar from "./ProgressBar";
import randomProfession from "./Slider/randomProfession";

let socket;
const ENDPOINT = "http://localhost:5000";
const random_profession = randomProfession();

const Game = (props) => {
  const data = queryString.parse(props.location.search);
  const [sal, setSal] = useState(random_profession.starting_cash);

  const [stocksArray, setStocksarray] = useState([]);

  // const getLoans = (amount) => {
  //   random_profession = {...random_profession, bankloan: amount}
  // }


  const sendDataToParent = (data) => {
    setSal(sal - data);
  };
  const sendSellData = (data) => {
    setSal(sal + data);
  };

  const [cashsmalldeal, setCashsmalldeal] = useState(null);
  const [pr, setPr] = useState(null);
  const [countSD, setCountSD] = useState(0);

  const sendSDealToParent = (price, detail, num) => {
    setCashsmalldeal(detail);
    setPr(price);
    setCountSD(num);
  };

  const sendSDealDetail = (detail) => {
    setStocksarray((prevarr) => {
      return [...prevarr, detail];
    });
  };

  //initialize socket state
  const [room, setRoom] = useState(data.roomCode);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit("join", { room: room }, (error) => {
      if (error) setRoomFull(true);
    });

    //cleanup on component unmount
    return function cleanup() {
      socket.emit("disconnect");
      //shut down connnection instance
      socket.off();
    };
  }, []);

  const [isChatBoxHidden, setChatBoxHidden] = useState(true);
  const [isfinStatBoxHidden, setfinStatBoxHidden] = useState(true);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("currentUserData", ({ name }) => {
      setCurrentUser(name);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);

      const chatBody = document.querySelector(".chat-body");
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }, []);

  const toggleChatBox = () => {
    const chatBody = document.querySelector(".chat-body");
    const chatBox = document.querySelector(".chat-box");
    const chatHead = document.querySelector(".chat-head");
    const chatName = document.querySelector(".chat-name");
    if (isChatBoxHidden) {
      chatBody.style.display = "block";
      chatBox.style.width = "335px";
      chatHead.style.width = "335px";
      chatName.innerHTML = "ChatBox";
      setChatBoxHidden(false);
    } else {
      chatBody.style.display = "none";
      chatBox.style.width = "50px";
      chatHead.style.width = "50px";
      chatName.innerHTML = " ";
      setChatBoxHidden(true);
    }
  };

  const togglefinStatBox = () => {
    const finStatBody = document.querySelector(".finStat-body");
    const finStatBox = document.querySelector(".finStat-box");
    const finStatHead = document.querySelector(".finStat-head");
    if (isfinStatBoxHidden) {
      finStatBody.style.display = "block";
      finStatBox.style.width = "800px";
      finStatHead.style.width = "800px";
      setfinStatBoxHidden(false);
    } else {
      finStatBody.style.display = "none";
      finStatBox.style.width = "335px";
      finStatHead.style.width = "335px";
      setfinStatBoxHidden(true);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message: message }, () => {
        setMessage("");
      });
    }
  };
  const ab = "5";

  return (
    <div className="Homepage-game">
      <div>
        {!roomFull ? (
          <>
            {/* <div className="topInfo">
            <img src={require("../assets/output.png").default} />
            <div className="quit-button">
              <a href="/">
                <button className="game-button red">QUIT</button>
              </a>
            </div>
          </div> */}

            {/* PLAYER LEFT MESSAGES */}
            {users.length === 1 && currentUser === "Player 2" && (
              <>
                <div className="topInfo">
                  <img src={require("./images/cf.png").default} />
                  <h1>Game Code: {room}</h1>
                  <div className="quit-button">
                    <a href="/">
                      <button className="game-button red">QUIT</button>
                    </a>
                  </div>
                </div>
                <div className="topInfoText">
                  <h4 style={{ paddingRight: 20, paddingTop: 200 }}>
                    Player 1 has left the game.
                  </h4>
                </div>
              </>
            )}
            {users.length === 1 && currentUser === "Player 1" && (
              <>
                <div className="topInfo">
                  <img src={require("./images/cf.png").default} />
                  <h1>Game Code: {room}</h1>
                  <div className="quit-button">
                    <a href="/">
                      <button className="game-button red">QUIT</button>
                    </a>
                  </div>
                </div>
                <div className="topInfoText">
                  <h4 style={{ paddingRight: 20, paddingTop: 200 }}>
                    Waiting for Player 2 to join the game.
                  </h4>
                </div>
              </>
            )}

            {users.length === 2 && (
              <>
                <First
                  code={room}
                  work_player={random_profession}
                  sendDataToParent={sendDataToParent}
                  sendSDealToParent={sendSDealToParent}
                  sendSellData={sendSellData}
                  sendSDealDetail={sendSDealDetail}
                />
              </>
            )}

            {users.length === 2 && (
              <>
                <div>
                  {/* PLAYER 1 VIEW */}
                  {currentUser === "Player 1" && (
                    <>
                      {/* PLAYER 1 FINANCIAL STATEMENT */}
                      <div className="finStatBoxWrapper">
                        <div className="finStat-box finStat-box-player1">
                          <div className="finStat-head">
                            <h2 className="finStat-name">
                              Financial Statement
                            </h2>
                            {!isfinStatBoxHidden ? (
                              <span
                                onClick={togglefinStatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_down
                              </span>
                            ) : (
                              <span
                                onClick={togglefinStatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_up
                              </span>
                            )}
                          </div>
                          <div className="finStat-body">
                            <div className="main-container-FS">
                              <div className="c1">
                                <div className="c1-r1">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Income
                                  </h3>
                                  <table className="tabb">
                                    <tr>
                                      <td className="fs-td"></td>
                                      <td className="fs-td">
                                        <b>Cash FLow</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        <p>{random_profession.title}</p>
                                      </td>
                                      <td className="fs-td">
                                        ₹{random_profession.salary}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        <b>Interest/Dividends </b>
                                      </td>
                                      <td className="fs-td">
                                        <table className="tab-int">
                                          <th></th>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;</td>
                                      <td className="fs-td">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        <b>Real Estate/Business</b>
                                      </td>
                                      <td className="fs-td">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;</td>
                                      <td className="fs-td">&nbsp;</td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="c1-r2">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Expanses
                                  </h3>
                                  <table className="tabb2">
                                    <tr>
                                      <td className="fs-td">Taxes:</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_taxes}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Home loans:</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_home_mortgage}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Car Loans</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_car_loan}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        Credit Card Payment
                                      </td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_credit_card}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Other Expenses</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_other_expanses}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="c1-r3">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Assets
                                  </h3>
                                  <table className="tabb" style={{ overflowY : "auto"}}>
                                    <tr>
                                      <td className="fs-td">
                                        <b>Stocks/Funds/CDs</b>
                                      </td>
                                      <td className="fs-td">
                                        <b>Cost/Share</b>
                                      </td>
                                    </tr>
                                    {stocksArray.map((item) => {
                                      return [
                                        <tr>
                                          <td className="fs-td">
                                            {item.name}
                                          </td>
                                          <td className="fs-td">{item.price}</td>
                                        </tr>,
                                      ];
                                    })}
                                    <tr>
                                      <td className="fs-td">
                                        <b>Real Estate/Business</b>
                                      </td>
                                      <td className="fs-td">
                                        <b>Cost</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                              <div className="c2">
                                <div className="c2-r1">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Passive Income Progress
                                  </h3>
                                  <ProgressBar
                                    bgcolor="#696969"
                                    completed="10"
                                  />
                                </div>
                                <div className="c2-r2">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Cash
                                  </h3>
                                  <table className="tabb">
                                    <tr>
                                      <td className="fs-td">Cash</td>
                                      <td className="fs-td">₹{sal} </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Total Income</td>
                                      <td className="fs-td">
                                        ₹{random_profession.salary}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Total Expenses</td>
                                      <td className="fs-td">
                                        ₹
                                        {random_profession.exp_taxes +
                                          random_profession.exp_home_mortgage +
                                          random_profession.exp_car_loan +
                                          random_profession.exp_credit_card +
                                          random_profession.exp_other_expanses}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Pay Day</td>
                                      <td className="fs-td">
                                        ₹
                                        {random_profession.salary -
                                          (random_profession.exp_taxes +
                                            random_profession.exp_home_mortgage +
                                            random_profession.exp_car_loan +
                                            random_profession.exp_credit_card +
                                            random_profession.exp_other_expanses)}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="c2-r3">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Liabilities
                                  </h3>
                                  <table className="tabb2">
                                    <tr>
                                      <td className="fs-td">Home Mortgage:</td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_home_mortgage}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Car Loans</td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_car_loans}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        Credit Card Payment
                                      </td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_credit_card}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Retail Debt</td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_retail_debt}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* PLAYER 1 CHAT BOX */}
                      <div className="chatBoxWrapper">
                        <div className="chat-box chat-box-player1">
                          <div className="chat-head">
                            <h2 className="chat-name"></h2>
                            {!isChatBoxHidden ? (
                              <span
                                onClick={toggleChatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_down
                              </span>
                            ) : (
                              <span
                                onClick={toggleChatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_up
                              </span>
                            )}
                          </div>
                          <div className="chat-body">
                            <div className="msg-insert">
                              {messages.map((msg) => {
                                if (msg.user === "Player 2")
                                  return (
                                    <div className="msg-receive">
                                      {msg.text}
                                    </div>
                                  );
                                if (msg.user === "Player 1")
                                  return (
                                    <div className="msg-send">{msg.text}</div>
                                  );
                              })}
                            </div>
                            <div className="chat-text">
                              <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(event) =>
                                  setMessage(event.target.value)
                                }
                                onKeyPress={(event) =>
                                  event.key === "Enter" && sendMessage(event)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </>
                  )}

                  {/* PLAYER 2 VIEW */}

                  {currentUser === "Player 2" && (
                    <>
                      {/* PLAYER 2 FINANCIAL STATEMENT */}
                      <div className="finStatBoxWrapper">
                        <div className="finStat-box finStat-box-player1">
                          <div className="finStat-head">
                            <h2 className="finStat-name">
                              Financial Statement
                            </h2>
                            {!isfinStatBoxHidden ? (
                              <span
                                onClick={togglefinStatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_down
                              </span>
                            ) : (
                              <span
                                onClick={togglefinStatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_up
                              </span>
                            )}
                          </div>
                          <div className="finStat-body">
                            <div className="main-container-FS">
                              <div className="c1">
                                <div className="c1-r1">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Income
                                  </h3>
                                  <table className="tabb">
                                    <tr>
                                      <td className="fs-td"></td>
                                      <td className="fs-td">
                                        <b>Cash Flow</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        {random_profession.title}
                                      </td>
                                      <td className="fs-td">
                                        ₹{random_profession.salary}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        <b>Interest/Dividends</b>
                                      </td>
                                      <td className="fs-td">
                                        <table className="tab-int">
                                          <th></th>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;</td>
                                      <td className="fs-td">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        <b>Real Estate/Business</b>
                                      </td>
                                      <td className="fs-td">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;</td>
                                      <td className="fs-td">&nbsp;</td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="c1-r2">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Expanses
                                  </h3>
                                  <table className="tabb2">
                                    <tr>
                                      <td className="fs-td">Taxes:</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_taxes}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Home loans:</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_home_mortgage}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Car Loans</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_car_loan}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        Credit Card Payment
                                      </td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_credit_card}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Other Expenses</td>
                                      <td className="fs-td">
                                        ₹{random_profession.exp_other_expanses}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="c1-r3">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Assets
                                  </h3>
                                  <table className="tabb">
                                    <tr>
                                      <td className="fs-td">
                                        <b>Stocks/Funds/CDs</b>
                                      </td>
                                      <td className="fs-td">
                                        <b>Cost/Share</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">{cashsmalldeal}</td>
                                      <td className="fs-td">{pr}</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        <b>Real Estate/Business</b>
                                      </td>
                                      <td className="fs-td">
                                        <b>Cost</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                      <td className="fs-td">&nbsp;&nbsp;</td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                              <div className="c2">
                                <div className="c2-r1">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Passive Income Progress
                                  </h3>
                                  <ProgressBar
                                    bgcolor="#696969"
                                    completed="10"
                                  />
                                </div>
                                <div className="c2-r2">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Cash
                                  </h3>
                                  <table className="tabb">
                                    <tr>
                                      <td className="fs-td">Cash</td>
                                      <td className="fs-td">₹{sal}</td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Total Income</td>
                                      <td className="fs-td">
                                        ₹{random_profession.salary}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Total Expenses</td>
                                      <td className="fs-td">
                                        ₹
                                        {random_profession.exp_taxes +
                                          random_profession.exp_home_mortgage +
                                          random_profession.exp_car_loan +
                                          random_profession.exp_credit_card +
                                          random_profession.exp_other_expanses}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Pay Day</td>
                                      <td className="fs-td">
                                        ₹
                                        {random_profession.salary -
                                          (random_profession.exp_taxes +
                                            random_profession.exp_home_mortgage +
                                            random_profession.exp_car_loan +
                                            random_profession.exp_credit_card +
                                            random_profession.exp_other_expanses)}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="c2-r3">
                                  <h3 style={{ backgroundColor: "#9e9e9e" }}>
                                    Liabilities
                                  </h3>
                                  <table className="tabb2">
                                    <tr>
                                      <td className="fs-td">Home Morgage:</td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_home_mortgage}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Car Loans</td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_car_loans}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">
                                        Credit Card Payment
                                      </td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_credit_card}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fs-td">Retail Debt</td>
                                      <td className="fs-td">
                                        ₹{random_profession.liab_retail_debt}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* PLAYER 2 CHAT BOX */}
                      <div className="chatBoxWrapper">
                        <div className="chat-box chat-box-player2">
                          <div className="chat-head">
                            <h2 className="chat-name"></h2>
                            {!isChatBoxHidden ? (
                              <span
                                onClick={toggleChatBox}
                                class="material-icons"
                              >
                                keyboard_arrow_down
                              </span>
                            ) : (
                              <span
                                onClick={toggleChatBox}
                                className="material-icons"
                              >
                                keyboard_arrow_up
                              </span>
                            )}
                          </div>
                          <div className="chat-body">
                            <div className="msg-insert">
                              {messages.map((msg) => {
                                if (msg.user === "Player 1")
                                  return (
                                    <div className="msg-receive">
                                      {msg.text}
                                    </div>
                                  );
                                if (msg.user === "Player 2")
                                  return (
                                    <div className="msg-send">{msg.text}</div>
                                  );
                              })}
                            </div>
                            <div className="chat-text">
                              <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(event) =>
                                  setMessage(event.target.value)
                                }
                                onKeyPress={(event) =>
                                  event.key === "Enter" && sendMessage(event)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <h1>Room full</h1>
        )}

        <br />
      </div>
    </div>
  );
};

export default Game;
