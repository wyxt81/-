;(function(){
	function Slider(obj){
			var othis = this;
			this.currentIndex = 0;
			this.obj = obj;
			this.timer = null;
			this.width = this.obj.offsetWidth - 2;
			this.sliderBox = obj.querySelector('.sliderbox');
			this.imgLis = obj.querySelectorAll('.sliderbox li');
			this.len = this.imgLis.length;
			this.sliderBtns = [];
			this.createDom();
			
			console.info(this.width);
			this.leftBtn.addEventListener('click',function(){
				clearInterval(othis.timer);
				othis.prev();
			})
			this.rightBtn.addEventListener('click',function(){
				
				othis.next();
			})
			this.autoPlay();
			

			this.obj.onmouseenter = function(){
				clearInterval(othis.time);
			}
			this.obj.onmouseleave = function(){
				othis.autoPlay();
			}

			for(var i = 0;i<this.len;i++){
				this.sliderBtns[i].onmouseenter = (function(index){
					return function(){
						if(othis.currentIndex == 3 && index == 0){
							othis.rightBtn.click();
						}else if(othis.currentIndex == 0 && index == 3){
							othis.leftBtn.click();
						}else{
							othis.currentIndex = index;
							othis.moveTo(index);
							
						}
					}
				})(i)
			}
		}
		Slider.prototype.createDom = function(){
			//创建开头结尾的图片
			var t1 = this.imgLis[0].cloneNode(true);
			var t2 = this.imgLis[this.len-1].cloneNode(true);
			this.sliderBox.appendChild(t1);
			this.sliderBox.insertBefore(t2,this.imgLis[0]);
			//创建下标
			this.sliderBtnsBox = document.createElement('ol');
			this.sliderBtnsBox.className = 'sliderbtn';
			for(var i = 0;i<this.len;i++){
				this.sliderBtns[i] = document.createElement('li');
				this.sliderBtnsBox.appendChild(this.sliderBtns[i]);
			}
			this.sliderBtns[this.currentIndex].className = 'cur';
			this.obj.appendChild(this.sliderBtnsBox);
			//创建左右按钮
			this.leftBtn = document.createElement('a');
			this.leftBtn.className = 'btn leftbtn';
			this.leftBtn.href = 'javascript:void(0)';
			this.obj.appendChild(this.leftBtn);
			this.rightBtn = document.createElement('a');
			this.rightBtn.className = 'btn rightbtn';
			this.rightBtn.href = 'javascript:void(0)';
			this.obj.appendChild(this.rightBtn);
		}
		Slider.prototype.autoPlay = function(){
			var othis =this;
			this.time = setInterval(function(){
				othis.next();
			},2000)
		}
		Slider.prototype.prev = function(){
			this.currentIndex--;
			if(this.currentIndex == -1){
				this.sliderBox.style.left = -(this.len+1)*this.width + 'px';
				console.info("我执行了");
				console.info(this.sliderBox.offsetLeft);
				this.currentIndex = this.len-1;
			}
			this.moveTo(this.currentIndex);
		}
		Slider.prototype.next = function(){
			this.currentIndex++;
			if( this.currentIndex == this.len ){
				this.sliderBox.style.left = 0 +'px';
				this.currentIndex = 0;
			}
			this.moveTo(this.currentIndex);
		}
		Slider.prototype.moveTo = function(index){
			var distance = -(index+1)*this.width;
			var othis = this;
			for(var i = 0 ;i<this.len;i++){
				this.sliderBtns[i].className = '';
			}
			this.sliderBtns[this.currentIndex].className = 'cur';
			clearInterval(this.timer);
			console.info(this.currentIndex);
			this.timer = setInterval(function(){
				//这里决定图片是向左还是向右
				var speed = (distance-othis.sliderBox.offsetLeft)/othis.len;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				//console.info(speed);
				if(speed==0){
					clearInterval(othis.timer);
				}else{
					othis.sliderBox.style.left = othis.sliderBox.offsetLeft + speed + 'px';
				}
			},50)
		}

		window.addEventListener('load',function(){
			var obj = document.querySelectorAll('.slider');
			for( var i =0;i<obj.length;i++ ){
				var s1 = new Slider(obj[i]);
			}
		})
})()