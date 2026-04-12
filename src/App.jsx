/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"
import Swal from "sweetalert2";


function App() {
  const [count,setCount] = useState(0);
  const [like,setLike] = useState(false);
  const [name,setName] = useState('Player');
  const [level,setLevel] = useState('Easy');
  const [symbol,setSymbol] = useState(null);
  const [symbolTime,setSymbolTime] = useState(0);
  const [gameSet,setGameSet] = useState(true);
  const [gameStart,setGameStart] = useState(false);
  const [score,setScore] = useState(0);
  const [time,setTime] = useState(10);
  const [right,setRight] = useState(null);
  const starter = useRef(null);
  
  
  // Click Handle
  const handleClick = (e) => {
    const counter = e.target.id;
    if (counter === 'Tambah'){
      setCount(c => c+1);
    } else if (counter === 'Kurang'){
      setCount(c => c-1);
    } else if (counter === 'Reset') {
      setCount(0)
    }

    handleSymbol(counter)
  }

  // Symbol Handle
  const handleSymbol = (counter) => {
    if (!right){
      if (counter === symbol){
        setRight('benar');
        setScore(s => s + Math.ceil(Math.random() * 10))
      } else {
        setRight('salah');
        setScore(s => s - 5);
      }

    }
  }

  // Setup Player
  useEffect(() => {
    if (gameSet){
      setGameSet(false);
      const menu = async () => {
        const { value: playerName } = await Swal.fire({
          title: 'Nama Kamu : ',
          input:'text',
          confirmButtonText:'Simpan',
          allowOutsideClick:false,
          inputValidator: (value) => {
            if (!value) return 'Nama harus di isi!'
          }
        });

        if (playerName) {
          setName(playerName)

          


          const {value : playerLevel} = await Swal.fire({
            title:'Pilih Level',
            input:'radio',
            inputOptions:{
              'Easy' : 'Mudah',
              'Normal' : 'Normal',
              'Hard' : 'Sulit'
            },
            inputValidator: (value) => {
              if (!value) return 'Pilih Level terlebih dahulu!'
            },
            allowOutsideClick:false
          })

          if (playerLevel) {
            setLevel(playerLevel);
            console.log(playerLevel);
            setGameStart(true)
          }
        }
      }
      menu();
    }
    
  }, [gameSet]);


  // Waktu
  useEffect(() => {
    let interval = null;
    let spawnSymbol = null;
    const symbolList = ['Tambah','Kurang','Reset'];
    if (gameStart){
      interval = setInterval(() => {
        
        setTime(prev => prev - 1)
        setSymbolTime(prev => prev + 1);
        

        if (level === 'Easy'){
          spawnSymbol = symbolTime % 50 == 0;
        } else if (level === 'Normal'){
          spawnSymbol = symbolTime % 20 == 0;
        } else if (level === 'Hard'){
          spawnSymbol = symbolTime % 3 == 0;
        }
        
        if (spawnSymbol){
          if (starter.current){
            setScore(s => s - 1);
          }
          setSymbol(symbolList[Math.floor(Math.random() * symbolList.length)]);
          setRight(null);
          starter.current = true;
          
          
        }
        
      },1000);
    }   
    return () => clearInterval(interval);
  
  },[gameStart])


  // Waktu Habis
  useEffect(() => {
    if (time <= 0){
      setGameStart(false);
      Swal.fire({
        title:'Waktu Habis!',
        text:'Score Kamu : ' + score,
        icon:'info',
        confirmButtonText:"Main Lagi!",
        allowOutsideClick:false,
      }).then(result => {
        if (result.value) {
          setGameSet(true);
          setName('Player');
          setTime(10);
          setScore(0);
          setSymbol(null);
          setSymbolTime(0);
          setRight(null);
          setCount(0);
          starter.current = null;
        }
      })
    }
  },[time])


  return (
    <>
    <div className="container-fluid bg-dark text-light  d-flex flex-column min-vh-100">
      
      <div className="row ">
        <div className="border col-md-12 bg-secondary d-flex fw-bold justify-content-between align-items-center">
          <h1 className="text-warning" style={{fontWeight:"bolder"}}><i className="bi bi-controller mx-1"></i>React Counter</h1>
          <h3><i className="bi bi-person mx-1"></i>Player : {name}</h3>
          <h3><i className="bi bi-clock mx-1"></i>Time -  {String(Math.floor(time / 60)).padStart(2,'0')} : {String(time % 60).padStart(2,'0')}</h3>
          <i onClick={() => setLike(l => !l)} className={`bi ${like ? 'bi-heart-fill' : 'bi-heart' }`} style={{fontSize:"2rem",cursor:"pointer"}}></i>
        </div>
        <div className="shadow-lg col-md-12 bg-primary">
          <h2 style={{fontWeight:"bold"}}><i className="bi bi-award text-dark"></i> Score : <span className="text-warning">{score}</span></h2>
        </div>
      </div>
     
     <div className="row  flex-grow-1 justify-content-center align-items-center text-center">

        {/* Symbol */}
        <div className="border shadow-lg col-md-5 bg-dark rounded-5 align-items-center justify-content-center d-flex flex-column" style={{height:'150px'}}>
          <h1 className={`text-${right ? right === 'benar' ? 'warning': 'danger' : 'light'}`}>{symbol}</h1>
        </div>
        <div className="col-md-12"></div>
        {/* Counter */}
        <div className=" col-md-4 bg-secondary p-4 rounded-4 justify-content-center shadow-lg text-light" style={{height:"175px",marginTop:"-260px"}}>
          <div className="col-md-12"><h3>Counter</h3></div>
          <div className="col-md-12 d-flex gap-3 justify-content-center mt-2 ">
            <button id='Tambah' onClick={(e) => handleClick(e)} className="btn btn-warning w-25"><i className="bi bi-plus-lg"></i></button>
            <h4>{count}</h4>
            <button id='Kurang' onClick={(e) => handleClick(e)} className="btn btn-dark w-25"><i className="bi bi-dash-lg"></i></button>
          </div>
          <div className="col-md-12 mt-3"><button id='Reset' onClick={(e) => handleClick(e)} className="btn btn-danger w-50">Reset</button></div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default App
