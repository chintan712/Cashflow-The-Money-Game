import React from "react";
import { useState, useEffect } from "react";
import "./Game.css";
import deal from "./images/deal_1.png";
import child from "./images/child.png";
import com from "./images/commission.png";
import unit from "./images/dreams/400-unit-apartment-building.png";
import down from "./images/downsized.png";
import help from "./images/helping-hand.png";
import real from "./images/real-estate-agent.png";
import salary from "./images/salary.png";
import movie from "./images/dreams/movie-theatre.png";
import app from "./images/dreams/app-development.png";
import bad from "./images/dreams/bad-partner.png";
import divo from "./images/dreams/divorce.png";
import dre from "./images/dreams/dream.png";
import golf from "./images/dreams/golf-course.png";
import island from "./images/dreams/island vacation.png";
import pizza from "./images/dreams/pizza shop.png";
import research from "./images/dreams/research-disease.png";
import soft from "./images/dreams/software-company.png";
import beauty from "./images/dreams/beauty salon.png";
import dry from "./images/dreams/dry dock storage.png";
import fried from "./images/dreams/fried chicken.png";
import oil from "./images/dreams/oil deal.png";
import sport from "./images/dreams/sports equipments.png";
import tax from "./images/dreams/tax audit.png";
import auto from "./images/dreams/auto repair.png";
import bio from "./images/dreams/bio tech.png";
import coll from "./images/dreams/collectibles.png";
import dry2 from "./images/dreams/dry cleaning.png";
import frozen from "./images/dreams/frozen yogurt.png";
import mobile from "./images/dreams/mobile home park.png";
import unfor from "./images/dreams/unforseen repairs.png";
import mini from "./images/dreams/200 unit mini storage.png";
import hobby from "./images/dreams/hobby supply store.png";
import assist from "./images/dreams/assisted living.png";
import burger from "./images/dreams/burger shop.png";
import char from "./images/dreams/charity (1).png";
import family from "./images/dreams/family restaurant.png";
import health from "./images/dreams/healthcare.png";
import heat from "./images/dreams/heat and ac.png";
import law from "./images/dreams/law suit.png";
import privat from "./images/dreams/private wildlife reserve.png";
import quick from "./images/dreams/quick food market.png";
import ticket from "./images/dreams/ticket sales company.png";
import pay from "./images/dreams/paycheck.png";
import FinancialStat from "./FinancialStat";
import cf from "./images/cf.png";

import Slider from "./Slider/Slider";
import small_deal from "./small_deals";
import randomDoodad from "./randomDoodad";
import randomSmallDeal from "./randomSmallDeal";
import "./Homepage.css";
import randomBigDeal from "./randomBigDeal";
import { motion } from "framer-motion";

import PersonIcon from "@mui/icons-material/Person";
import d1 from "./images/dice_im/dice_1.png";
import d2 from "./images/dice_im/dice_2.png";
import d3 from "./images/dice_im/dice_3.png";
import d4 from "./images/dice_im/dice_4.png";
import d5 from "./images/dice_im/dice_5.png";
import d6 from "./images/dice_im/dice_6.png";
import io from "socket.io-client";
import randomMarketCard from "./randomMarketCard";

let socket;
const ENDPOINT = "http://localhost:5000";

function First(props) {
  const [random_doodad, setRandom_doodad] = useState(randomDoodad());

  const [random_small_deal, setRandom_small_deal] = useState(randomSmallDeal());

  const [random_big_deal, setRandom_big_deal] = useState(randomBigDeal());

  const [random_market_card, setRandom_market_card] = useState(randomMarketCard());

  const [modalDream, setModalDream] = useState(true);

  const [modalEx, setModalEx] = useState(0);

  const [modalDoodad, setModalDoodad] = useState(false);

  const [modalDeal, setModalDeal] = useState(false);

  const [modalSmallDeal, setModalSmallDeal] = useState(false);

  const [modalBigDeal, setModalBigDeal] = useState(false);

  const [modalDownsized, setModalDownsized] = useState(false);

  const [modalPayday, setModalPayday] = useState(false);

  const [modalMarket, setModalMarket] = useState(false);

  const [modalChild, setModalChild] = useState(false);

  const [modalCharity, setModalCharity] = useState(false);
  const [modalChrt, setModalChrt] = useState(false);

  const [turn, setTurn] = useState("p1");

  const [count, setCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const [loan_val, setLoan_val] = useState(0);

  const [loanmodalBD, setLoanModalBD] = useState(false);

  const [loanmodal, setLoanModal] = useState(false);

  const [repaymodal, setRepayModal] = useState(false);

  //console.log(modalExtra);
  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io.connect(ENDPOINT, connectionOptions);
  }, []);

  useEffect(() => {
    socket.emit("initGameState", {
      turn: "Player 1",
    });
  }, []);

  useEffect(() => {
    socket.on("initGameState", ({ turn }) => {
      setTurn(turn);
    });

    socket.on("updateGameState", ({ turn }) => {
      turn && setTurn(turn);
    });
  }, []);

  const OnDiceChanged = () => {
    const cardPlayedBy = turn;

    if (cardPlayedBy === "Player 1") {
      socket.emit("updateGameState", {
        turn: "Player 2",
      });
    }
  };

  const abc_prof = props.work_player;
  const cost_P1 = props.updatedCost;
  const exp =
    abc_prof.exp_taxes +
    abc_prof.exp_home_mortgage +
    abc_prof.exp_car_loan +
    abc_prof.exp_credit_card +
    abc_prof.exp_other_expanses;

  function toggleModalStartDream() {
    setModalDream(!modalDream);
  }

  function toggleModalStartChild() {
    setModalChild(!modalChild);
  }

  function toggleModalStartRepay() {
    setRepayModal(!repaymodal);
  }


  function toggleModalStartEx() {
    setModalEx(0);
  }

  function toggleModalStartMarket() {
    setModalMarket(!modalMarket);
  }

  function toggleModalStartDoodad() {
    setModalDoodad(!modalDoodad);
  }

  function toggleModalStartPayday() {
    setModalPayday(!modalPayday);
  }

  function toggleModalDownsized() {
    setModalDownsized(!modalDownsized);
  }

  function toggleModalStartDeal() {
    setModalDeal(!modalDeal);
  }
  function toggleModalStartSmallDeal() {
    setModalSmallDeal(!modalSmallDeal);
  }
  function toggleModalStartBigDeal() {
    setModalBigDeal(!modalBigDeal);
  }

  function toggleModalStartLoanBD() {
    setModalDream(!loanmodalBD);
  }

  function toggleModalStartLoan() {
    setModalDream(!loanmodal);
  }

  // function toggleModalStartExtra() {
  //   setModalEx();

  // }

  /*function Small_Deal_Sell(){
    if(abc_small_deal.id){
      props.sendSellData(count*abc_small_deal.price)
      setCount = count - sellCount;
    }
    setModalSmallDeal(false) 
  }*/

  if (modalDream) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalMarket) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalCharity) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalDownsized) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalChild) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalDoodad) {
    document.body.classList.add("active-modal-doodad");
  } else {
    document.body.classList.remove("active-modal-doodad");
  }

  if (loanmodalBD) {
    document.body.classList.add("active-modal-loanmodalBD");
  } else {
    document.body.classList.remove("active-modal-loanmodalBD");
  }

  if (loanmodal) {
    document.body.classList.add("active-modal-loanmodal");
  } else {
    document.body.classList.remove("active-modal-loanmodal");
  }

  if (modalEx == 1) {
    document.body.classList.add("active-modal-doodad");
  } else {
    document.body.classList.remove("active-modal-doodad");
  }

  if (modalPayday) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalDeal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalSmallDeal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalBigDeal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (repaymodal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  var [die, setDie] = useState(0);

  // const imgs = [d1, d2, d3, d4, d5, d6];
  // const dic = document.querySelectorAll("img.dice_1");
  // var dieval;
  // function roll() {
  //   dic.forEach(function (di) {
  //     di.classList.add("shake");
  //   });
  //   setTimeout(function () {
  //     dic.forEach(function (di) {
  //       di.classList.remove("shake");
  //     });
  //     dieval = Math.floor(Math.random() * 6);
  //     const d = document.getElementsByClassName("dice_1")[0];
  //     d.setAttribute("src", imgs[dieval]);
  //     die += dieval + 1;
  //     setDie(die > 24 ? die - 24 : die);
  //   }, 1000);
  // }

var cube = document.querySelector('.cube');
// var rollBtn = document.querySelector('.game-button-roll red');
var currentClass = '';
var num = 0;
var randNum;

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }

function roll() {
  randNum = Math.floor(Math.random() * (7 - 1) + 1);
  die += randNum;
  setDie(die > 24 ? die - 24 : die);
  console.log(die )
  var showClass = 'show-' + randNum;
  if ( currentClass ) {
    cube.classList.remove( currentClass );
  }
  cube.classList.add( showClass );
  currentClass = showClass;
}


  useEffect(() => {
    if (die === 2 || die === 10 || die === 18) {
      setTimeout(() => {
        setModalDoodad(true);
        setRandom_doodad(randomDoodad());
      }, 1000);
    }
    document.body.classList.add("active-modal-doodad");
  }, [die]);

  useEffect(() => {
    if (
      die === 1 ||
      die === 3 ||
      die === 5 ||
      die === 7 ||
      die === 9 ||
      die === 11 ||
      die === 13 ||
      die === 15 ||
      die === 17 ||
      die === 19 ||
      die === 21 ||
      die === 23
    ) {
      setTimeout(() => {
        setModalDeal(true);
      }, 1000);
    }

    document.body.classList.add("active-modal-deal");
  }, [die]);

  useEffect(() => {
    if (die === 20) {
      setTimeout(() => {
        setModalDownsized(true);
      }, 1000);
    }

    document.body.classList.add("active-modal-downsized");
  }, [die]);

  useEffect(() => {
    if (die === 8 || die === 16 || die === 24) {
      setTimeout(() => {
        setModalMarket(true);
      }, 1000);
    }

    document.body.classList.add("active-modal-market");
  }, [die]);

  useEffect(() => {
    if (die === 6 || die === 14 || die === 22) {
      setTimeout(() => {
        setModalPayday(true);
      }, 1000);
    }

    document.body.classList.add("active-modal");
  }, [die]);

  useEffect(() => {
    if (die === 12) {
      setTimeout(() => {
        setModalChild(true);
      }, 1000);
    }

    document.body.classList.add("active-modal");
  }, [die]);

  useEffect(() => {
    if (die === 4) {
      setTimeout(() => {
        setModalCharity(true);
      }, 1000);
    }

    document.body.classList.add("active-modal");
  }, [die]);

  

  return (
    <>
      <main>
        <div>
          <img className="cf-box" src={cf} alt="" />
        </div>

        {modalDream && (
          <div className="modal-dream">
            <div className="overlay-dream"></div>
            <Slider work_playerGL={abc_prof} />
            <button className="close-dream" onClick={toggleModalStartDream}>
              SELECT DREAM
            </button>
          </div>
        )}

        {modalEx === 1 && (
          <div className="modal-deal">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2>FINISH YOUR TURN</h2>
              <p className="p1">
                Before you end your turn, review your financial statement. You
                may also use this time to repay liabilities or borrow money.
              </p>
              <br />

              {/*<button className="close-loan" onClick={() => {toggleModalStartEx(); setRepayModal(true)}}>
                REPAY
              </button>*/}
              <button className="close-loan" onClick={() => {toggleModalStartEx(); setLoanModal(true)}}>
                BORROW
        </button>
              <button className="close-loan" onClick={toggleModalStartEx}>
                END TURN
              </button>
            </div>
          </div>
        )}

          {repaymodal && (
            <div className="modal-deal">
            <div className="overlay-deal"></div>
  
            <div className="content-deal">
              <h2>Pay OFF Loans</h2>
              <p>Select Liabilities: </p>

              </div>
              </div>
          )}

        {loanmodal && (
          <div className="modal-deal">
          <div className="overlay-deal"></div>

          <div className="content-deal">
            <h2>Loan</h2>
            <p>Loans must be in the multiples of ₹1000 at 10% interest per month</p>

            <input
                type="number"
                className="inp-count"
                value={loan_val}
              />
            <br />
              <button className="plus" onClick={() => setLoan_val(loan_val + 1000)}>
                +
              </button>
              <button className="plus" onClick={() => setLoan_val(loan_val - 1000)}>
                -
              </button>
              <br />
            <button
              className="close-Ldeal"
              onClick={() => {
                setLoanModal(false);
                props.loan_amount(loan_val)
                props.sendAddtoCash(loan_val)
              }}
            >
              BORROW
            </button>
            <button
              className="close-Ldeal"
              onClick={() => {
                setLoanModal(false);
              }}
            >
              PASS
            </button>
          </div>
        </div>
        )}

        {modalDoodad && (
          <div className="modal-doodad">
            <div className="overlay-doodad"></div>

            <div className="content-doodad">
              <h2 style={{ color: "red", fontFamily: "inherit" }}>
                {random_doodad.name}
              </h2>
              <p>Costs you ₹{random_doodad.cost}</p>

              <button
                className="close-sdeal"
                onClick={() => {
                  props.sendDataToParent(random_doodad.cost);
                  setModalDoodad(false);
                  setModalEx(1);
                }}
              >
                PAY
              </button>
            </div>
          </div>
        )}

        {modalDeal && (
          <div className="modal-deal">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2>DEAL OPPRTUNITY</h2>
              <p className="p1">Which type of deal you want?</p>
              <p>Small deals cost ₹4,00,000 or less.</p>
              <p>Big deals cost ₹5,00,000 or more.</p>
              <br />

              <button
                className="close-sdeal"
                onClick={() => {
                  toggleModalStartDeal();
                  setModalSmallDeal(true);
                  setModalEx(1);
                  setRandom_small_deal(randomSmallDeal());
                }}
              >
                small
              </button>

              {/*<button onClick={() => props.sendDataToParent(randomDoodad.cost)}> pay </button>*/}
              <button
                className="close-bdeal"
                onClick={() => {
                  toggleModalStartDeal();
                  setModalBigDeal(true);
                  setRandom_big_deal(randomBigDeal());
                }}
              >
                big
              </button>
            </div>
          </div>
        )}

        {modalSmallDeal && (
          <div className="modal-deal">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <br />
              <h4>SMALL DEAL</h4>
              <br />
              <p style={{ color: "green" }}>{random_small_deal.type}</p>
              <p style={{ color: "green" }}>{random_small_deal.name}</p>
              <br />
              <p>{random_small_deal.description}</p>
              <br />
              <p>Cost: {random_small_deal.price}</p>
              <p>Tranding Range: {random_small_deal.range}</p>
              <p>Shares Owned: {random_small_deal.shares_P1}</p>

              <input
                type="number"
                className="inp-count"
                maxLength="2"
                value={count >= 0 ? count : 0}
              />
              <br />
              <button className="plus" onClick={() => setCount(count + 1)}>
                +
              </button>
              <button className="plus" onClick={() => setCount(count - 1)}>
                -
              </button>
              <br />
              <button
                className="close-sdeal"
                onClick={() => {
                  {
                    props.sendDataToParent(count * random_small_deal.price);
                  }
                  random_small_deal.shares_P1 = count;
                  setModalEx(1);
                  setModalSmallDeal(false);

                  props.sendSDealToParent(
                    random_small_deal.price,
                    random_small_deal.name,
                    count
                  );
                  props.sendSDealDetail(random_small_deal);
                }}
              >
                BUY
              </button>

              {/*<button
                className="close-sdeal"
                onClick={() => {
                  setModalEx(1);
                  toggleModalStartSmallDeal();
                  if(count <= random_small_deal.shares_P1){
                    random_small_deal.shares_P1 = random_small_deal.shares_P1 - count;
                  }
                  props.SDSell(random_small_deal)
                }}
              >
                SELL
              </button>*/}
              <button
                className="close-sdeal"
                onClick={() => {
                  toggleModalStartSmallDeal();
                  setModalEx(1);
                }}
              >
                PASS
              </button>

              {/*<input type="number" className="inp-count" maxLength="2"  value={sellCount}  /><br/>
          <button className="" onClick={() => setSellCount(sellCount+1)}>+</button>
          <button onClick={() => setSellCount(sellCount-1)}>-</button>
          <button className="close-cas" onClick= {Small_Deal_Sell}>sell</button>*/}
            </div>
          </div>
        )}

        {loanmodalBD && (
          <div className="modal-deal">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2>Loan</h2>
              <p>You donot have enough funds for purchasing this deal!</p>
              <p>Take out a loan of ${random_big_deal.downPayment - cost_P1} with a monthly payment of {(random_big_deal.downPayment - cost_P1)/10}</p>
              <button
                className="close-sdeal"
                onClick={() => {
                  setLoanModalBD(false);
                  setModalEx(1);
                  props.loan_amount(random_big_deal.downPayment - cost_P1)
                }}
              >
                BORROW
              </button>
              <button
                className="close-sdeal"
                onClick={() => {
                  setLoanModalBD(false);
                  setModalEx(1);
                }}
              >
                PASS
              </button>
            </div>
          </div>
        )}

        {modalBigDeal && (
          <div className="modal-deal">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2>big deal</h2>
              <br />
              <p style={{ color: "green" }}>{random_big_deal.name}</p>
              <p style={{ color: "green" }}>{random_big_deal.type}</p>
              <br />
              <p>{random_big_deal.description}</p>
              <br />
              <p>Cost: {random_big_deal.cost}</p>
              <p>Mortgage: {random_big_deal.mortgage}</p>
              <p>CashFlow: {random_big_deal.cashFlow}</p>
              <p>Downpayment: {random_big_deal.downPayment}</p>
              <button
                className="close-sdeal"
                onClick={() => {
                  setModalBigDeal(false);
                  setModalEx(1);
                  props.sendBDealDetail(random_big_deal)
                  if (random_big_deal.downPayment > cost_P1) {
                    setLoanModalBD(true);
                  }
                  else{props.sendDataToParent(random_big_deal.downPayment)}
                }}
              >
                BUY
              </button>
              <button
                className="close-sdeal"
                onClick={() => {
                  setModalBigDeal(false);
                  setModalEx(1);
                }}
              >
                PASS
              </button>
            </div>
          </div>
        )}

        {modalDownsized && (
          <div className="modal-downsized">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2 style={{ color: "red" }}>DOWNSIZED!!!</h2>
              <br />
              <p className="p1">PAY A FULL SET OF EXPANSES.</p>

              <br />
              <p>WE HAVE TO ADD EXPANSES HERE GIVE ME A REMINDER</p>

              <button
                className="close-sdeal"
                onClick={() => {
                  setModalDownsized(false);
                  setModalEx(1);
                  props.sendDataToParent(exp);
                }}
              >
                PAY
              </button>
            </div>
          </div>
        )}

        {modalMarket && (
          <div className="modal-downsized">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2 style={{ color: "blue" }}>{random_market_card.name}</h2>
              <br />

              <p>{random_market_card.description}</p>

              <button
                className="close-sdeal"
                onClick={() => {
                  setModalEx(1);
                  setModalMarket(false);
                }}
              >
                DONE
              </button>
            </div>
          </div>
        )}

        {modalPayday && (
          <div className="modal-downsized">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2 style={{ color: "blue" }}>Congratulations!!!</h2>
              <br />

              <p>It's Paycheck time.</p>

              <button
                className="close-sdeal"
                onClick={() => {
                  setModalEx(1);
                  setModalPayday(false);
                  props.sendSellData(
                    abc_prof.salary -
                      (abc_prof.exp_taxes +
                        abc_prof.exp_home_mortgage +
                        abc_prof.exp_car_loan +
                        abc_prof.exp_credit_card +
                        abc_prof.exp_other_expanses)
                  );
                }}
              >
                Collect
              </button>
            </div>
          </div>
        )}

        {modalCharity && (
          <div className="modal-downsized">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2 style={{ color: "blue" }}>Give to Charity.</h2>
              <br />

              <p>
                Donate 10% of your total income to roll 1 or 2 die over your
                next 3 turns.
              </p>

              <button
                className="close-sdeal"
                onClick={() => {
                  setModalCharity(false);
                  setModalEx(1);
                  props.sendDataToParent(abc_prof.salary * 0.1);
                }}
              >
                Donate
              </button>
              <button
                className="close-sdeal"
                onClick={() => {
                  setModalCharity(false);
                  setModalEx(1);
                }}
              >
                Pass
              </button>
            </div>
          </div>
        )}

        {modalChild && (
          <div className="modal-downsized">
            <div className="overlay-deal"></div>

            <div className="content-deal">
              <h2 style={{ color: "orange" }}>NEW BABY!!!</h2>
              <br />

              <p>
                Congratulations! One child has been added to your dependents.
              </p>
              <br />
              <h6>Child expanses will be increased by SOME VALUE.</h6>

              <button
                className="close-sdeal"
                onClick={() => {
                  setModalChild(false);
                  setModalEx(1);
                  
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}

        <div className="game-container">
          <table className="board2">
            <tr>
              <td className="cellcor1 board-top2-pay pay-space">
                {" "}
                
                <img className="out" src={pay} alt=" " />
              </td>
              <td className="cell1 board-top2 opp-space2">
                <img className="out" src={movie} alt=" " />
              </td>
              <td className="cell2 board-top2 opp-space2">
                <img className="out" src={research} alt=" " />
              </td>
              <td className="cell3 board-top2 dow-space">
                <img className="out" src={bad} alt=" " />
              </td>
              <td className="cell4 board-top2 opp-space2">
                <img className="out" src={app} app alt=" " />
              </td>
              <td className="cell5 board-top2 opp-space2">
                <img className="out" src={soft} alt=" " />
              </td>
              <td className="cell6 board-top2 opp-space2">
                <img className="out" src={dre} alt=" " />
              </td>
              <td className="cell7 board-top2 opp-space2">
                <img className="out" src={unit} alt=" " />
              </td>
              <td className="cell8 board-top2 opp-space2">
                <img className="out" src={island} alt=" " />
              </td>
              <td className="cell9 board-top2 dow-space">
                <img className="out" src={divo} alt=" " />
              </td>
              <td className="cell10 board-top2 opp-space2">
                <img className="out" src={golf} alt=" " />
              </td>
              <td className="cellr10 board-top2 opp-space2">
                <img className="out" src={pizza} alt=" " />
              </td>
              <td className="cellcor2 board-top2-pay pay-space">
                <img className="out" src={pay} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr2-left">
                <img className="out-lr" src={oil} alt=" " />
              </td>
              <td className="cellr2-center">
                <div className="inner-board"> 
                  <div className="tokk">{die === 0 && <PersonIcon />} </div>
                  <table className="tab">
                    <tr>
                      <td className="cell-inn1">
                        <motion.div  > {die === 1 && <PersonIcon className="token" />}</motion.div>
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-inn2">
                        {die === 2 && <PersonIcon className="token" />}

                        <img className="imm1" src={real} alt=" " />
                      </td>
                      <td className="cell-inn3">
                        {die === 3 && <PersonIcon className="token" />}

                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-inn4">
                        {die === 4 && <PersonIcon className="token" />}

                        <img className="imm1" src={help} alt=" " />
                      </td>
                      <td className="cell-inn5">
                        {die === 5 && <PersonIcon className="token" />}

                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-inn6">
                        {die === 6 && <PersonIcon className="token" />}

                        <img className="imm1" src={salary} alt=" " />
                      </td>
                      <td className="cell-inn7">
                        {die === 7 && <PersonIcon className="token" />}

                        <img className="imm1" src={deal} alt=" " />
                      </td>
                    </tr>
                    <tr>
                      <td className="cell-innr2-left">
                        {die === 24 && <PersonIcon className="token" />}
                        <img className="imm1" src={com} alt=" " />
                      </td>
                      <td className="cell-innr2-center">
                        <div className="in-in-board">
                          <div className="player-list">
                            <div className="game-code">
                              <h4 style={{ paddingTop: 50, paddingRight: 50 }}>
                                Game Code: {props.code}
                              </h4>
                            </div>
                            <div className="play-name1">Player 1</div>
                            <div className="play-name2">Player 2</div>
                          </div>
                          <div className="roll">
                            
                            <div class="cube">
                              <div class="cube__face cube__face--1">1</div>
                              <div class="cube__face cube__face--2">2</div>
                              <div class="cube__face cube__face--3">3</div>
                              <div class="cube__face cube__face--4">4</div>
                              <div class="cube__face cube__face--5">5</div>
                              <div class="cube__face cube__face--6">6</div>
                            </div> 
                              {/*<img className="dice_1" src={d1} />*/}                            
                              
                              <button
                                className="game-button-roll red"
                                onClick={roll}
                              >
                                ROLL
                              </button>

                          </div>
                        </div>
                      </td>
                      <td className="cell-innr2-right">
                        {die === 8 && <PersonIcon className="token" />}
                        <img className="imm1" src={com} alt=" " />
                      </td>
                    </tr>
                    <tr>
                      <td className="cell-innr3-left">
                        {die === 23 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-innr3-right">
                        {die === 9 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                    </tr>
                    <tr>
                      <td className="cell-innr4-left">
                        {die === 22 && <PersonIcon className="token" />}
                        <img className="imm1" src={salary} alt=" " />
                      </td>
                      <td className="cell-innr4-right">
                        {die === 10 && <PersonIcon className="token" />}
                        <img className="imm1" src={real} alt=" " />
                      </td>
                    </tr>
                    <tr>
                      <td className="cell-innr5-left">
                        {die === 21 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-innr5-right">
                        {die === 11 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                    </tr>

                    <tr>
                      <td className="cell-innr6-left">
                        {die === 20 && <PersonIcon className="token" />}
                        <img className="imm1" src={down} alt=" " />
                      </td>
                      <td className="cell-innr6-right">
                        {die == 12 && <PersonIcon className="token" />}
                        <img className="imm1" src={child} alt=" " />
                      </td>
                    </tr>
                    <tr>
                      <td className="cell-inn8">
                        {die === 19 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-inn9">
                        {die === 18 && <PersonIcon className="token" />}
                        <img className="imm1" src={real} alt=" " />
                      </td>
                      <td className="cell-inn10">
                        {die === 17 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-inn11">
                        {die === 16 && <PersonIcon className="token" />}
                        <img className="imm1" src={com} alt=" " />
                      </td>
                      <td className="cell-inn12">
                        {die === 15 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                      <td className="cell-inn13">
                        {die === 14 && <PersonIcon className="token" />}
                        <img className="imm1" src={salary} alt=" " />
                      </td>
                      <td className="cell-inn14">
                        {die === 13 && <PersonIcon className="token" />}
                        <img className="imm1" src={deal} alt=" " />
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
              <td className="cellr2-right">
                <img className="out-lr" src={coll} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr3-left">
                <img className="out-lr" src={sport} alt=" " />
              </td>
              <td className="cellr3-right">
                <img className="out-lr" src={frozen} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr4-left">
                <img className="out-lr" src={auto} alt=" " />
              </td>
              <td className="cellr4-right">
                <img className="out-lr" src={bio} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr5-left">
                <img className="out-lr" src={tax} alt=" " />
              </td>
              <td className="cellr5-right">
                <img className="out-lr" src={unfor} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr6-left">
                <img className="out-lr" src={beauty} alt=" " />
              </td>
              <td className="cellr6-right">
                <img className="out-lr" src={mini} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr7-left">
                <img className="out-lr" src={dry} alt=" " />
              </td>
              <td className="cellr7-right">
                <img className="out-lr" src={dry2} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellr8-left">
                <img className="out-lr" src={fried} alt=" " />
              </td>
              <td className="cellr8-right">
                <img className="out-lr" src={mobile} alt=" " />
              </td>
            </tr>
            <tr>
              <td className="cellcor3">
                <img className="out" src={pay} alt=" " />
              </td>
              <td className="cell11 board-top2 opp-space2">
                <img className="out" src={hobby} alt=" " />
              </td>
              <td className="cell12 board-top2 opp-space2">
                <img className="out" src={ticket} alt=" " />
              </td>
              <td className="cell13 board-top2 dow-space">
                <img className="out" src={law} alt=" " />
              </td>
              <td className="cell14 board-top2 opp-space2">
                <img className="out" src={assist} alt=" " />
              </td>
              <td className="cell15 board-top2 opp-space2">
                <img className="out" src={quick} alt=" " />
              </td>
              <td className="cell16 board-top2 opp-space2">
                <img className="out" src={heat} alt=" " />
              </td>
              <td className="cell17 board-top2 opp-space2">
                <img className="out" src={burger} alt=" " />
              </td>
              <td className="cell18 board-top2 opp-space2">
                <img className="out" src={char} alt=" " />
              </td>
              <td className="cell19 board-top2 dow-space">
                <img className="out" src={health} alt=" " />
              </td>
              <td className="cell20 board-top2 opp-space2">
                <img className="out" src={privat} alt=" " />
              </td>
              <td className="cell21 board-top2 opp-space2">
                <img className="out" src={family} alt=" " />
              </td>
              <td className="cellcor4">
                <img className="out" src={pay} alt=" " />
              </td>
            </tr>
          </table>
        </div>
        <div className="quit-box">
          <a href="/">
            <button className="game-button red">QUIT</button>
          </a>
        </div>
      </main>
    </>
  );
}

export default First;
