
/**
 * Класс описывает отношение проход/переход двух сегментов.
 * Для его использования нужно, чтобы сегменты были разбиты и каждый имел только одно пересечение
 */
class Crossing{
	constructor(segA, segB){
		this.segments = [segA, segB];
		segA.crossing = this;
		segB.crossing = this;
	}
	
	/**
	 * @param segment - сегмент, роль которого устанавливается
	 * @param over : Boolean - признак перехода. В противном случае устанавливается проход
	 */
	setOrdo(segment, over){
		for(let seg of this.segments){
			if((seg === segment) === over){
				this.over = seg;
			}
			else{
				this.under = seg;
			}
		}
	}
	
	isOver(segment){
		return this.over === segment;
	}
	
	isUnder(segment){
		return this.under === segment;
	}
	
	/**
	 * @param segment - сегмент, роль которого устанавливается
	 * @param over : Boolean - признак перехода. В противном случае устанавливается проход
	 */
	controlOrdo(segment, over){
		if(this.over){
			if(this.isOver(segment) !== over){
				throw new Error('Conflict a crossing status');
			}
		}
		else{
			this.setOrdo(segment, over);
		}
	}
	
}

module.exports = Crossing;