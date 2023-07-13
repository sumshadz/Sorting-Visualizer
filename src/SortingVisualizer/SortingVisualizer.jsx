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
	};
}

componentDidMount(){
	this.resetArray();
}

resetArray(){
	const array = [];
	for(let i=0;i<this.ArrayLength;i++){
		array.push(randomIntFromInterval(this.ArrayMinElement,this.ArrayMaxElement));
	}
	this.setState({array});
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
			}, i*this.SortingSpeed);
		}
		else{
			setTimeout(()=>{
				const [barOneIdx, newHeight] =  animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				barOneStyle.height = `${newHeight}px`;
			}, i*this.SortingSpeed);
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
			}, i*this.SortingSpeed);
		}
		else{
			setTimeout(()=>{
				const [barOneIdx, newHeight] =  animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				barOneStyle.height = `${newHeight}px`;
			}, i*this.SortingSpeed);
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
		<button onClick={()=>this.resetArray()} id="generateArray">Generate New Array</button>
		<button onClick={()=>this.merge_Sort()}>Merge Sort</button>
		{/* <button onClick={()=>this.bubbleSort()}>Bubble Sort</button> */}
		{/* <button onClick={()=>this.heapSort()}>Heap Sort</button> */}
		<button onClick={()=>this.quick_Sort()}>Quick Sort</button>
		</div>
		</div>
	) 
		
}

}

function randomIntFromInterval(min,max){
	return Math.floor(Math.random() * (max - min +1) + min);
}
