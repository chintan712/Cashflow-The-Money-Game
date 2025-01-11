import React, { useState } from "react";
import { Link } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import "./Homepage.css";
import logo_cashflow from "../assets/output.png";

const Homepage = () => {
  const [modalS, setModalS] = useState(false);
  const [modalI, setModalI] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const toggleModalStart = () => {
    setModalS(!modalS);
  };

  const toggleModalInst = () => {
    setModalI(!modalI);
  };

  if (modalS) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalI) {
    document.body.classList.add("active-modal-instruct");
  } else {
    document.body.classList.remove("active-modal-instruct");
  }

  return (
    <>
      <div className="Homepage">
        <div className="homepage-menu">
          <img src={logo_cashflow} className="imgLogo" width="600px" />
          <div className="homepage-form">
            <div className="homepage-join">
              <button className="game-button green" onClick={toggleModalStart}>
                START GAME
              </button>
            </div>
            <div className="homepage-create">
              <button className="game-button orange" onClick={toggleModalInst}>
                INSTRUCTIONS
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalS && (
        <div className="modal">
          <div onClick={toggleModalStart} className="overlay"></div>
          <div className="modal-content">
            <img
              className="img-mouse"
              src={require("../assets/rat_running.png").default}
            />
            <div className="homepage-form-modal">
              <div className="homepage-join-modal">
                <input
                  type="text"
                  placeholder="Game Code"
                  onChange={(event) => setRoomCode(event.target.value)}
                />
                <Link to={`/play?roomCode=${roomCode}`}>
                  <button className="game-button green">JOIN GAME</button>
                </Link>
                <p>OR</p>
                <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}>
                  <button className="game-button red">CREATE GAME</button>
                </Link>
              </div>
            </div>
            <a className="close" onClick={toggleModalStart} />
          </div>
        </div>
      )}

      {modalI && (
        <div style={{ overflowX: "auto", fontSize: "14px" }} className="modal-instruct">
          <div onClick={toggleModalInst} className="overlay-instruct"></div>

          <div className="modal-content-instruct">
            <h2 style={{ color: "black", fontFamily: "inherit" }}>
              INSTRUCTIONS
            </h2>
            <div className="question-font">
              <p>What is the CASHFLOW game?</p>
            </div>
            <p>
              CASHFLOW (originally titled CASHFLOW 101) is an educational board
              game built upon the lessons from the New York Times best-seller in
              personal finance, Rich Dad Poor Dad. In the industry-challenging,
              thought-provoking book, author Robert Kiyosaki explains what the
              rich teach their children about money that the poor and
              middle-class do not. <br />
              CASHFLOW isn’t your average financial literacy game. The
              award-winning personal finance game uses the best components of
              stock investing games, business building games, and real estate
              investing games to challenge your perception of how to generate
              and sustain wealth.
            </p>
            <div className="question-font">
              <p>What Will Playing CASHFLOW The Board Game Do for You?</p>
            </div>
            <p>
              CASHFLOW won’t teach you how to get a promotion or find a better
              job… but it will enable you to travel the world, cure a disease or
              save the rainforest… if that’s your dream. This simple board game
              about money will give you the motivation and roadmap to retire
              young and rich, giving you a better life for you and your family…
              all through game play! <br />
              How? By teaching you investing strategies, thoughts, mindsets and
              secrets of money creation that only the rich know. <br />
              Can a board game really do all that? <br />
              Absolutely!
            </p>
            <div className="question-font">
              <p>Play CASHFLOW and...</p>
            </div>
            <ul>
              <li>
                Discover what financial habits keep you stuck in the Rat Race
                (and how shifting your mindset can help you change your habits)
              </li>
              <li>
                Understand how to turn ordinary earned income into positive
                passive income (WITHOUT slaving away at a job)
              </li>
              <li>
                Master the ability to acquire cash-flowing assets (while
                limiting money-sucking liabilities)
              </li>
              <li>
                Enjoy an exciting new way to bond with your family (while
                raising their financial IQ at the same time!)
              </li>
            </ul>
            <div className="question-font">
              <p>Playing Rules</p>
            </div>
            <p>
              The board consists of two tracks known as the rat race and the
              fast race. The rat race uses one die to move and the fast race
              uses two. Players get paid for passing the paycheck marker on the
              rat race track, at which point they select a card, which can offer
              a wide range of good or bad deals. <br />
              The fast race track gives players too much money and so, they have
              to decide where to invest it before losing it. <br />
              The game is based around financial sheets which are completed by
              players after they choose their starting career. After they begin
              investing, they have to make a note of the changes on their
              financial sheets. <br />
              The winner is the first person to either have a monthly income of
              $50,000 or the person who purchases their Dream.
            </p>
            <ol>
              <li style={{ color: "red" }}>Choose your dream </li>
              <p>
                Once you join (or start) a free online game of CASHFLOW Classic,
                the first thing you need to do is choose your dream. <br />
                Your dream is the reason for taking on the challenge of escaping
                the Rat Race. It’s your why.
              </p>
              <li style={{ color: "red" }}>Pick a Small or Big Deal</li>
              <p>
                Next, roll the dice! When you are presented with an opportunity
                to take advantage of a Small Deal or a Big Deal, remember the
                goal: you want to acquire passive income that covers your
                monthly expenses.{" "}
              </p>
              <li style={{ color: "red" }}>Earned Income</li>
              <p>
                Watch your income grow with every roll. Just don’t plan on
                saving it to win the game.{" "}
              </p>
              <li style={{ color: "red" }}>Give to Charity</li>
              <p>
                Land on the charity spot and donate 10% of your total income.
                Roll 1 or 2 die over your next 3 turns to get more opportunities
                to create wealth.
              </p>
              <li style={{ color: "red" }}>Follow the Market</li>
              <p>
                You’ve purchased some stock, started a business, and bought some
                real estate properties… now it’s time to collect on your
                investments. <br />
                Buy low and sell high? Only if you’re using the cash to purchase
                bigger deals.
              </p>
              <li style={{ color: "red" }}>Live Life in the Fast Track</li>
              <p>
                Once you get enough Small and Big Deals to cover your expenses,
                you’ve done it! You’re out of the Rat Race and living life in
                the Fast Track. <br />
                How does the Fast Track work? <br />
                There are no such things as Small Deals on the Fast Track. Pick
                and choose how much cash flow you want coming in each month to
                get you closer to achieving your dream.
              </p>
            </ol>
            <p style={{ color: "green" }}>
              THAT'S HOW YOU GET OUT OF RAT RACE AND WIN AT CASHFLOW.
            </p>

            <button className="close-modal-instruct" onClick={toggleModalInst}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
