import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/cards/Card';
import {useSelector,useDispatch} from "react-redux"
import { failedChoice,successChoice } from './components/players/playersActions';
import { matched } from './components/cards/cardSlice';
import Results from './components/results/Results';
// import ChangeRoute from './components/ChangeRoute';

const cardImages = [
  {"src":"/imgs/cplusplus.png",matched:false,index:-1},
  {"src":"/imgs/csharp.png",matched:false,index:-1},
  {"src":"/imgs/java.png",matched:false,index:-1},
  {"src":"/imgs/javascript.png",matched:false,index:-1},
  {"src":"/imgs/mysql.png",matched:false,index:-1},
  {"src":"/imgs/python.png",matched:false,index:-1},
  {"src":"/imgs/r.png",matched:false,index:-1},
  {"src":"/imgs/react.png",matched:false,index:-1},
  {"src":"/imgs/server.png",matched:false,index:-1},
  {"src":"/imgs/vuejs.png",matched:false,index:-1},
]

const App = ()=> {
  const playersResults = useSelector((state)=>state.players.playersResult)
  const matchedCards = useSelector((state)=>state.cards.numberOfMatchedCards)
  const dispatch = useDispatch()
  const [cards,setCards] = useState([])
  const [cardOne,setCardOne] = useState(null)
  const [cardTwo,setCardTwo] = useState(null)
  const [playerOnename,setPLayerOneName] = useState("")
  const [playerTowname,setPLayerTwoName] = useState("")
  const [tries,setTries] = useState(0)
  const [disapled,setDisapled] = useState(false)
  const [player,setPlayer] = useState("play-player1")
  const [endGame,setEndGame] = useState(false)


  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages].sort(()=>Math.random() - 0.5)
    .map((card,idx)=>({...card,id:Math.random(),index:idx+1}));
    setCards(shuffledCards);
    setCardOne(null)
    setCardTwo(null)
  }

  const reachEnd=()=>{
    setEndGame(false)
  }
  const handleStartGame = ()=>{
    shuffleCards();
    let name1 = prompt("Please Insert The Name Of Player one ? ")
    let name2 = prompt("Please Insert The Name Of Player one ? ") 
    if(name1 === null || name1 === ""){
      name1 = "Player One";
    }
    if(name2 === null || name2 === ""){
      name2 = "Player Two";
    }
    setPLayerOneName(name1)
    setPLayerTwoName(name2)
  }

  const handleClickedChoice = (card)=>{
    if(!disapled)
    cardOne ? setCardTwo(card) : setCardOne(card)
  }

  const resetTurn= ()=>{
    setCardOne(null)
    setCardTwo(null)
    setTries(prevTries => prevTries + 1);
    setDisapled(false)
  }

  useEffect(()=>{
    if(cardOne&&cardTwo){
      setDisapled(true)
      if(cardOne.src === cardTwo.src){
        setCards(prevCards=>{
          return prevCards.map((card)=> card.src===cardOne.src?{...card,matched:true}:card)
        })
        dispatch(successChoice({playerName:player==="play-player1"?playerOnename:playerTowname,choicesCardText:"he was choiced card number "+cardOne.index+" and card number "+cardTwo.index}))
        dispatch(matched())
        if(matchedCards===9){
          setEndGame(true)
        }
      }else{
        dispatch(failedChoice({playerName:player==="play-player1"?playerOnename:playerTowname,choicesCardText:"he was choiced card number "+cardOne.index+" and card number "+cardTwo.index}))
      }
      setTimeout(()=>resetTurn(),500);
      setTimeout(()=>player==="play-player1"?setPlayer("play-player2"):setPlayer("play-player1"),550);
    }
  },[cardOne,cardTwo])
  
  return (
    <div>
        {((playerOnename==null||playerOnename=="")&&(playerTowname==null||playerTowname==""))?
      (<div className="control-buttons">
        <span onClick={handleStartGame}>Start Game</span>
      </div>):""}

      {endGame?(<Results players={playersResults} player1={playerOnename} player2={playerTowname}/>):(<><div className='playersBar'>
      <div className= {`player_1 ${player==="play-player1"?"play":""}`}>{playerOnename}</div>
      <div className={`player_2 ${player==="play-player2"?"play":""}`}>{playerTowname}</div>
    </div>
    <div className="memory-game-blocks">
      {cards?.map(card=>
      (<Card
      key={card.id}
      card={card} 
      disapled={disapled}
      handleClickedChoice={handleClickedChoice}
      flipped={card === cardOne || card === cardTwo || card.matched}/>))}
    </div></>)}
    </div>
      
  );
}

export default App;
