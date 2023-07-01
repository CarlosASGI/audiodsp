// ==UserScript==
// @name         audiodsp-test1
// @namespace    http://github.com/CarlosASGI
// @version      0.1
// @description  try to take over the world!
// @author       CarlosASGI
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //Compresion multibanda en Javascript hecho por CarlosASGI
//<---------DECLARAMOS LAS VARIABLES------->
const media=document.querySelector("video"); // <- Selecciona el video
const audioCtx=new AudioContext(); // <- Crea un contexto de audio (AudioContext)

//Declaramos las frecuencias
var f0=120;
var f1=400;
var f2=6000;
/*
Como supongo que quedaria:
Banda 1: Bajos hasta 120hz
Banda 2: 120hz hasta 400hz
Banda 3: 400hz hasta 6000hz
Banda 4: 6000 hasta Agudos
*/

//Declaramos los filtros
const preGain=audioCtx.createGain(); //Crea el elemento de pre ganancia en el contexto de audio
preGain.gain.value=1;


const preCompressor=audioCtx.createDynamicsCompressor(); //Crea un pre compresor en el contexto de audio
preCompressor.threshold.value=-0;
preCompressor.knee.value=9;
preCompressor.ratio.value=20;
preCompressor.attack.value=1;
preCompressor.release.value=1;


const bF0=audioCtx.createBiquadFilter();
bF0.type="lowpass";
bF0.frequency.value=f0;
bF0.Q.value=1;

const bF1=audioCtx.createBiquadFilter();
bF1.type="highpass";
bF1.frequency.value=f0;
bF1.Q.value=1;

const bF2=audioCtx.createBiquadFilter();
bF2.type="lowpass";
bF2.frequency.value=f1;
bF2.Q.value=1;

const bF3=audioCtx.createBiquadFilter();
bF3.type="highpass";
bF3.frequency.value=f1;
bF3.Q.value=1;

const bF4=audioCtx.createBiquadFilter();
bF4.type="lowpass";
bF4.frequency.value=f2;
bF4.Q.value=1;

const bF5=audioCtx.createBiquadFilter();
bF5.type="highpass";
bF5.frequency.value=f2;
bF5.Q.value=1;
//--------------------------------PASE 2---------------
const bF0_1=audioCtx.createBiquadFilter();
bF0_1.type="lowpass";
bF0_1.frequency.value=f0;
bF0_1.Q.value=1;

const bF1_1=audioCtx.createBiquadFilter();
bF1_1.type="highpass";
bF1_1.frequency.value=f0;
bF1_1.Q.value=1;

const bF2_1=audioCtx.createBiquadFilter();
bF2_1.type="lowpass";
bF2_1.frequency.value=f1;
bF2_1.Q.value=1;

const bF3_1=audioCtx.createBiquadFilter();
bF3_1.type="highpass";
bF3_1.frequency.value=f1;
bF3_1.Q.value=1;

const bF4_1=audioCtx.createBiquadFilter();
bF4_1.type="lowpass";
bF4_1.frequency.value=f2;
bF4_1.Q.value=1;

const bF5_1=audioCtx.createBiquadFilter();
bF5_1.type="highpass";
bF5_1.frequency.value=f2;
bF5_1.Q.value=1;

/*
Quedaria tal que asi
bF0: Bajos hasta 120hz (lowpass)
bF1: 120 hasta Agudos (highpass)
bF2: ahora usando bF1: 120 hasta 400 (lowpass)
asi sucesivamente esto me confunde la verdad jajaja
*/

//Ahora los compresores
const compressor0=audioCtx.createDynamicsCompressor(); //Crea el compresor0 en el contexto de audio
compressor0.threshold.value=-6;
compressor0.knee.value=9;
compressor0.ratio.value=20;
compressor0.attack.value=0;
compressor0.release.value=1;

const compressor1=audioCtx.createDynamicsCompressor(); //Crea el compresor1 en el contexto de audio
compressor1.threshold.value=-10;
compressor1.knee.value=9;
compressor1.ratio.value=20;
compressor1.attack.value=0;
compressor1.release.value=0.8;

const compressor2=audioCtx.createDynamicsCompressor(); //Crea el compresor2 en el contexto de audio
compressor2.threshold.value=-12;
compressor2.knee.value=9;
compressor2.ratio.value=20;
compressor2.attack.value=0;
compressor2.release.value=0.1;

const compressor3=audioCtx.createDynamicsCompressor(); //Crea el compresor3 en el contexto de audio
compressor3.threshold.value=-10;
compressor3.knee.value=9;
compressor3.ratio.value=20;
compressor3.attack.value=0;
compressor3.release.value=0.1;

const postCompressor=audioCtx.createDynamicsCompressor(); //Crea un post compresor para tratar de no saturar el audio
postCompressor.threshold.value=-2;
postCompressor.knee.value=0;
postCompressor.ratio.value=20;
postCompressor.attack.value=0;
postCompressor.release.value=0.1;

const postGainMix=audioCtx.createGain(); //Crea una post ganancia que sirve como mix en el contexto del audio

//funciones
function connectBands(b1,b2,out){
    b1.connect(b2);
    b2.connect(out);
};

//funcion main
function main(){

};
function test(){
    const source=audioCtx.createMediaElementSource(media);
    source.connect(preGain);
    preGain.connect(preCompressor);
    preCompressor.connect(bF0);
    preCompressor.connect(bF1);
    preCompressor.connect(bF3);
    preCompressor.connect(bF5);
    connectBands(bF0,bF0_1,compressor0);
    connectBands(bF1,bF1_1,bF2);
    connectBands(bF2,bF2_1,compressor1);
    connectBands(bF3,bF3_1,bF4);
    connectBands(bF4,bF4_1,compressor2);
    connectBands(bF5,bF5_1,compressor3);
    compressor0.connect(postCompressor);
    compressor1.connect(postCompressor);
    compressor2.connect(postCompressor);
    compressor3.connect(postCompressor);
    //connectBands(bF1,bF1_1,postGainMix);
    //connectBands(bF3,bF4,postGainMix);
    //preCompressor.connect(bF5);
    //bF5.connect(postGainMix);
    /*preCompressor.connect(bF0);
    bF0.connect(postGainMix);
    preCompressor.connect(bF1);
    bF1.connect(bF2);
    bF2.connect(postGainMix);
    preCompressor.connect(bF3);
    bF3.connect(bF4);
    bF4.connect(postGainMix);
    preCompressor.connect(bF5);
    bF5.connect(postGainMix);*/
    postCompressor.connect(postGainMix);
    postGainMix.connect(audioCtx.destination);
};
//main();
test();

    // Your code here...
})();