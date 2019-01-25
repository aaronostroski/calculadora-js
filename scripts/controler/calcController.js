class CalcController {

    // PARAMETROS SÃO INFORMAÇÕES NECESSARIAS PARA AQUELA FUNÇÃO FUNCIONAR

    constructor(){

        this._operation = [];
        this._locale = 'pt-br';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');

        // atributos iniciado por _ são private e so podem ser ace-
        this._currentDate;        // ssados pela própria classe.

        this.initialize(); // quando inicia a calculadora começa aqui
        
        this.initButtonEvents();
            // evento sao ações disparadas em um click
    }

    initialize(){

        //displayCalcEl.innerHTML = '4 5 6 7';
        //this._dateEl.innerHTML = '08/11/2018';
        //this._timeEl.innerHTML = '14:30';

        this.setDisplayDateTime();

        setInterval(()=>{

            this.setDisplayDateTime();


        }, 1000 );

        /*setTimeout(()=>{

            clearInterval(interval);

        }, 10000); */
    }

    clearAll(){

        this._operation = [];    
    }

    clearEntry(){

        this._operation.pop();
    }

    setError(){

        return this.displayCalc = 'Error';
    }

    getLastOperation(){
        
        return this._operation[this._operation.length-1];
    }

    isOperator(value){

        return (['+','-','*','%','/'].indexOf(value) > -1);

    }

    setLastOperation(value){

        this._operation[this._operation.length -1 ] = value;
    }

    pushOperation(value){

        this._operation.push(value);

        if (this._operation.length > 3){


            this.calc();

            console.log(this._operation);

        }
    }

    calc(){

        let last = this._operation.pop();

        eval(this._operation.join(''));
    }

    addOperation(value){

        console.log('A', value, isNaN(this.getLastOperation()));

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

               this.setLastOperation(value);

            } else if (isNaN(value)) {
            
                console.log('caiu no else if', value);

            } else {

                this.pushOperation(value);
            }

            //string

        } else {

            if(this.isOperator(value)){

                this.pushOperation(value);

            }

            else {

                let newValue = this.getLastOperation().toString() + value.toString();

            this.setLastOperation(parseInt(newValue));

            }

            
            //number
        }
        

        console.log(this._operation);

        // para adicionar um item no array, metodo push
    }

    addEventListenerAll(element, event, fn){

        event.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        });

    }

    execBtn(value){

        switch(value){

            case 'ac':
            
                this.clearAll();
                break;
            case 'ce':

                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');

                break;
            case 'subtracao':
            this.addOperation('-');


            break;
            case 'divisao':
            this.addOperation('/');


            break; 
            case 'multiplicacao':
            this.addOperation('*');


            break;
            case 'porcento':
            this.addOperation('%');

            break;
            case 'igual':
            this.addOperation('=');

            break;
            case 'ponto':

            this.addOperation('.');

            break; 

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            

                this.addOperation(parseInt(value));
                break;

            default: 
                this.setError();

        }


    }

    initButtonEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((btn)=>{


            this.addEventListenerAll(btn, 'click drag', e=> {
                /*console.log(btn.className.baseVal.replace('btn-','aaron')); */

                let textBtn = btn.className.baseVal.replace('btn-','');

                console.log(textBtn);

                this.execBtn(textBtn);

            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=>{

                btn.style.cursor = 'pointer';
            })
        })

        
    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    };

    get displayTime(){

        return this._timeEl.innerHTML;
    }

    set displayTime(value){

        return this._timeEl.innerHTML = value;
    }

    get displayDate(){

        return this._dateEl.innerHTML;
    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        
        return new Date();
    }

    set currentDate(value){

        this._currentDate = value;

    }

}

//encapsulamento atraves de public,private, protected , uma forma de proteger ou controlar o aesso á um atributo ou metodo
//getters e setter permitem definir como acessar valores;