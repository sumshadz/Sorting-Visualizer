import React from 'react';
import { mergeSort, quickSort } from './SortingAlgorithms';
import './SortingVisualizer.css'

export default class SortingVisualizer extends React.Component{

	SortingSpeed = 3;
	CompareColor = 'red';
	ActionColor = 'turquoise';
	ArrayLength = 90;
	ArrayMinElement = 5;
	ArrayMaxElement = 400;

constructor(props){
	super(props);
	this.state = {
		array: [],
		arrayLength: 90,
		sortingSpeed: 0,
	};
}

componentDidMount(){
	this.resetArray();
}

resetArray(){
	const array = [];
	for(let i=0;i<this.state.arrayLength;i++){
		array.push(randomIntFromInterval(this.ArrayMinElement,this.ArrayMaxElement));
	}
	this.setState({array});
}

setArrayLength(e){
	const arr = [];
	for(let i=0;i<e.target.value;i++){
		arr.push(randomIntFromInterval(this.ArrayMinElement,this.ArrayMaxElement));
	}
	this.setState({array: arr, arrayLength: e.target.value});
}

setSortingSpeed(e){
	const newValue = 8 - parseInt(e.target.value);
	this.setState({sortingSpeed: newValue > 1 ? newValue : 1});
}

merge_Sort() {
	const animations = mergeSort(this.state.array);
	for(let i=0; i<animations.length; i++){
		const arrayBars = document.getElementsByClassName("array-bar");
		const isColorChange = i % 3 !== 2;
		if(isColorChange){
			const [barOneIdx, barTwoIdx] = animations[i];
		    const barOneStyle = arrayBars[barOneIdx].style;
		    const barTwoStyle = arrayBars[barTwoIdx].style;
			const color = i % 3 === 0? this.CompareColor : this.ActionColor;
			setTimeout(() => {
				barOneStyle.backgroundColor = color;
				barTwoStyle.backgroundColor = color;
			}, i*this.state.sortingSpeed);
		}
		else{
			setTimeout(()=>{
				const [barOneIdx, newHeight] =  animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				barOneStyle.height = `${newHeight}px`;
			}, i*this.state.sortingSpeed);
		}
	}
}

quick_Sort() {
	const animations = quickSort(this.state.array);
	for(let i=0; i<animations.length; i++){
		const arrayBars = document.getElementsByClassName("array-bar");
		const isColorChange = i % 3 !== 2;
		if(isColorChange){
			const [barOneIdx, barTwoIdx] = animations[i];
		    const barOneStyle = arrayBars[barOneIdx].style;
		    const barTwoStyle = arrayBars[barTwoIdx].style;
			const color = i % 3 === 0? this.CompareColor : this.ActionColor;
			setTimeout(() => {
				barOneStyle.backgroundColor = color;
				barTwoStyle.backgroundColor = color;
			}, i*this.state.sortingSpeed);
		}
		else{
			setTimeout(()=>{
				const [barOneIdx, newHeight] =  animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				barOneStyle.height = `${newHeight}px`;
			}, i*this.state.sortingSpeed);
		}
	}
}

render(){
	const {array} = this.state;

	return (
		<div className="container">
			<div className="array-container">
		{array.map((value,ind) => (
			<div className="array-bar" key={ind} style={{height: `${value}px`}}>
			</div>
		))}
		</div>
<div className="menu">
	<div className="range">
	<span>Array Length</span>
	<input  className="arrayLength" type="range" max={90} min={10} value={this.state.arrayLength} onChange={(e)=>this.setArrayLength(e)}/>
	</div>
	<div className="range">
	<span>Sorting Speed</span>
	<input  className="arrayLength" type="range" max={8} min={1} value={8-this.state.sortingSpeed} onChange={(e)=>this.setSortingSpeed(e)}/>
	</div>
		<button onClick={()=>this.resetArray()} id="generateArray">Generate New Array</button>
		<button onClick={()=>this.merge_Sort()}>Merge Sort</button>
		<button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
		{/* <button onClick={()=>this.heapSort()}>Heap Sort</button> */}
		{/* <button onClick={()=>this.quick_Sort()}>Quick Sort</button> */}
		</div>
		</div>
	) 
		
}

}

function randomIntFromInterval(min,max){
	return Math.floor(Math.random() * (max - min +1) + min);
}
