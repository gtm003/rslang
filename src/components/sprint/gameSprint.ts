const getOderArr = (n : number) : number[] => {
  let arr : number[] = [];
  Array(n).fill(1).forEach((item, index) => arr.push(index));
  return arr;
};

const getRandomOderArr = (n : number) : number[] => {
  let array = getOderArr(n);
  for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export class GameSprintModel {
  quantity : number;
  indexes : number[];
  indexWord : number;
  indexTranslate : number;
  countCorrect = 0;
  countError = 0;

  
  constructor(quantity: number) {
    this.quantity = quantity;
    this.indexes = getRandomOderArr(this.quantity);
    this.indexWord = 0;
    this.indexTranslate = 0;
  }

  increment(a: boolean) : void {
    if (a) this.countCorrect += 1
    else this.countError +=1
  }
}