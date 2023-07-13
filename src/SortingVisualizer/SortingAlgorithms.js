export function mergeSort (array) {
	const animations = [];
	if(array.length <= 1) return array;
	const tempArray = array.slice();
	mergeSortHelper(array, 0, array.length-1, tempArray, animations);
	return animations;
};

function mergeSortHelper (mainArray, startInd, endInd, tempArray, animations){
	if(startInd === endInd) return;
	const middleindex = Math.floor((startInd + endInd)/2);
	mergeSortHelper(tempArray, startInd, middleindex, mainArray, animations);
	mergeSortHelper(tempArray, middleindex+1, endInd, mainArray, animations);
	doMerge(mainArray, startInd, middleindex, endInd, tempArray, animations);
}

function doMerge(mainArray, startInd, middleindex, endInd, tempArray, animations) {
	let k = startInd;
	let i = startInd;
	let j = middleindex + 1;

	while(i <= middleindex && j <= endInd){
		animations.push([i,j]);
		animations.push([i,j]);
		if(tempArray[i] <= tempArray[j]){
			animations.push([k,tempArray[i]]);
			mainArray[k++]=tempArray[i++];
		}
		else{
			animations.push([k, tempArray[j]]);
			mainArray[k++]=tempArray[j++];
		}
	}
	while(i <= middleindex){
		animations.push([i, i]);
		animations.push([i, i]);
		animations.push([k, tempArray[i]]);
		mainArray[k++]=tempArray[i++];
	}
	while(j <= endInd){
		animations.push([j,j]);
		animations.push([j,j]);
		animations.push([k,tempArray[j]]);
		mainArray[k++]=tempArray[j++];
	}
}


//Quick Sort Algorithm

export function quickSort (array) {
	const animations = [];
	if(array.length <= 1) return array;
	const tempArray = array.slice();
	quickSortHelper(array, 0, array.length-1, tempArray, animations);
	return animations;
};

function quickSortHelper (array, low, high, tempArray, animations){
	if(low<high){
		let pivotIndex = getPivot(array, low, high, tempArray, animations);
		quickSortHelper(array, low, pivotIndex-1, tempArray, animations);
		quickSortHelper(array, pivotIndex+1, high, tempArray, animations);
	}
}

function getPivot (array, low, high, tempArray, animations){
	let pivot = tempArray[low];
	let i = low, j = high;
	while(i<j){
		while(tempArray[i]<=pivot && i<high){
			i++;
		}
		while(tempArray[j]>pivot && j>low){
			j--;
		}
		if(i<j){
			animations.push([i,j]);
		    animations.push([i,j]);
		    animations.push([i,tempArray[j]]);

			animations.push([i,j]);
		    animations.push([i,j]);
		    animations.push([j,tempArray[i]]);

			let temp = tempArray[j];
			tempArray[j] = tempArray[i];
			tempArray[i] = temp;
		}
	}
	animations.push([low,j]);
	animations.push([low,j]);
	animations.push([j,pivot]);
	animations.push([low,j]);
	animations.push([low,j]);
	animations.push([low,tempArray[j]]);
	let temp = tempArray[j];
	tempArray[j] = tempArray[low];
	tempArray[low] = temp;
	return j;
}